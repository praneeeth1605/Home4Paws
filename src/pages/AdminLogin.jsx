
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const admin = admins.find(
      (item) =>
        item.username.toLowerCase() === username.trim().toLowerCase() &&
        item.password === password
    );

    if (admin) {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("currentAdmin", JSON.stringify(admin));

      alert("Admin login successful!");
      window.location.href = "/admin-dashboard";
    } else {
      alert("Invalid username or password. Please register first if you don't have an account.");
    }
  }

  return (
    <>
      <Header />

      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-heading">
            <div className="auth-icon">🔐</div>
            <p className="tag">ADMINISTRATOR ACCESS</p>
            <h1>Admin Login</h1>
            <p>Login to manage adoption requests.</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="adminPassword">Password</label>
              <input
                id="adminPassword"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" type="submit">
              Admin Login
            </button>
          </form>

          <p className="auth-switch">
            Don't have an admin account?{" "}
            <a href="/admin-signup">Register here</a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AdminLogin;
