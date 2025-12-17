import mongoose from "mongoose";

import TripDetailsModule from "../Model/TripDetailsModule.js";


export const createTrip= async (req,res)=>{
    try {
        const {
            name,
            start,
            end,
            startDate,
            endDate,
            adults,
            children,
            infants,
            assistance,
            assistanceType,
          } = req.body;
      
          
          const trip = new TripDetailsModule({
            userId:req.user.id,
            name,
            start,
            end,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            adults,
            children,
            infants,
            assistance,
            assistanceType,
          });
      
          
          const savedTrip = await trip.save();
          res.status(201).json(savedTrip);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const getTrip= async (req,res)=>{
  try {
    const details= await TripDetailsModule.find({userId:req.user.id})
    res.status(200).json(details);

  } catch (error) {
    res.status(500).json({message:"ERROR"})
    
  }
}

export const getName = async (req, res) => {
  try {
    res.status(200).json({ name: req.user.email });
  } catch (error) {
    res.status(500).json({ message: "ERROR" });
  }
};
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const delet = await TripDetailsModule.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!delet) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR" });
  }
};
