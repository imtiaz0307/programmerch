import { Review } from "@/models/Review";
import { database_connection } from "@/utils/DatabaseConnection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await database_connection()

    const { id } = req.query

    try {
        const prouduct_reviews = await Review.find({ product_id: id })

        res.status(200).json(prouduct_reviews)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;