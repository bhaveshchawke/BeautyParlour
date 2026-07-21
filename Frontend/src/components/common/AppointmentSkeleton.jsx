export const AppointmentSkeleton = () => {
  return (
    // मोबाइल पर margin को थोड़ा एडजस्ट किया जा सकता है, इसलिए sm:mx-0 भी डाल सकते हैं
    <div className="animate-fade-in m-4 sm:mx-0">
      {/* Skeleton Card */}
      {/* मोबाइल के लिए p-4 और डेस्कटॉप के लिए p-6 */}
      <div className="bg-[#121212] rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        {/* मोबाइल पर gap-4 */}
        <div className="flex gap-4 sm:gap-6 items-center w-full md:w-auto">
          {/* Date Block Skeleton */}
          <div className="w-20 sm:w-24 h-16 rounded-xl bg-white/5 flex-shrink-0 animate-pulse"></div>

          {/* Details Skeleton */}
          <div className="space-y-2.5 sm:space-y-3 w-full">
            <div className="h-4 bg-white/10 rounded w-28 sm:w-32 animate-pulse"></div>
            <div className="h-3 bg-white/5 rounded w-40 sm:w-48 animate-pulse"></div>
            <div className="h-4 bg-green-500/10 rounded w-16 sm:w-20 animate-pulse mt-1 sm:mt-2"></div>
          </div>
        </div>

        {/* Actions Skeleton */}
        {/* मोबाइल पर w-full और flex-1 ताकि दोनों बटन आधी-आधी जगह लें */}
        <div className="flex gap-3 mt-2 sm:mt-4 md:mt-0 w-full md:w-auto">
          <div className="flex-1 md:w-24 h-9 sm:h-8 bg-white/5 rounded-lg animate-pulse"></div>
          <div className="flex-1 md:w-24 h-9 sm:h-8 bg-pink-600/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
