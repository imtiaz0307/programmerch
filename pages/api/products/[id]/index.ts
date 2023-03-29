import { Product } from "@/models/Product"
import { database_connection } from "@/utils/DatabaseConnection"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await database_connection()

    const { id } = req.query

    try {
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ error: "No product found." })

        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler