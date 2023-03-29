import { Schema, models, model } from "mongoose"

const reviewSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "product"
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

export const Review = models.review || model("review", reviewSchema)