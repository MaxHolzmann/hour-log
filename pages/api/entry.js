// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// add auth middleware
import Entry from "../../db/models/Entry";
import { connectMongo } from "../../db/config/index";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongo(process.env.MONGODB_URI);
      const newEntry = await Entry.create(req.body);
      console.log(newEntry);
      res.status(200).json(newEntry);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.body);
    }
  }
}
