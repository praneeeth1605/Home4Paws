
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminSignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [commonPassword, setCommonPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    setMessage("");

    if (commonPassword !== "Home4paws") {
      setMessage("Invalid common registration password!");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const admins = JSON.parse(
      localStorage.getItem("admins") || "[]"
    );

    const existingAdmin = admins.find(
      (admin) =>
        admin.username.toLowerCase() === username.toLowerCase() ||
        admin.email.toLowerCase() === email.toLowerCase()
    );

    if (existingAdmin) {
      setMessage("Username or email is already registered!");
      return;
    }

    const newAdmin = {
      id: Date.now(),
      name,
      username,
      email,
      password
    };

    admins.push(newAdmin);

    localStorage.setItem(
      "admins",
      JSON.stringify(admins)
    );

    alert("Admin registration successful! Please login.");

    window.location.href = "/admin-login";
  }

  return (
    <>
      <Header />

      <main className="auth-page">
        <section className="auth-card auth-signup-card">

          <div className="auth-heading">
            <div className="auth-icon">🔐</div>
            <p className="tag">HOME4PAWS ADMINISTRATION</p>
            <h1>Admin Registration</h1>
            <p>Register as an administrator.</p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>

            <div className="auth-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Username</label>
              <input
                type="text"
                placeholder="Create a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Common Registration Password</label>
              <input
                type="password"
                placeholder="Enter common password"
                value={commonPassword}
                onChange={(e) => setCommonPassword(e.target.value)}
                required
              />
              <small>
                Enter the common password provided to administrators.
              </small>
            </div>

            <div className="auth-field">
              <label>Your Login Password</label>
              <input
                type="password"
                placeholder="Create your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="auth-error">{message}</p>
            )}

            <button className="auth-button" type="submit">
              Register as Admin
            </button>

          </form>

          <p className="auth-switch">
            Already registered?{" "}
            <a href="/admin-login">Login here</a>
          </p>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default AdminSignupPage;
