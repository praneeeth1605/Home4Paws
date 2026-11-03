
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const defaultPets = [
  { id: 1, name: "Buddy" },
  { id: 2, name: "Rocky" },
  { id: 3, name: "Max" },
  { id: 4, name: "Luna" },
  { id: 5, name: "Coco" },
  { id: 6, name: "Hope" },
  { id: 7, name: "Milo" }
];

function ApplyPage() {
  const params = new URLSearchParams(window.location.search);
  const petId = params.get("id");

  const pets = JSON.parse(
    localStorage.getItem("pets") || "null"
  ) || defaultPets;

  const pet = pets.find(
    (item) => String(item.id) === String(petId)
  );

  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  function submitApplication(e) {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      alert("Please login before applying for adoption.");
      window.location.href = "/legacy/login.html";
      return;
    }

    if (!pet) {
      alert("Pet not found.");
      return;
    }

    const requests = JSON.parse(
      localStorage.getItem("requests") || "[]"
    );

    const newRequest = {
      id: Date.now(),
      petId: pet.id,
      pet: pet.name,
      user: user.name,
      email: user.email,
      phone: phone,
      reason: reason,
      date: new Date().toLocaleString(),
      status: "Pending"
    };

    requests.push(newRequest);

    localStorage.setItem(
      "requests",
      JSON.stringify(requests)
    );

    alert("Your adoption request has been submitted!");

    window.location.href = "/legacy/requests.html";
  }

  if (!pet) {
    return (
      <>
        <Header />
        <h2>Pet not found.</h2>
        <a href="/pets">Back to Pets</a>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="application-form">
        <h1>Adoption Application</h1>

        <h2>Applying to adopt: {pet.name}</h2>

        <form onSubmit={submitApplication}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />

          <label>Why do you want to adopt this pet?</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell us why you want to adopt..."
            required
          />

          <button type="submit">
            Submit Application
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default ApplyPage;
