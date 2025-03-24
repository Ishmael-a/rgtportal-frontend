import { PostInteractionService } from "@/api/services/post-interaction.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useAuthContextProvider } from "./useAuthContextProvider";

export const useInteraction = (postId?: number, commentId?: number) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContextProvider();

  if (postId === undefined) {
    throw new Error("postId is undefined");
  }

  const {
    data: stats,
    refetch: refetchStats,
    isLoading,
  } = useQuery({
    queryKey: ["postStats", postId],
    queryFn: () => PostInteractionService.getStats(postId),
  });

  const {
    data: commentsReplies,
    refetch: refetchCommentsReplies,
    isLoading: isCommentsRepliesLoading,
  } = useQuery({
    queryKey: ["commentReplies", commentId],
    queryFn: () => PostInteractionService.fetchCommentReplies(commentId ?? 0),
  });

  const commentMutation = useMutation({
    mutationFn: (newComment: IComment) =>
      PostInteractionService.commentOnPost(postId, newComment.content),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["postStats", postId] });
      const previousStats = queryClient.getQueryData<IStats>([
        "postStats",
        postId,
      ]);
      // Optimistically update the comment count
      queryClient.setQueryData(
        ["postStats", postId],
        (old: IStats | undefined) => ({
          ...(old || {
            commentsCount: 0,
            likesCount: 0,
            disLikesCount: 0,
            comments: [],
          }),
          commentsCount: (old?.commentsCount || 0) + 1,
        })
      );
      return { previousStats };
    },
    onError: (_err, _newComment, context) => {
      queryClient.setQueryData(["postStats", postId], context?.previousStats);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["postStats", postId] });
    },
  });

  const likeToggleMutation = useMutation({
    mutationFn: (liked: boolean) =>
      PostInteractionService.likePost(postId, liked),
    onMutate: async (liked: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["postStats", postId] });
      const previousStats = queryClient.getQueryData<IStats>([
        "postStats",
        postId,
      ]);
      queryClient.setQueryData(
        ["postStats", postId],
        (old: IStats | undefined) => ({
          ...(old || {
            commentsCount: 0,
            likesCount: 0,
            disLikesCount: 0,
            comments: [],
          }),
          likesCount: (old?.likesCount || 0) + (liked ? 1 : -1),
        })
      );
      return { previousStats };
    },
    onError: (_err, _newLike, context) => {
      queryClient.setQueryData(["postStats", postId], context?.previousStats);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["postStats", postId] });
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: (commentId: number) =>
      PostInteractionService.likeComment(commentId),
    onMutate: async (commentId: number) => {
      // Cancel any ongoing refetches to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["postStats", postId] });

      // Snapshot the current stats
      const previousStats = queryClient.getQueryData<IStats>([
        "postStats",
        postId,
      ]);

      // Optimistically update the comment likes
      queryClient.setQueryData(
        ["postStats", postId],
        (old: IStats | undefined) => {
          // Ensure we have a valid stats object
          const currentStats = old || {
            commentsCount: 0,
            likesCount: 0,
            disLikesCount: 0,
            comments: [],
          };

          // Create a new comments array with the updated likes
          const updatedComments = currentStats.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  likes: (comment.likes ?? []).some(
                    (like) => like.employeeId === currentUser?.id
                  )
                    ? // If already liked, remove the like
                      (comment.likes ?? []).filter(
                        (like) => like.employeeId !== currentUser?.id
                      )
                    : // If not liked, add a new like
                      [
                        ...(comment.likes ?? []),
                        {
                          employeeId: currentUser?.id,
                          isLike: true,
                        },
                      ],
                }
              : comment
          );

          return {
            ...currentStats,
            comments: updatedComments,
          };
        }
      );

      // Return the previous stats for potential rollback
      return { previousStats };
    },
    onError: (_err, _commentId, context) => {
      // If the mutation fails, restore the previous stats
      queryClient.setQueryData(["postStats", postId], context?.previousStats);

      // Show an error toast
      toast({
        title: "Error",
        description: "Failed to like comment",
        variant: "destructive",
      });
    },
    onSettled: () => {
      // Refetch the latest stats to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["postStats", postId] });
    },
  });

  const replyToCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
      parentReplyId,
    }: {
      commentId: number;
      content: string;
      parentReplyId?: number;
    }) =>
      PostInteractionService.replyToComment(commentId, content, parentReplyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentReplies", commentId],
      });

      toast({
        title: "Success",
        description: "Reply to comment, successfull",
        variant: "success",
      });
    },
    onError: (error) => {
      queryClient.invalidateQueries({
        queryKey: ["commentReplies", commentId],
      });

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addComment = (newComment: IComment) => {
    commentMutation.mutate(newComment);
  };

  const toggleLike = (liked: boolean) => {
    likeToggleMutation.mutate(liked);
  };

  const toggleCommentLike = (commentId: number | undefined) => {
    console.log("commentId:", commentId);
    if (!commentId) return;
    likeCommentMutation.mutate(commentId);
  };

  const replyComment = async (
    commentId: number,
    content: string,
    parentReplyId?: number
  ) => {
    replyToCommentMutation.mutateAsync({ commentId, content, parentReplyId });
  };

  return {
    stats: stats || {
      commentsCount: 0,
      likesCount: 0,
      disLikesCount: 0,
      comments: [],
    },
    addComment,
    isCommentLoading: commentMutation.isPending,
    toggleLike,
    refetchStats,
    isLoading,
    toggleCommentLike,
    replyComment,
    isCommentReplyLoading: replyToCommentMutation.isPending,
    commentsReplies,
    refetchCommentsReplies,
    isCommentsRepliesLoading,
  };
};
