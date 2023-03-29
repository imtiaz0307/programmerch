import { verify } from "jsonwebtoken"

export const VerifyToken = (auth_token: string): String => {
    const { user: { id: user_id } }: any = verify(auth_token, process.env.JWT_SECRET!)
    return user_id
}