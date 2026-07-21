export const Loader = ({ inButton = false }) => {
  return (
    // अगर inButton true है, तो कोई पैडिंग नहीं।
    // वरना (standalone) मोबाइल पर py-6 और डेस्कटॉप पर py-10 लगेगा।
    <div
      className={`flex justify-center items-center ${
        inButton ? "" : "w-full py-6 sm:py-10"
      }`}
    >
      {/* Pink color ka chamakta hua loader */}
      <div
        className={`
          ${
            inButton
              ? "w-4 h-4 sm:w-5 sm:h-5 border-2" // बटन के अंदर का साइज़
              : "w-6 h-6 sm:w-8 sm:h-8 border-2 sm:border-[3px]" // स्टैंडअलोन साइज़ (डेस्कटॉप पर थोड़ा मोटा बॉर्डर)
          } 
          border-gray-200 border-t-pink-600 rounded-full animate-spin
        `}
      ></div>
    </div>
  );
};
