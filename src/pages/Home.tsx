import { useAuth } from "@/hooks/useAuth";

// Simple Dashboard Placeholder (We will expand this next)
const Dashboard = () => {
  const { logout } = useAuth(); // We need to import useAuth here
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>This is a protected area.</p>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;