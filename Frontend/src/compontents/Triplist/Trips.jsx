import { useState } from "react";
import { Link } from "react-router";

export default function Trips({ trips, deleteTrip }) {
  const [selectedTrip, setSelectedTrip] = useState(null);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  // Empty State
  if (trips.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center
        bg-gradient-to-br from-sky-50 to-indigo-100 text-center px-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          No trips yet
        </h1>
        <p className="text-slate-600 max-w-md mb-6">
          Start planning your journey and explore amazing destinations.
        </p>
        <Link
          to="/newTrips"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          Book Your First Trip
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-10">
          My Trips
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {trips.map((trip) => {
            const isActive = selectedTrip === trip._id;

            return (
              <div
                key={trip._id}
                onClick={() => setSelectedTrip(trip._id)}
                className={`rounded-3xl overflow-hidden cursor-pointer transition
                  ${
                    isActive
                      ? "ring-2 ring-indigo-500 scale-[1.02]"
                      : "hover:scale-[1.02]"
                  }
                `}
              >
                {/* Image Section */}
                <div
                  className="relative h-44 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="relative z-10 p-5 text-white">
                    <h2 className="text-xl font-semibold">
                      {trip.name}
                    </h2>
                    <p className="text-sm text-gray-200">
                      {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
                    </p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="bg-white p-6 flex justify-between gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">From</p>
                      <p className="font-medium text-slate-700">
                        {trip.start}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">To</p>
                      <p className="font-medium text-slate-700">
                        {trip.end}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Assistance</p>
                      <p className="font-medium text-slate-700">
                        {trip.assistanceType || "None"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTrip(trip._id);
                    }}
                    className="h-fit text-sm text-red-600 border border-red-200
                      px-4 py-2 rounded-lg hover:bg-red-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
