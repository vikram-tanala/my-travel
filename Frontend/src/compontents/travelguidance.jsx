import Navbar from "./nav";

export default function TravelGuidance() {
  return (
    <div className="min-h-screen font-roboto">
      <Navbar />

      {/* Hero */}
      <div
        className="relative h-[45vh] flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Guidance
          </h1>
          <p className="text-slate-200 max-w-2xl">
            Smart tips and essential guidance to help you travel safely and confidently.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-sky-50 to-indigo-100 py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              🧳 Pack Smart
            </h3>
            <p className="text-slate-600 text-sm">
              Carry only essentials, keep documents safe, and always pack according to climate.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              🛂 Travel Documents
            </h3>
            <p className="text-slate-600 text-sm">
              Keep digital copies of ID, tickets, and emergency contacts accessible.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              🏥 Health & Safety
            </h3>
            <p className="text-slate-600 text-sm">
              Carry basic medicines and ensure travel insurance for peace of mind.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              💰 Budget Planning
            </h3>
            <p className="text-slate-600 text-sm">
              Plan expenses in advance and keep emergency cash separate.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              🌍 Local Culture
            </h3>
            <p className="text-slate-600 text-sm">
              Respect local traditions and laws to have a smooth travel experience.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              📍 Navigation Tips
            </h3>
            <p className="text-slate-600 text-sm">
              Download offline maps and save important locations beforehand.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
