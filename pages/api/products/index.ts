import { Product } from "@/models/Product";
import { database_connection } from "@/utils/DatabaseConnection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await database_connection()

    try {
        const products = await Product.find()

        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error)
    }

}

export default handler