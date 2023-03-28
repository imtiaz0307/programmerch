import { Schema, models, model } from "mongoose"

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        contact_number: {
            type: String,
            required: true,
            unique: true
        },
        cart: {
            type: Array,
            default: []
        },
        orders: {
            type: Array,
            default: []
        },
        wishlist: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

export const User = models.user || model("user", userSchema);