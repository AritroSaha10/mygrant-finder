import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

type Data = {
    onWhitelist: boolean
}

export default async function CheckWhitelist(req: NextApiRequest, res: NextApiResponse<Data>) {
    const ip = req.headers["x-real-ip"]; // Works for Vercel
    console.log(req.body);

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appZvaxaDZfU6f4fE");
    const contactInfoTable = base("Contact Info");

    try {
        contactInfoTable.create([
            {
                fields: {
                    "Timestamp": new Date().toISOString(),
                    "Full Name": req.body.name,
                    "Email": req.body.email,
                    "IP": ip
                }
            }
        ]);

        res.status(200).write("200 OK");
    } catch (e) {
        console.log(e);
        res.status(500).write("500 Internal Server Error");
    }
}