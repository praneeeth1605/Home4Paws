
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("This email is already registered!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration successful! Please login.");

    window.location.href = "/login";
  }

  return (
    <>
      <Header />

      <main className="auth-page">
        <section className="auth-card auth-signup-card">

          <div className="auth-heading">
            <div className="auth-icon">🐾</div>
            <p className="tag">JOIN OUR FAMILY!</p>
            <h1>Create an Account</h1>
            <p>Become a part of the Home4Paws family!</p>
          </div>

          <form className="auth-form" onSubmit={handleSignup}>

            <div className="auth-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" type="submit">
              Create Account
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <a href="/login">Login</a>
          </p>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default SignupPage;
