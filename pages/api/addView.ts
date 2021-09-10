import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

type Data = {
    id: string
}

export default async function CheckWhitelist(req: NextApiRequest, res: NextApiResponse) {
    let data: Data = {
        id: req.body.id
    };

    if (data.id) {
        const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appZvaxaDZfU6f4fE");
        const grantsTable = base("Grants");

        // Get the grant with the given ID
        const grant = await grantsTable.find(data.id);

        // If it exists, update the view count
        if (grant) {
            grant.updateFields({
                Views:  Number(grant.get("Views")) + 1
            });
        }
    }

    res.status(200).json({ status: 200 });
}