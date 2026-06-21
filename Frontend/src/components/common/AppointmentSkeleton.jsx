export const AppointmentSkeleton = () => {
  return (
    <div className="animate-fade-in m-4">
      {/* Skeleton Card */}
      <div className="bg-[#121212] rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex gap-6 items-center w-full md:w-auto">
          {/* Date Block Skeleton */}
          <div className="w-26 h-16 rounded-xl bg-white/5 flex-shrink-0 animate-pulse"></div>
          
          {/* Details Skeleton */}
          <div className="space-y-3 w-full">
            <div className="h-4 bg-white/10 rounded w-32 animate-pulse"></div>
            <div className="h-3 bg-white/5 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-green-500/10 rounded w-20 animate-pulse mt-2"></div>
          </div>
        </div>
        
        {/* Actions Skeleton */}
        <div className="flex gap-3 mt-4 md:mt-0">
          <div className="w-24 h-8 bg-white/5 rounded-lg animate-pulse"></div>
          <div className="w-24 h-8 bg-pink-600/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
