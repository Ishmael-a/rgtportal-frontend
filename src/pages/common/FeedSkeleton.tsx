import { Skeleton } from "@/components/ui/skeleton";

export const FeedSkeleton = () => {
  return (
    <div className="space-y-10 md:w-3/5">
      <div className="bg-muted rounded-lg p-4 min-h-44">
        <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        <div className="flex justify-center gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="w-20 h-20 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Posts Section Skeleton */}
      <div className="space-y-7">
        {/* Create Post Skeleton */}
        <div className="p-4 rounded-lg bg-muted space-y-3">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Feed Items Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-lg bg-muted space-y-4">
              {/* Post Header */}
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />

                {/* Poll Skeleton */}
                {i % 2 === 0 && (
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="space-y-1">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-2 w-3/4" />
                      </div>
                    ))}
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                )}

                {/* Media Skeleton */}
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map((j) => (
                    <Skeleton key={j} className="h-32 w-full" />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
