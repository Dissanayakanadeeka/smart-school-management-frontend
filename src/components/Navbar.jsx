import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  // 🔹 Hide navbar on login page
  if (location.pathname === "/login") return null;
  if (location.pathname === "/") return null;

  const getDashboardPath = (role) => {
    switch (role) {
      case "STUDENT":
        return "/student-dashboard";
      case "TEACHER":
        return "/teacher-dashboard";
      case "PRINCIPAL":
        return "/principal-dashboard";
      default:
        return "/dashboard";
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* Dashboard Button */}
      <button 
        className="dashboard-nav-btn" 
        onClick={() => navigate(getDashboardPath(role))}
        >
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
        </button>

      <div style={styles.right}>
        <span style={styles.role}>{role}</span>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: "60px",
    background: "#1e293b",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  logo: {
    cursor: "pointer",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  role: {
    fontSize: "14px",
    opacity: 0.8,
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
