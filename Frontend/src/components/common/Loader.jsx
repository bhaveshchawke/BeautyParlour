export const Loader = ({ inButton = false }) => {
  return (
    // अगर inButton true है, तो कोई पैडिंग/विड्थ नहीं लगेगी। वरना पुरानी वाली लगेगी।
    <div
      className={`flex justify-center items-center ${inButton ? "" : "w-full py-10"}`}
    >
      {/* Pink color ka chamakta hua loader */}
      <div
        className={`
          ${inButton ? "w-5 h-5 border-2" : "w-8 h-8 border-2"} 
          border-gray-200 border-t-pink-600 rounded-full animate-spin
        `}
      ></div>
    </div>
  );
};
