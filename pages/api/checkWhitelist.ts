import type { NextApiRequest, NextApiResponse } from 'next'
import admin from "../../util/firebase/admin"

type Data = {
    onWhitelist: boolean
}

export default async function CheckWhitelist(req: NextApiRequest, res: NextApiResponse<Data>) {
    const ip = req.headers["x-nf-client-connection-ip"]; // Only works for netlify
    let data: Data = {
        onWhitelist: false
    };

    if (ip) {
        // Check Firestore for IPs
        const contactRef = admin.firestore().collection("contact-info");
        const query = contactRef.where("ip", "==", ip);

        const BreakException = {};
        try {
            // Set data whitelist to true if there's a doc
            const querySnapshot = await query.get();
            querySnapshot.forEach((doc) => {
                data.onWhitelist = true;
                throw BreakException;
            });
        } catch (e) {
            if (e !== BreakException) {
                console.log("Error executing query: ", e);
            }
        }
    }

    res.status(200).json(data);
}