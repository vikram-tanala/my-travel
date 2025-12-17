import Stepper from "./Stepper";
import YourDetails from "./YourDetails";
import DateSelection from "./DateSelection";
import Guests from "./Guests";
import { useState } from "react";
import TravelAssistance from "./TravelAssistance";
import Confirmation from "./Confirmation";





export default function Booking() {
  const token=localStorage.getItem('token')
  if (!token) {
  alert("Please login again");
  return;
}

  const THEME = "#304766";
  const TICK_IMG = "https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png";

  const [step, setStep] = useState(1);
  const baseUrl = import.meta.env.VITE_B_URL;
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    assistance: false,
    assistanceType: "",
  });





  
  // Generic input handler (inputs, selects, checkboxes)
  
  const handleChange = async(e) => {
    //@ts-ignore
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));

   
  };

  // Guests updater
  const updateGuests = (field, delta) => {
    setFormData((p) => {
      let next = p[field] + delta;
      if (field === "adults") next = Math.max(1, next);
      else next = Math.max(0, next);
      return { ...p, [field]: next };
    });
  };

  // Validate all requirements needed to reach `targetStep`
  
  const validateForTarget = (targetStep) => {
    const newErrors = {};
    if (targetStep > 1) {
      
      if (!formData.name.trim()) newErrors.name = "Enter your name";
      if (!formData.start.trim()) newErrors.start = "Enter your start location";
      if (!formData.end.trim()) newErrors.end = "Enter your end location";
    }
    if (targetStep > 2) {
      if (!formData.startDate) newErrors.startDate = "Select start date";
      if (!formData.endDate) newErrors.endDate = "Select end date";
      if (formData.startDate && formData.endDate) {
        const s = new Date(formData.startDate);
        const e = new Date(formData.endDate);
        if (e < s) newErrors.endDate = "The end date cannot be less than the start date";
      }
    }
    return newErrors;
  };

  // Navigation handlers
  const goNext = () => {
    const v = validateForTarget(step + 1);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const handleStepClick = (target) => {
    if (target <= step) {
      // allow backward navigation freely
      setErrors({});
      setStep(target);
      return;
    }
    // forward navigation needs validation
    const v = validateForTarget(target);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    setStep(target);
  };

  const handleConfirm = async(e) => {
    e.preventDefault()
    const {name,
      start,
      end,
      startDate,
      endDate,
      adults,
      children,
      infants,
      assistance,
      assistanceType}=formData
    const res= await fetch(`${baseUrl}/api/user/newTrip`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify({name,end,startDate,start,endDate,adults,children,infants,assistance,assistanceType})
    })
    
    if (!res.ok) {
  const text = await res.text();
  throw new Error(text);
}
const data = await res.json();
    console.log(data)
    if(res.ok){
      setConfirmed(true)
      alert("Successfully Added")
    }
    else{
      alert("Error")
      console.log(Error)
    }

  };

  const handleCancel = () => {
    setFormData({
      name: "",
      start: "",
      end: "",
      startDate: "",
      endDate: "",
      adults: 1,
      children: 0,
      infants: 0,
      assistance: false,
      assistanceType: "",
    });
    setErrors({});
    setStep(1);
    setConfirmed(false);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-sky-100
    flex items-center justify-center px-6 py-10">

    {/* Outer Container */}
    <div
      className="relative w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl"
      style={{ minHeight: "78vh" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
        }}
      />
      <div className="absolute inset-0 bg-[#0f172a]/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[78vh]">

        {/* Left Sidebar */}
        <div className="hidden md:flex w-80 bg-white/95 backdrop-blur-md p-8">
          <Stepper
            step={step}
            onStepClick={handleStepClick}
            tickImg={TICK_IMG}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col"
            style={{
              width: 720,
              maxWidth: "100%",
              minHeight: 460,
            }}
          >
            {!confirmed ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Plan Your Journey
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Step {step} of 5 · Complete your booking
                  </p>
                </div>

                {step === 1 && (
                  <YourDetails
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    onNext={goNext}
                    theme={THEME}
                  />
                )}
                {step === 2 && (
                  <DateSelection
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    onNext={goNext}
                    onBack={goBack}
                    theme={THEME}
                  />
                )}
                {step === 3 && (
                  <Guests
                    formData={formData}
                    onInc={(k) => updateGuests(k, 1)}
                    onDec={(k) => updateGuests(k, -1)}
                    onNext={goNext}
                    onBack={goBack}
                    theme={THEME}
                  />
                )}
                {step === 4 && (
                  <TravelAssistance
                    formData={formData}
                    onChange={handleChange}
                    onNext={goNext}
                    onBack={goBack}
                    theme={THEME}
                  />
                )}
                {step === 5 && (
                  <Confirmation
                    formData={formData}
                    onBack={goBack}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    theme={THEME}
                    tickImg={TICK_IMG}
                  />
                )}
              </>
            ) : (
              /* Success State */
              <div className="text-center py-12">
                <img
                  src={TICK_IMG}
                  alt="success"
                  className="w-20 h-20 mx-auto mb-6"
                />
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-slate-600 mb-8">
                  Your journey has been successfully planned.
                </p>
                <button
                  onClick={handleCancel}
                  className="bg-indigo-600 hover:bg-indigo-700
                    text-white px-8 py-3 rounded-lg shadow transition"
                >
                  Book a New Trip
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
