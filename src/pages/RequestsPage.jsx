
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RequestsPage() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [requests] = useState(() => {
    return JSON.parse(
      localStorage.getItem("requests") || "[]"
    );
  });

  const userRequests = user
    ? requests.filter(
        (request) => request.email === user.email
      )
    : [];

  return (
    <>
      <Header />

      <main className="requests-page">
        {!user ? (
          <div className="requests-message">
            <div className="requests-icon">🐾</div>
            <h1>Login Required</h1>
            <p>
              Please login to view and track your adoption requests.
            </p>
            <a href="/login" className="requests-button">
              Login Now
            </a>
          </div>
        ) : (
          <>
            <div className="requests-heading">
              <p className="tag">YOUR ADOPTION JOURNEY 🐾</p>
              <h1>My Adoption Requests</h1>
              <p>
                Track the status of your adoption applications.
              </p>
            </div>

            {userRequests.length === 0 ? (
              <div className="requests-message">
                <div className="requests-icon">🐶</div>
                <h2>No Requests Yet!</h2>
                <p>
                  You haven't submitted any adoption requests yet.
                </p>
                <a href="/pets" className="requests-button">
                  Explore Pets
                </a>
              </div>
            ) : (
              <div className="requests-list">
                {userRequests.map((request) => (
                  <div className="request-card" key={request.id}>
                    <h2>{request.pet}</h2>

                    <p>
                      <strong>Applicant:</strong> {request.user}
                    </p>

                    <p>
                      <strong>Submitted:</strong> {request.date}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`request-status ${(request.status || "Pending").toLowerCase()}`}>
                        {request.status || "Pending"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default RequestsPage;
