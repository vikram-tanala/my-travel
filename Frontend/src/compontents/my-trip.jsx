import { useState, useEffect } from 'react'; // Added useEffect
import Navbar from './nav';
import Trips from './Triplist/Trips';

function MyTrip() {
  const [trips, setTrips] = useState([]);
  // Fixed: Vite env variables usually start with VITE_
  const baseUrl = import.meta.env.VITE_B_URL; 

  const fetchDetails = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const res = await fetch(`${baseUrl}/api/user/getTrips`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const Data = await res.json();
        setTrips(Data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fixed: Call fetchDetails inside useEffect to run only once
  useEffect(() => {
    fetchDetails();
  }, [baseUrl]);

  const deletTrip = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}/api/user/deleteTrip/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      alert("Delete Successfully");
      fetchDetails(); // Refresh list after delete
    }
  };

  return (
    <div>
      <Navbar />
      <Trips trips={trips} deleteTrip={deletTrip} />
    </div>
  );
}

export default MyTrip;