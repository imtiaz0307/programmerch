import { User } from "@/models/User";
import { database_connection } from "@/utils/DatabaseConnection";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // if the request method is not post
    if (req.method !== "POST") return res.status(400).json({ error: "Only post requests are allowed." })

    // database connection handler
    await database_connection()

    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(404).json({ error: "Invalid credentials." })

        password = await compare(password, user.password)
        if (!password) return res.status(404).json({ error: "Invalid credentials." })

        const payload = {
            user: {
                id: user._id
            }
        }
        const token = sign(payload, process.env.JWT_SECRET!)

        res.status(201).json({ token })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;