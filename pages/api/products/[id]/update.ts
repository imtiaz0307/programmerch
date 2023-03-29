import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { database_connection } from "@/utils/DatabaseConnection";
import { VerifyToken } from "@/utils/VerifyToken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // if the request method is not post
    if (req.method !== "PUT") return res.status(400).json({ error: "Only put requests are allowed." })

    // database connection handler
    await database_connection()

    const { id } = req.query

    try {
        const user_id = VerifyToken(req.headers?.["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Authenticate using valid token." })

        const user = await User.findById(user_id)
        if (user.user_type !== "admin") return res.status(403).json({ error: "Access denied." })

        await Product.findByIdAndUpdate(id, {
            $set: req.body
        })

        res.status(200).json({ success: "Product updated successfully." })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler