
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GroomingPage() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [petName, setPetName] = useState("");
  const [service, setService] = useState("Bathing");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function bookAppointment(e) {
    e.preventDefault();

    if (!user) {
      alert("Please login before booking an appointment.");
      window.location.href = "/login";
      return;
    }

    const appointments = JSON.parse(
      localStorage.getItem("groomingAppointments") || "[]"
    );

    const newAppointment = {
      id: Date.now(),
      user: user.name,
      email: user.email,
      petName,
      service,
      date,
      time,
      status: "Pending"
    };

    appointments.push(newAppointment);

    localStorage.setItem(
      "groomingAppointments",
      JSON.stringify(appointments)
    );

    alert("Grooming appointment booked successfully!");

    setPetName("");
    setService("Bathing");
    setDate("");
    setTime("");
  }

  return (
    <>
      <Header />

      <main className="grooming-page">
        <div className="grooming-card">

          <div className="grooming-heading">
            <p className="tag">CARE FOR YOUR BEST FRIEND 🐾</p>
            <h1>Pet Grooming Appointment</h1>
            <p>
              Give your furry friend the care they deserve!
            </p>
          </div>

          <form className="grooming-form" onSubmit={bookAppointment}>

            <div className="grooming-field">
              <label htmlFor="petName">Pet Name</label>
              <input
                id="petName"
                type="text"
                placeholder="Enter your pet's name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />
            </div>

            <div className="grooming-field">
              <label htmlFor="service">Select Service</label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="Bathing">Bathing</option>
                <option value="Haircut">Haircut</option>
                <option value="Nail Trimming">Nail Trimming</option>
                <option value="Full Grooming">Full Grooming</option>
              </select>
            </div>

            <div className="grooming-field">
              <label htmlFor="date">Appointment Date</label>
              <input
                id="date"
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="grooming-field">
              <label htmlFor="time">Appointment Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <button className="grooming-button" type="submit">
              Book Appointment 🐾
            </button>

          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default GroomingPage;
