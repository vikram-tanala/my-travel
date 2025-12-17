import Booking from "./Booking/booking";
import Navbar from "./nav";

function NewTrip() {
  return (
    <div className="min-h-screen flex flex-col font-roboto">
      {/* Navbar */}
      <Navbar />

      {/* FULL PAGE BACKGROUND WRAPPER */}
      <div className="relative min-h-screen w-full">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-indigo-900/60 to-slate-900/70" />

        {/* Page Content */}
        <div className="relative z-10 flex flex-col">
          
          {/* Page Header */}
          <div className="max-w-7xl mx-auto px-6 md:px-20 pt-16 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Plan Your Next Adventure
            </h1>
            <p className="text-slate-200 max-w-2xl">
              Fill in your trip details and let us help you create an unforgettable travel experience.
            </p>
          </div>

          {/* Booking Section */}
          <div className="flex-1">
            <Booking />
          </div>

        </div>
      </div>
    </div>
  );
}

export default NewTrip;
