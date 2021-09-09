import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

export default async function CheckWhitelist(req: NextApiRequest, res: NextApiResponse) {
    const ip = req.headers["x-real-ip"]; // Works for Vercel

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
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: 500 });
        return;
    }

    res.status(200).json({ status: 200 });
    return;
}