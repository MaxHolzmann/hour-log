import Entry from "@/db/models/Entry";
import { connectMongo } from "../../db/config/index";

export default async function handler(req, res) {
  const { startDate, endDate, id } = req.query;

  if (!id) {
    res.status(400).json({ message: "No user id provided" });
  }

  if (startDate && endDate) {
    try {
      await connectMongo(process.env.MONGODB_URI);
      const fetechedEntries = await Entry.find({
        date: { $gte: startDate, $lte: endDate },
        user: id,
      });
      res.status(200).json(fetechedEntries);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.body);
    }
  } else {
    try {
      await connectMongo(process.env.MONGODB_URI);
      const fetechedEntries = await Entry.find({ user: id });
      res.status(200).json(fetechedEntries);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.body);
    }
  }
}
