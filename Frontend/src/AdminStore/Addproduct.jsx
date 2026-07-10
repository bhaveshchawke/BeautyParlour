import { useState } from "react";
import { addProducts } from "../services/AdminService";
import { useMessage } from "../hooks/useMessage";

export const Addproduct = ({ onClose }) => {
  const { showMessage } = useMessage();

  // ─── 1. Form Data State (Added brand & badge) ─────────────────────
  const [data, setData] = useState({
    productName: "",
    brand: "",
    productCategory: "Hair Care",
    badge: "None",
    originalPrice: "",
    salePrice: "",
    stockQuantity: "",
    productDescription: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── 2. Input Change Handler ──────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // ─── 3. Form Submit Handler ───────────────────────────────────────
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("brand", data.brand); // Added brand
    formData.append("productCategory", data.productCategory);
    formData.append("badge", data.badge); // Added badge
    formData.append("originalPrice", data.originalPrice);
    formData.append("salePrice", data.salePrice);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("productDescription", data.productDescription);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setIsSubmitting(true);
      const res = await addProducts(formData);

      showMessage("Product Added Successfully", "success");
      console.log("Response from server:", res);
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      showMessage(
        error?.response?.data?.message ||
          "Failed to add product. Please try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh] custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
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

        {/* Form Container */}
        <form className="space-y-5" onSubmit={handleOnSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={data.productName}
                onChange={handleInputChange}
                required
                placeholder="e.g. Hair Spa Cream"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="productCategory"
                value={data.productCategory}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 appearance-none cursor-pointer"
              >
                <option value="Hair Care">Hair Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Makeup">Makeup</option>
                <option value="Tools & Appliances">Tools & Appliances</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* ─── New Grid Row for Brand and Badge ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Brand */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                value={data.brand}
                onChange={handleInputChange}
                required
                placeholder="e.g. L'Oreal, MAC, O3+"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Badge Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Product Badge
              </label>
              <select
                name="badge"
                value={data.badge}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 appearance-none cursor-pointer"
              >
                <option value="None">None</option>
                <option value="NEW">NEW</option>
                <option value="HOT">HOT</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Original Price */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleInputChange}
                required
                placeholder="1200"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Sale Price */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Sale Price (₹)
              </label>
              <input
                type="number"
                name="salePrice"
                value={data.salePrice}
                onChange={handleInputChange}
                required
                placeholder="999"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={data.stockQuantity}
                onChange={handleInputChange}
                required
                placeholder="20"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Product Image File Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              required // Added required since backend needs it
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none text-sm font-medium text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-600 hover:file:bg-rose-100 cursor-pointer"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Short Description
            </label>
            <textarea
              name="productDescription"
              value={data.productDescription}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="Describe the product..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 resize-none"
            ></textarea>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-sm font-bold bg-rose-500 text-white hover:bg-rose-600 rounded-full transition-colors shadow-md shadow-rose-500/20 cursor-pointer disabled:bg-rose-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
