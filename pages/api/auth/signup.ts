import { database_connection } from "@/utils/DatabaseConnection";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/User"
import { genSalt, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    // if the request method is not post
    if (req.method !== "POST") return res.status(400).json({ error: "Only post requests are allowed." })

    // database connection handler
    await database_connection()

    let { firstname, lastname, email, password, address, contact_number } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(403).json({ error: "Email belongs to another account." })

        const salt = await genSalt(10)
        password = await hash(password, salt)

        if (contact_number.startsWith("0")) {
            contact_number = `+92${contact_number.slice(1)}`
        }

        user = await User.create({ firstname, lastname, email, password, address, contact_number })
        await user.save()

        const payload = {
            user: {
                id: user._id
            }
        }
        const token = sign(payload, process.env.JWT_SECRET!)

        res.status(201).json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export default handler;