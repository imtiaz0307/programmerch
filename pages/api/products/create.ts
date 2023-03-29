import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { database_connection } from "@/utils/DatabaseConnection";
import { VerifyToken } from "@/utils/VerifyToken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // if the request method is not post
    if (req.method !== "POST") return res.status(400).json({ error: "Only post requests are allowed." })

    // database connection handler
    await database_connection()

    try {
        const user_id = VerifyToken(req.headers?.["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Authenticate using valid token." })

        const user = await User.findById(user_id)
        if (user.user_type !== "admin") return res.status(403).json({ error: "Access denied." })

        // throwing an error if the product already exists
        let product = await Product.findOne({ title: req.body.title })
        if (product) return res.status(401).json({ error: "Product with the same title already exists." })

        product = await Product.create(req.body)
        await product.save()

        res.status(201).json({ success: `${product.name} has been added as product.` })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;