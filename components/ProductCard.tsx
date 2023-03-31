import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import AddToCart from "@/components/AddToCart"
import Image from "next/image"
import Link from "next/link"
import { Key } from "react"

const ProductCard = ({ product, filledStars, outlinedStars }: any) => {
    return (
        <Link href={"/"} className="max-w-[350px] min-w-[280px] w-full p-2 border-black border-[1px] rounded-[10px]">
            <div className="rounded-[10px] overflow-hidden">
                <Image src={product.image} alt={product.name} height={1000} width={1000}
                    className="w-full h-[200px] object-cover hover:scale-105 transition-all duration-150" />
            </div>
            <h2 className="text-xl font-[500] my-2">{product.name}</h2>
            <div className="flex items-center gap-1 mb-2">
                {
                    filledStars.map((fStar: Number, index: Key) => <AiFillStar key={index} />)
                }
                {
                    outlinedStars.map((oStar: Number, index: Key) => <AiOutlineStar key={index} />)
                }
            </div>
            <div className="flex justify-between mb-2">
                <p>Before: <span className={`${product.sale_price ? "line-through" : "none"}`}>{product.price}</span></p>
                {
                    product.sale_price > 0
                    &&
                    <p>Now: <span>{product.sale_price}</span></p>
                }
            </div>
            <AddToCart />
        </Link>
    )
}

export default ProductCard