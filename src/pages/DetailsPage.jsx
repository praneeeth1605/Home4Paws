
import Header from "../components/Header";
import Footer from "../components/Footer";

const defaultPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 Years",
    location: "Vijayawada",
    image: "/legacy/images/dog1.jpg",
    health: "Healthy and vaccinated."
  },
  {
    id: 2,
    name: "Rocky",
    type: "Dog",
    breed: "Labrador",
    age: "3 Years",
    location: "Hyderabad",
    image: "/legacy/images/dog2.jpg",
    health: "Healthy and playful."
  },
  {
    id: 3,
    name: "Max",
    type: "Dog",
    breed: "Beagle",
    age: "1 Year",
    location: "Guntur",
    image: "/legacy/images/dog3.avif",
    health: "Friendly and healthy."
  },
  {
    id: 4,
    name: "Luna",
    type: "Cat",
    breed: "Persian Cat",
    age: "2 Years",
    location: "Chennai",
    image: "/legacy/images/cat1.webp",
    health: "Calm and vaccinated."
  },
  {
    id: 5,
    name: "Coco",
    type: "Other",
    breed: "Rabbit",
    age: "8 Months",
    location: "Bengaluru",
    image: "/legacy/images/rabbit1.jpg",
    health: "Healthy and gentle."
  },
  {
    id: 6,
    name: "Hope",
    type: "Special Needs",
    breed: "Indie Dog",
    age: "4 Years",
    location: "Tenali",
    image: "/legacy/images/specialdog.jpeg",
    health: "Needs extra care."
  },
  {
    id: 7,
    name: "Milo",
    type: "Cat",
    breed: "Cute Cat",
    age: "1 Year",
    location: "Vijayawada",
    image: "/legacy/images/cat2.jpg",
    health: "Healthy and friendly."
  }
];

function DetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const petId = params.get("id");

  const savedPets = JSON.parse(
    localStorage.getItem("pets") || "null"
  );

  const pets = savedPets || defaultPets;

  const pet = pets.find(
    (item) => String(item.id) === String(petId)
  );

  if (!pet) {
    return (
      <>
        <Header />
        <h2>Sorry! Pet not found.</h2>
        <a href="/pets">Back to Available Pets</a>
        <Footer />
      </>
    );
  }

  const image = pet.image?.startsWith("images/")
    ? `/legacy/${pet.image}`
    : pet.image;

  return (
    <>
      <Header />

      <main className="pet-details-page">
        <section className="pet-details">
          <img className="pet-details-image" src={image} alt={pet.name} />

          <div className="pet-details-info">
            <h1>{pet.name}</h1>
            <div className="pet-details-facts">
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Location:</strong> {pet.location}</p>
              <p><strong>Health:</strong> {pet.health}</p>
            </div>

            <div className="pet-details-actions">
              <a className="btn" href={`/apply?id=${pet.id}`}>
                Adopt Me
              </a>
              <a className="pet-details-back" href="/pets">Back to Pets</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default DetailsPage;
