import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { database_connection } from "@/utils/DatabaseConnection";
import { VerifyToken } from "@/utils/VerifyToken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // if the request method is not delete
    if (req.method !== "DELETE") return res.status(400).json({ error: "Only delete requests are allowed." })

    // database connection handler
    await database_connection()

    const { id } = req.query

    try {
        const user_id = VerifyToken(req.headers?.["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Authenticate using valid token." })

        const user = await User.findById(user_id)
        if (user.user_type !== "admin") return res.status(403).json({ error: "Access denied." })

        const product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(404).json({ error: "No product found." })

        res.status(200).json({ success: "Product deleted successfully." })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler