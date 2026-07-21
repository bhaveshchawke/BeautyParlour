import { useState } from "react";
// Backend service file me update API banani hogi, e.g., updateProduct
import { updateProduct } from "../services/AdminService";
import { useMessage } from "../hooks/useMessage";

export const EditProduct = ({ onClose, product, setProduct }) => {
  const { showMessage } = useMessage();

  // ─── 1. Form Data State (Pre-filled with existing product data) ───
  const [data, setData] = useState({
    productName: product?.productName || "",
    brand: product?.brand || "",
    productCategory: product?.productCategory || "Hair Care",
    badge: product?.badge || "None",
    originalPrice: product?.originalPrice || "",
    salePrice: product?.salePrice || "",
    stockQuantity:
      product?.stockQuantity !== undefined ? product.stockQuantity : "",
    productDescription: product?.productDescription || "",
  });

  // Image File hold karne ke liye state (Sirf tab use hoga jab nayi image upload ho)
  const [imageFile, setImageFile] = useState(null);

  // Loading state
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

  // ─── 3. Form Submit Handler (Updating Data) ───────────────────────
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Multipart form-data send karne ke liye FormData instance banaya
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("brand", data.brand);
    formData.append("productCategory", data.productCategory);
    formData.append("badge", data.badge);
    formData.append("originalPrice", data.originalPrice);
    formData.append("salePrice", data.salePrice);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("productDescription", data.productDescription);

    // Agar nayi image select hui hai toh hi use formData me daalein
    if (imageFile) {
      formData.append("productImage", imageFile); // Backend schema me productImage name hai
    }
    // backend ke liye product id zaroori hai
    formData.append("id", product._id);

    try {
      setIsSubmitting(true);

      // API call to update the product (sirf formData pass karna hoga)
      const res = await updateProduct(formData);

      // ✅ Success Notification
      showMessage("Product Updated Successfully", "success");
      setProduct((prev) =>
        prev.map((item) => (item._id === res.data._id ? res.data : item)),
      );
      console.log("Response from server:", res);

      // Form submit hone ke baad modal close karne ke liye:
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      showMessage(
        error?.response?.data?.message ||
          "Failed to update product. Please try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // for delete product_________________________________________________________________
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* मोबाइल के लिए p-5 और डेस्कटॉप के लिए p-8 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl p-5 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh] custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer p-1"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
        {/* मोबाइल पर gap-4 (थोड़ा कम गैप) और डेस्कटॉप पर gap-5 */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleOnSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Product Name */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={data.productName}
                onChange={handleInputChange}
                required
                placeholder="e.g. Hair Spa Cream"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="productCategory"
                value={data.productCategory}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 appearance-none cursor-pointer"
              >
                <option value="Hair Care">Hair Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Makeup">Makeup</option>
                <option value="Tools & Appliances">Tools & Appliances</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Brand */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                value={data.brand}
                onChange={handleInputChange}
                required
                placeholder="e.g. L'Oreal, MAC, O3+"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Badge Dropdown */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Product Badge
              </label>
              <select
                name="badge"
                value={data.badge}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 appearance-none cursor-pointer"
              >
                <option value="None">None</option>
                <option value="NEW">NEW</option>
                <option value="HOT">HOT</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Original Price */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleInputChange}
                required
                placeholder="1200"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Sale Price */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Sale Price (₹)
              </label>
              <input
                type="number"
                name="salePrice"
                value={data.salePrice}
                onChange={handleInputChange}
                required
                placeholder="999"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={data.stockQuantity}
                onChange={handleInputChange}
                required
                placeholder="20"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Product Image File Input with Preview */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Product Image{" "}
              <span className="text-slate-400 font-normal lowercase">
                (Leave empty to keep current image)
              </span>
            </label>
            {/* मोबाइल पर flex-col ताकि प्रीव्यू इमेज और इनपुट अच्छे से दिखें */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Current Image Preview */}
              {product?.productImage && !imageFile && (
                <img
                  src={product.productImage}
                  alt="Current"
                  className="w-16 h-16 sm:w-12 sm:h-12 rounded-lg object-cover border border-slate-200 shadow-sm"
                />
              )}
              {/* New Image File Input (Not Required) */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 outline-none text-sm font-medium text-slate-600 file:mr-4 file:py-1.5 sm:file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] sm:file:text-xs file:font-bold file:bg-rose-50 file:text-rose-600 hover:file:bg-rose-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Short Description
            </label>
            <textarea
              name="productDescription"
              value={data.productDescription}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="Describe the product..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-900 resize-none"
            ></textarea>
          </div>

          {/* Footer Action Buttons */}
          {/* मोबाइल पर flex-col-reverse ताकि Update बटन ऊपर और Cancel बटन नीचे रहे */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl sm:rounded-full transition-colors cursor-pointer disabled:opacity-50 text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 text-sm font-bold bg-slate-900 text-white hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/30 rounded-xl sm:rounded-full transition-all duration-300 cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
