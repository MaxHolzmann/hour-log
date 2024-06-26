import Entry from "@/db/models/Entry";
import { connectMongo } from "../../db/config/index";

//add auth middleware

export default async function handler(req, res) {
  const { startDate, endDate } = req.query;

  if (startDate && endDate) {
    try {
      await connectMongo(process.env.MONGODB_URI);
      const fetechedEntries = await Entry.find({
        date: { $gte: startDate, $lte: endDate },
      });
      res.status(200).json(fetechedEntries);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.body);
    }
  } else {
    try {
      await connectMongo(process.env.MONGODB_URI);
      const fetechedEntries = await Entry.find();
      res.status(200).json(fetechedEntries);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.body);
    }
  }
}

//with auth example from previous project, currently building without auth

// export default async function handler(req, res) {
//   const { id, contact_id } = req.query;
//   // Use the `id` parameter in your logic
//   // Example: Retrieve user data based on the `id`
//   try {
//     await connectMongo(process.env.MONGODB_URI);
//     const allUsersGames = await Entry.find({ user: id });
//     console.log("All Games GET made from " + id);
//     res.status(200).json(allUsersGames);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err.body);
//   }
// }
