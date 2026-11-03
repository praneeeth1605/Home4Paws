
import HomePage from "./pages/HomePage";
import PetsPage from "./pages/PetsPage";
import DetailsPage from "./pages/DetailsPage";
import ApplyPage from "./pages/ApplyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminSignupPage from "./pages/Adminsignup";
import RequestsPage from "./pages/RequestsPage";
import GroomingPage from "./pages/GroomingPage";

function App() {
  const path = window.location.pathname;

  if (path === "/pets") return <PetsPage />;
  if (path === "/details") return <DetailsPage />;
  if (path === "/apply") return <ApplyPage />;
  if (path === "/login") return <LoginPage />;
  if (path === "/signup") return <SignupPage />;
  if (path === "/admin-login") return <AdminLogin />;
  if (path === "/admin-signup") return <AdminSignupPage />;
  if (path === "/admin-dashboard") return <AdminDashboard />;
  if (path === "/requests") return <RequestsPage />;
  if (path === "/grooming") return <GroomingPage />;

  return <HomePage />;
}

export default App;
