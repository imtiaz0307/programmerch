import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { User } from "@/models/User";
import { database_connection } from "@/utils/DatabaseConnection";
import { VerifyToken } from "@/utils/VerifyToken";
import { NextApiRequest, NextApiResponse } from "next";

interface IReview {
    username: String,
    product_id: String,
    rating: number,
    comment: String
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // if the request method is not post
    if (req.method !== "POST") return res.status(400).json({ error: "Only post requests are allowed." })

    // database connection handler
    await database_connection()

    const { id } = req.query
    const { comment, rating } = req.body
    let product_ratings: number = rating;

    try {
        // verifying user with the auth token
        const user_id = VerifyToken(req.headers?.["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Authenticate using valid token." })

        // finding user by id
        const user = await User.findById(user_id)

        // finding product by id
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ error: "No product found." })

        // getting the old product ratings and adding to the current review's rating
        product.reviews.forEach((review: IReview) => {
            product_ratings += review.rating
        })

        // checking whether the review exists with the same username on same product
        let review = await Review.findOne({ username: user.firstname, product_id: product._id })
        if (review) return res.status(401).json({ error: "You have already reviewed the product." })

        // creating review
        review = await Review.create({
            username: user.firstname,
            product_id: product._id,
            comment,
            rating
        })
        review.save()

        await Product.findByIdAndUpdate(product._id, {
            // pushing review to the product reviews
            $push: {
                reviews: {
                    username: user.firstname,
                    product_id: product._id,
                    comment,
                    rating
                }
            },
            // setting the new product rating
            $set: {
                ratings: product_ratings / (product.reviews.length + 1)
            }
        })

        // response
        res.status(200).json({ success: `You rated ${product.name} with ${rating} stars.` })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler