
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  const petImages = [
    "/legacy/images/dog1.jpg",
    "/legacy/images/cat1.webp",
    "/legacy/images/rabbit1.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        (previous + 1) % petImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function previousImage() {
    setCurrentImage((previous) =>
      (previous - 1 + petImages.length) % petImages.length
    );
  }

  function nextImage() {
    setCurrentImage((previous) =>
      (previous + 1) % petImages.length
    );
  }

  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="hero">
        <div>
          <p className="tag">FIND YOUR NEW BEST FRIEND 🐾</p>

          <h1>
            Give a Pet a
            <span>Forever Home.</span>
          </h1>

          <p>
            Find loving dogs, cats and other pets
            waiting for their forever families.
          </p>

          <a href="/pets" className="btn">
            Find a Pet
          </a>
        </div>

        {/* PET IMAGE SLIDESHOW */}
        <div className="hero-pet">
          <img
            key={currentImage}
            src={petImages[currentImage]}
            alt="Pets waiting for adoption"
          />

          <button
            className="slide-arrow prev"
            onClick={previousImage}
          >
            ❮
          </button>

          <button
            className="slide-arrow next"
            onClick={nextImage}
          >
            ❯
          </button>

          <div className="slide-dots">
            {petImages.map((image, index) => (
              <button
                key={image}
                className={currentImage === index ? "active" : ""}
                onClick={() => setCurrentImage(index)}
                aria-label={`Show pet image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="intro">
        <p className="tag">EXPLORE</p>
        <h2>Find Your Perfect Companion</h2>

        <div className="cards">
          <div className="card">
            <div>🐶</div>
            <h3>Dogs</h3>
            <p>Friendly dogs waiting for loving homes.</p>
          </div>

          <div className="card">
            <div>🐱</div>
            <h3>Cats</h3>
            <p>Cute cats looking for their families.</p>
          </div>

          <div className="card">
            <div>🐰</div>
            <h3>Other Pets</h3>
            <p>Find rabbits and other companions.</p>
          </div>

          <div className="card">
            <div>❤️</div>
            <h3>Special Needs</h3>
            <p>Give special-needs pets a loving home.</p>
          </div>
        </div>
      </section>

      {/* WHY ADOPT SECTION */}
      <section className="why">
        <p className="tag">WHY ADOPT?</p>
        <h2>Adoption Changes Two Lives ❤️</h2>

        <div className="why-grid">
          <div>
            <h3>🏠 Give Them a Home</h3>
            <p>Provide a safe and caring family.</p>
          </div>

          <div>
            <h3>❤️ Save a Life</h3>
            <p>Give a pet another chance.</p>
          </div>

          <div>
            <h3>🐾 Find a Friend</h3>
            <p>Build a lifelong friendship.</p>
          </div>
        </div>
      </section>

      {/* HAPPY ADOPTION STORIES */}
      <section className="testimonials">
        <p className="tag">HAPPY FAMILIES</p>
        <h2>Happy Adoption Stories ❤️</h2>

        <p>
          Every adoption creates a beautiful new beginning.
          Here are some examples of happy adoption experiences.
        </p>

        <div className="cards">
          <div className="card">
            <img
              src="/legacy/images/dog1.jpg"
              alt="Adopted dog Buddy"
            />
            <h3>Buddy's New Family 🐶</h3>
            <p>
              "Buddy has brought so much happiness into our
              home. He is now a part of our family!"
            </p>
            <h4>— A Happy Pet Parent</h4>
          </div>

          <div className="card">
            <img
              src="/legacy/images/cat1.webp"
              alt="Adopted cat Luna"
            />
            <h3>Luna's Forever Home 🐱</h3>
            <p>
              "Luna is the sweetest companion. We are
              grateful to have found her through Home4Paws."
            </p>
            <h4>— A Happy Pet Parent</h4>
          </div>

          <div className="card">
            <img
              src="/legacy/images/rabbit1.jpg"
              alt="Adopted rabbit Coco"
            />
            <h3>Coco's New Beginning 🐰</h3>
            <p>
              "Coco has made our family complete.
              Adopting was the best decision!"
            </p>
            <h4>— A Happy Pet Parent</h4>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
