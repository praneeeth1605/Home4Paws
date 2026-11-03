
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [requests, setRequests] = useState(() => {
    return JSON.parse(
      localStorage.getItem("requests") || "[]"
    );
  });

  const [activeTab, setActiveTab] = useState("Pending");

  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(
      localStorage.getItem("groomingAppointments") || "[]"
    );
  });

  if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "/admin-login";
    return null;
  }

  function updateStatus(id, status) {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? { ...request, status }
        : request
    );

    setRequests(updatedRequests);

    localStorage.setItem(
      "requests",
      JSON.stringify(updatedRequests)
    );
  }

  function updateAppointmentStatus(id, status) {
    const updated = appointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, status }
        : appointment
    );

    setAppointments(updated);

    localStorage.setItem(
      "groomingAppointments",
      JSON.stringify(updated)
    );
  }

  const pendingCount = requests.filter(
    (r) => (r.status || "Pending") === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (r) => r.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (r) => r.status === "Rejected"
  ).length;

  const filteredRequests = requests.filter(
    (request) =>
      (request.status || "Pending") === activeTab
  );

  return (
    <>
      <Header />

      <main className="admin-dashboard">

        <div className="admin-heading">
          <div>
            <p className="tag">HOME4PAWS MANAGEMENT 🐾</p>
            <h1>Admin Dashboard</h1>
            <p>
              Manage adoption requests and grooming appointments.
            </p>
          </div>

          <button
            className="admin-logout"
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              window.location.href = "/admin-login";
            }}
          >
            Logout
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="admin-stats">

          <div className="admin-stat pending-stat">
            <span>⏳</span>
            <div>
              <h2>{pendingCount}</h2>
              <p>Pending Requests</p>
            </div>
          </div>

          <div className="admin-stat approved-stat">
            <span>✅</span>
            <div>
              <h2>{approvedCount}</h2>
              <p>Approved Requests</p>
            </div>
          </div>

          <div className="admin-stat rejected-stat">
            <span>❌</span>
            <div>
              <h2>{rejectedCount}</h2>
              <p>Rejected Requests</p>
            </div>
          </div>

        </div>

        {/* ADOPTION REQUESTS */}
        <section className="admin-section">

          <div className="admin-section-heading">
            <div>
              <h2>Adoption Requests</h2>
              <p>Review and manage pet adoption applications.</p>
            </div>
          </div>

          <div className="admin-tabs">
            {["Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === "Pending" && ` (${pendingCount})`}
                {tab === "Approved" && ` (${approvedCount})`}
                {tab === "Rejected" && ` (${rejectedCount})`}
              </button>
            ))}
          </div>

          {filteredRequests.length === 0 ? (
            <div className="admin-empty">
              <span>🐾</span>
              <h3>No {activeTab} Requests</h3>
              <p>
                There are currently no {activeTab.toLowerCase()} adoption requests.
              </p>
            </div>
          ) : (
            <div className="admin-card-grid">
              {filteredRequests.map((request) => (
                <div className="admin-item-card" key={request.id}>

                  <div className="admin-item-top">
                    <h3>{request.pet}</h3>
                    <span className={`admin-status ${(request.status || "Pending").toLowerCase()}`}>
                      {request.status || "Pending"}
                    </span>
                  </div>

                  <p><strong>Applicant:</strong> {request.user}</p>
                  <p><strong>Email:</strong> {request.email}</p>
                  <p><strong>Phone:</strong> {request.phone}</p>
                  <p><strong>Reason:</strong> {request.reason}</p>
                  <p><strong>Date:</strong> {request.date}</p>

                  {(request.status || "Pending") === "Pending" && (
                    <div className="admin-actions">
                      <button
                        className="accept-btn"
                        onClick={() => updateStatus(request.id, "Approved")}
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(request.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </section>

        {/* GROOMING APPOINTMENTS */}
        <section className="admin-section grooming-admin-section">

          <div className="admin-section-heading">
            <div>
              <h2>🐶 Grooming Appointments</h2>
              <p>View and manage customer grooming bookings.</p>
            </div>
            <span className="appointment-count">
              {appointments.length} Appointments
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="admin-empty">
              <span>✂️</span>
              <h3>No Grooming Appointments</h3>
              <p>No grooming appointments have been booked yet.</p>
            </div>
          ) : (
            <div className="admin-card-grid">
              {appointments.map((appointment) => (
                <div className="admin-item-card" key={appointment.id}>

                  <div className="admin-item-top">
                    <h3>{appointment.petName}</h3>
                    <span className={`admin-status ${(appointment.status || "Pending").toLowerCase()}`}>
                      {appointment.status || "Pending"}
                    </span>
                  </div>

                  <p><strong>Customer:</strong> {appointment.user}</p>
                  <p><strong>Email:</strong> {appointment.email}</p>
                  <p><strong>Service:</strong> {appointment.service}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>

                  {(appointment.status || "Pending") === "Pending" && (
                    <div className="admin-actions">
                      <button
                        className="accept-btn"
                        onClick={() =>
                          updateAppointmentStatus(appointment.id, "Approved")
                        }
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateAppointmentStatus(appointment.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default AdminDashboard;
