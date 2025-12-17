import Navbar from "./nav";
import { Link } from "react-router";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-roboto">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative flex-1 flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-xl text-white">
            <p className="uppercase tracking-widest text-sm text-indigo-300 mb-4">
              Travel With Confidence
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Discover The World <br />
              With Travel Trip
            </h1>

            <p className="text-gray-200 text-base md:text-lg mb-8">
              Explore beautiful destinations, plan your trips easily,
              and create unforgettable memories with us.
            </p>

            <div className="flex gap-4">
              <Link
                to="/newTrips"
                className="bg-indigo-600 hover:bg-indigo-700
                text-white px-8 py-3 rounded-lg font-medium
                transition shadow-lg"
              >
                Book a Trip
              </Link>

              <Link
                to="/my-trips"
                className="border border-white/80
                text-white px-8 py-3 rounded-lg
                hover:bg-white/10 transition"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
