import { useState } from "react";
import { useMessage } from "../hooks/useMessage";
import { addService, editService } from "../services/AdminService";
import { Loader } from "../components/common/Loader";
export const AddService = ({ onClose, service }) => {
  //__LoadingState___________________________________________
  const [loading, setLoading] = useState(false);
  //__calling Hook____________________
  const { showMessage } = useMessage();

  //_____________for-Save-Updation-Data_______________________
  const [data, setData] = useState({
    serviceTitle: service ? service.serviceTitle : "",
    servicePrice: service ? service.servicePrice : "",
    serviceDuration: service ? service.serviceDuration : "",
    serviceDescription: service ? service.serviceDescription : "",
    // Dhyan de: DB me category save hoti hai, isliye service.category check kiya
    serviceCategory: service && service.category ? service.category : "Face",
  });

  // File hold karne ke liye naya state
  const [imageFile, setImageFile] = useState(null);

  //_handleSubmitData_______________________________________
  const handleSubmitData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  //__handleOnSubmit______________________________________
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // 1. Frontend validation: Agar image select hui hai aur size 10MB se bada hai
    if (imageFile && imageFile.size > 10485760) {
      showMessage(
        "File size is too large! Please select an image under 10MB.",
        "error",
      );
      return; // function yahi rok do, backend par request mat bhejo
    }

    try {
      // Normal data object ki jagah FormData banayenge
      const formData = new FormData();
      formData.append("serviceTitle", data.serviceTitle);
      formData.append("servicePrice", data.servicePrice);
      formData.append("serviceDuration", data.serviceDuration);
      formData.append("serviceDescription", data.serviceDescription);
      formData.append("serviceCategory", data.serviceCategory); // Category Add ki

      // Agar admin ne image select ki hai toh use bhi form data me daalein
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Backend API call (Smart Check: Add karna hai ya Edit?)
      setLoading(true);
      let response;
      
      if (service && service._id) {
        // Agar modal me purani service aayi thi, yani ki Edit Mode
        response = await editService(service._id, formData);
      } else {
        // Nayi service Add ho rahi hai
        response = await addService(formData);
      }

      if (response && response.success) {
        showMessage(response.message, "success");
        setLoading(false);
        onClose(); // Success hone par modal band kar dein
      }
    } catch (error) {
      console.log(error);
      showMessage(error.message || "Something went wrong", "error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* ─── Header (Title + Close Button) ─── */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Add New Service</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleOnSubmit} className="space-y-5">
          {/* Service Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Service Title
            </label>
            <input
              onChange={handleSubmitData}
              value={data.serviceTitle}
              type="text"
              name="serviceTitle"
              required
              placeholder="e.g. Signature Gold Facial"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Price (₹)
              </label>
              <input
                onChange={handleSubmitData}
                value={data.servicePrice}
                type="number"
                name="servicePrice"
                required
                placeholder="1500"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Duration (Mins)
              </label>
              <input
                type="number"
                onChange={handleSubmitData}
                value={data.serviceDuration}
                name="serviceDuration"
                required
                placeholder="45"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Service Category */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Service Category
            </label>
            <select
              name="serviceCategory"
              value={data.serviceCategory}
              onChange={handleSubmitData}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 appearance-none cursor-pointer"
            >
              <option value="Face">Face</option>
              <option value="Hair">Hair</option>
              <option value="Body">Body</option>
              <option value="Bridal">Bridal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Service Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              onChange={handleSubmitData}
              value={data.serviceDescription}
              name="serviceDescription"
              required
              rows="3"
              placeholder="Enter service details..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 resize-none"
            ></textarea>
          </div>

          {/* Service Image (Styled File Input) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Service Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-600
                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-600 hover:file:bg-rose-100 cursor-pointer"
            />
          </div>

          {/* ─── Footer Buttons ─── */}
          <div className="flex justify-end gap-3 mt-8 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-sm font-bold bg-rose-500 text-white hover:bg-rose-600 rounded-full transition-colors shadow-md shadow-rose-500/20 cursor-pointer disabled:opacity-70 flex items-center justify-center min-w-[120px]"
            >
              {loading ? <Loader inButton={true} /> : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
