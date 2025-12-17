import { Router } from "express";
import { loginUser, signupUser } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import messageModule from "../Model/messageModule.js";

import { createTrip,  deleteTrip,  getName,  getTrip } from "../controllers/newTripController.js";
import rateLimit from "express-rate-limit";

const route=Router();

const authLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10
})


route.post("/signup",authLimit, signupUser);
route.post("/login", authLimit,loginUser);

// routes/contact.js
route.post("/contact",auth, async (req, res) => {
  const { username, email, message } = req.body;

  if (!username || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }
  const newMessage = new messageModule({
        username,
        email,
        message
      });
    const result = await  messageModule.insertOne(newMessage);

  // Save to DB or send email
  console.log({ username, email, message });

  res.json({ message: "Message received" });
});


route.post("/newTrip",auth,createTrip)
route.get("/getTrips",auth,getTrip)
route.get("/getName",auth,getName)
route.delete("/deleteTrip/:id",auth,deleteTrip)
export default route