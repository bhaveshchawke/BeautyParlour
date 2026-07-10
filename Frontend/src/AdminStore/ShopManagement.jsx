import { useState, useEffect } from "react";
import { Addproduct } from "./Addproduct";
import { fetchAllProducts } from "../services/AdminService";
import { EditProduct } from "./EditProduct";
import { deleteProduct } from "../services/AdminService";
import { useMessage } from "../hooks/useMessage";
// ─── Dummy Data for Orders (Order API aane tak ise dummy rakhenge) ───────────
const DUMMY_ORDERS = [
  {
    orderId: "ORD-9021",
    customer: "Priya Sharma",
    date: "10 Jul 2026",
    items: "L'Oreal Hair Spa (x1), MAC Fix+ (x1)",
    total: 2050,
    status: "Pending",
  },
  {
    orderId: "ORD-9020",
    customer: "Neha Gupta",
    date: "09 Jul 2026",
    items: "O3+ Bridal Kit (x2)",
    total: 4200,
    status: "Shipped",
  },
];

export const ShopManagement = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { showMessage } = useMessage();
  // ─── Dynamic States ──────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const [isLoading, setIsLoading] = useState(true);
  // ___edit Model____________________________________________________________
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Naya state

  // ─── Fetch Products API Call ─────────────────────────────────────────────
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAllProducts();
      // Aapke instruction ke anusaar data .data ke andar aayega
      if (response && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Jab bhi page load ho ya naya product add ho (Modal close ho), list refresh ho
  useEffect(() => {
    getProducts();
  }, [isAddModalOpen]);

  // ─── Handlers ──────────────────────────────────────────────────────────
  const toggleProductStatus = (id) => {
    // TODO: Yahan backend me Active/Off status update karne ki API lagegi
    // Abhi ke liye Optimistic UI update kar rahe hain (_id use karke)
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, active: !product.active } : product,
      ),
    );
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === id ? { ...order, status: newStatus } : order,
      ),
    );
  };
  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (!response) {
        showMessage("something went wrong", "error");
        return;
      }
      setProducts((prev) => prev.filter((product) => product._id !== id));
      showMessage("produnct deleted", "success");
    } catch (error) {
      console.log(error);
      showMessage("something went wrong", "error");
    }
  };

  // ─── Dynamic Stats Calculation ───────────────────────────────────────────
  const totalProductsCount = products.length;
  const outOfStockCount = products.filter((p) => p.stockQuantity === 0).length;

  // ─── UI Component ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* ─── 1. Header & Stats Section ─────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Shop Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your inventory, track orders, and boost your parlor's retail
            sales.
          </p>
        </div>

        {/* Stats Cards (4 Boxes) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Total Products
              </p>
              <p className="text-2xl font-black text-slate-900">
                {totalProductsCount}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-rose-100 flex items-center gap-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-2 h-full bg-rose-500"></div>
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Out of Stock
              </p>
              <p className="text-2xl font-black text-rose-600">
                {outOfStockCount}
              </p>
            </div>
          </div>

          {/* Dummy Stats for Orders */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                New Orders
              </p>
              <p className="text-2xl font-black text-slate-900">2</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Total Sales
              </p>
              <p className="text-2xl font-black text-slate-900">₹6.2k</p>
            </div>
          </div>
        </div>

        {/* ─── 2. Tabs & Add Button ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <div className="flex gap-2 w-full sm:w-auto bg-slate-100 p-1 rounded-full">
            {["Products", "Orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Products" && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md shadow-rose-500/20 active:scale-95 shrink-0"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add Product
            </button>
          )}
        </div>

        {/* ─── 3. Products List Table (Tab 1) ────────────────────────────── */}
        {activeTab === "Products" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                    <th className="py-4 px-6">Product Details</th>
                    <th className="py-4 px-6">Pricing</th>
                    <th className="py-4 px-6 text-center">Stock Status</th>
                    <th className="py-4 px-6 text-center">Visibility</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-10 text-center text-slate-500 font-medium"
                      >
                        Loading Products...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-10 text-center text-slate-500 font-medium"
                      >
                        No products found. Please add a new product.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr
                        key={product._id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        {/* Image, Brand, Name, Badge & Category */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.productImage}
                              alt={product.productName}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm"
                            />
                            <div>
                              {/* Brand Name */}
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                                {product.brand}
                              </p>

                              {/* Product Name & Badge */}
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-slate-900">
                                  {product.productName}
                                </p>
                                {product.badge && product.badge !== "None" && (
                                  <span className="bg-rose-100 text-rose-600 text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-widest">
                                    {product.badge}
                                  </span>
                                )}
                              </div>

                              {/* Category */}
                              <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded">
                                {product.productCategory}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Pricing */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">
                              ₹{product.salePrice?.toLocaleString()}
                            </span>
                            {product.originalPrice !== product.salePrice && (
                              <span className="text-[11px] text-slate-400 line-through font-medium mt-0.5">
                                ₹{product.originalPrice?.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock Status */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                product.stockQuantity === 0
                                  ? "bg-rose-50 text-rose-600"
                                  : product.stockQuantity < 5
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-emerald-50 text-emerald-600"
                              }`}
                            >
                              {product.stockQuantity === 0
                                ? "Out of Stock"
                                : product.stockQuantity < 5
                                  ? "Low Stock"
                                  : "In Stock"}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {product.stockQuantity} units left
                            </span>
                          </div>
                        </td>

                        {/* Active Toggle */}
                        <td className="py-4 px-6">
                          <div className="flex justify-center">
                            <button
                              onClick={() => toggleProductStatus(product._id)}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                                product.active ? "bg-rose-500" : "bg-slate-300"
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out ${
                                  product.active
                                    ? "translate-x-5"
                                    : "translate-x-0"
                                }`}
                              />
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product); // Click kiye hue product ko save kiya
                              setIsEdit(true); // Popup open kiya
                            }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── 4. Orders Management Tab (Tab 2) ──────────────────────────── */}
        {activeTab === "Orders" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                    <th className="py-4 px-6">Order ID & Date</th>
                    <th className="py-4 px-6">Customer & Items</th>
                    <th className="py-4 px-6">Total Amount</th>
                    <th className="py-4 px-6 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {orders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900 mb-0.5">
                          {order.orderId}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {order.date}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900 mb-1">
                          {order.customer}
                        </p>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs">
                          {order.items}
                        </p>
                      </td>
                      <td className="py-4 px-6 font-black text-emerald-600">
                        ₹{order.total.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.orderId, e.target.value)
                          }
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border outline-none cursor-pointer appearance-none text-center ${
                            order.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : order.status === "Shipped"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* ─── 5. Add Product Modal ────────────────────────────────────────── */}
      {isAddModalOpen && (
        <Addproduct onClose={() => setIsAddModalOpen(false)} />
      )}
      {/* Edit Product Modal */}
      {isEdit && selectedProduct && (
        <EditProduct
          product={selectedProduct} // Sirf selected product bheja
          onClose={() => setIsEdit(false)}
          setProduct={setProducts}
        />
      )}
    </div>
  );
};
