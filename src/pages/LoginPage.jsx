
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successful!");

    window.location.href = "/pets";
  }

  return (
    <>
      <Header />

      <main className="auth-page">
        <section className="auth-card">

          <div className="auth-heading">
            <div className="auth-icon">🐾</div>
            <p className="tag">WELCOME BACK!</p>
            <h1>User Login</h1>
            <p>Welcome back to Home4Paws!</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" type="submit">
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <a href="/signup">Sign Up</a>
          </p>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default LoginPage;
