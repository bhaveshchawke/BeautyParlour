import { useAdminData } from "../../hooks/useAdminData";

export const ProtectedForAdmin = ({ children }) => {
  const { isAdmin } = useAdminData();

  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "32px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2
            style={{
              marginBottom: "12px",
              color: "#dc2626",
            }}
          >
            Access Denied
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            This page is available only for administrators.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
