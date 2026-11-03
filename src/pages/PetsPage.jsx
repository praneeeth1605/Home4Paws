
import { useState } from "react";
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

function PetsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [pets] = useState(() => {
    const savedPets = JSON.parse(
      localStorage.getItem("pets") || "null"
    );

    return savedPets || defaultPets;
  });

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || pet.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Header />

      <section className="page-title">
        <p className="tag">HOME4PAWS</p>
        <h1>Available Pets 🐾</h1>

        <input
          className="search"
          placeholder="Search pet or breed"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
          <option value="Special Needs">Special Needs</option>
        </select>
      </section>

      <div className="pet-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <img
                src={
                  pet.image?.startsWith("images/")
                    ? `/legacy/${pet.image}`
                    : pet.image
                }
                alt={pet.name}
              />

              <h2>{pet.name}</h2>
              <p>{pet.breed} • {pet.age}</p>
              <p>📍 {pet.location}</p>
              <p>{pet.health}</p>

              <a
                className="btn"
                href={`/details?id=${pet.id}`}
              >
                Details
              </a>
            </div>
          ))
        ) : (
          <p>No pets found. Try another search.</p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default PetsPage;
