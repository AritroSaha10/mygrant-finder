import type { NextApiRequest, NextApiResponse } from 'next'
import admin from "../../util/firebase/admin"

type Data = {
    onWhitelist: boolean
}

export default async function CheckWhitelist(req: NextApiRequest, res: NextApiResponse<Data>) {
    const ip = req.headers["x-nf-client-connection-ip"]; // Only works for netlify
    console.log(req.body);

    res.status(200).write("200 OK");
}