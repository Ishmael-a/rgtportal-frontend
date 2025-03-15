import { Skeleton } from "@/components/ui/skeleton";

export const FeedSkeleton = () => {
  return (
    <main className="flex  gap-2 h-full px-5 w-full">
      {/* Left Column - Posts Section */}
      <div className="space-y-10 md:w-[60%] w-full">
        {/* Recognition Section Skeleton */}
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

      <div className="hidden md:block w-[30.5%] md:fixed right-0 h-screen overflow-auto">
        {/* Events Section */}
        <section className="flex justify-center w-full">
          <div className="pt-5 space-y-3 h-fit bg-muted rounded-t-2xl w-full">
            {/* Calendar Skeleton */}
            <div className="shadow-md shadow-gray-300 p-2 rounded-md">
              <div className="grid grid-cols-7 gap-2 mb-3">
                {[...Array(7)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(42)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Events List Skeleton */}
            <div className="p-6 bg-muted rounded-lg space-y-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>

              <div className="flex flex-col space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements Skeleton */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-between pb-4">
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
