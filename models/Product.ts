import { Schema, models, model } from "mongoose"

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true /* Keeping it unique because it is a single store */
        },
        description: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            default: []
        },
        price: {
            type: Number,
            required: true
        },
        sale_price: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            default: ''
        },
        brand: {
            type: String,
            default: "ProgramMerch"
        },
        inventory: {
            type: Number,
            default: 0
        },
        ratings: {
            type: Number,
            default: 0
        },
        reviews: {
            type: Array,
            default: []
        },
        variations: {
            type: Array,
            default: []
        },
        related_keywords: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

export const Product = models.product || model("product", productSchema)