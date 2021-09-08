import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

type Data = {
    onWhitelist: boolean
}

export default async function CheckWhitelist(req: NextApiRequest, res: NextApiResponse<Data>) {
    const ip = req.headers["x-real-ip"]; // Works on Vercel
    let data: Data = {
        onWhitelist: false
    };

    if (ip) {
        const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appZvaxaDZfU6f4fE");
        const contactInfoTable = base("Contact Info");

        // Get all entries with the requested IP
        const contactSearch = await contactInfoTable.select({
            maxRecords: 1,
            filterByFormula: `({IP} = '${ip}')`
        }).all();

        // If there's one entry of the IP, that means that the person has used the site before
        data.onWhitelist = contactSearch.length > 0;
    }

    res.status(200).json(data);
}