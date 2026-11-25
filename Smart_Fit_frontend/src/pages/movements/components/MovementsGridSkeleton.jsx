import React from "react";
import Skeleton from "../../../components/Skeleton";

export function MovementsGridSkeleton() {
  return (
    <div className="flex-1">
      <div className="md:hidden w-full mb-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:max-lg:grid-cols-2 gap-4 md:gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 p-4 border rounded-lg">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
