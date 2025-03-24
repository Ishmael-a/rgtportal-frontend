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
    // Cancel any ongoing queries for the post stats
    await queryClient.cancelQueries({ queryKey: ["postStats", postId] });

    // Snapshot the previous value
    const previousStats = queryClient.getQueryData<IStats>([
      "postStats",
      postId,
    ]);

    // Optimistically update the likes count for the specific comment
    queryClient.setQueryData(
      ["postStats", postId],
      (old: IStats | undefined) => ({
        ...(old || {
          commentsCount: 0,
          likesCount: 0,
          disLikesCount: 0,
          comments: [],
        }),
        comments: old?.comments.map((comment) =>
          Number(comment.id) === Number(commentId)
            ? {
                ...comment,
                isLiked: !comment.isLiked, 
                likes: comment.isLiked
                  ? (comment.likes ?? []).filter(
                      (like) => Number(like.employeeId) !== Number(currentUser?.employee.id)
                    ) // Remove the like
                  : [
                      ...(comment.likes || []),
                      {
                        commentId: comment.id,
                        employeeId: currentUser?.employee.id,
                        createdAt: new Date(),
                      },
                    ], // Add the like
              }
            : comment
        ),
      })
    );
    return { previousStats };
  },
  onSuccess: (data, commentId) => {
    console.log("Server response:", data);
    const updatedCommentLike = data.data;
  
    console.log("Updated comment like:", updatedCommentLike);
  
    queryClient.setQueryData(
      ["postStats", postId],
      (old: IStats | undefined) => {
        console.log("Old state:", old);
        const updatedComments = old?.comments.map((comment) =>
          Number(comment.id) === Number(commentId)
            ? {
                ...comment,
                isLiked: updatedCommentLike !== null,
                likes: updatedCommentLike
                  ? [
                      ...(comment.likes || []),
                      {
                        commentId: comment.id,
                        employeeId: updatedCommentLike.employeeId,
                        createdAt: new Date(),
                      },
                    ]
                  : (comment.likes ?? []).filter(
                      (like) => Number(like.employeeId) !== Number(currentUser?.employee.id)
                    ),
              }
            : comment
        );
        console.log("Updated comments:", updatedComments);
        return {
          ...(old || {
            commentsCount: 0,
            likesCount: 0,
            disLikesCount: 0,
            comments: [],
          }),
          comments: updatedComments,
        };
      }
    );
  },
 
  onError: (_err, _unused, context) => {
    // Rollback to the previous state on error
    queryClient.setQueryData(["postStats", postId], context?.previousStats);

    // Show an error toast
    toast({
      title: "Error",
      description: "Failed to toggle comment like",
      variant: "destructive",
    });
  },
  onSettled: () => {
    // Refetch the post stats to ensure the UI is in sync with the server
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
