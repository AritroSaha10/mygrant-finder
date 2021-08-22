import type { NextApiRequest, NextApiResponse } from 'next'

/*
type Data = {
    onWhitelist: boolean
}
*/

export default function CheckWhitelist(req: NextApiRequest, res: NextApiResponse) {
    console.log();

    res.status(200).json(req.headers);
}