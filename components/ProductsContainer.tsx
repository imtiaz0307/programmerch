import { Key } from "react"
import ProductCard from "./ProductCard"
import ButtonFilled from "./ButtonFilled"

const ProductsContainer = ({ products, heading }: { products: any, heading: String }) => {
    return (
        <section className="py-12 md:py-20 flex flex-col items-center gap-12 px-4">
            <h2 className="text-4xl font-[600] md:text-6xl">{heading}</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {
                    products.slice(0, 6).map((product: any, index: Key) => {
                        const productRating = Math.round(product.ratings)
                        const filledStars = []
                        for (let i = 0; i < productRating; i++) {
                            filledStars.push(i)
                        }
                        const outlinedStars = []
                        for (let i = 0; i < 5 - filledStars.length; i++) {
                            outlinedStars.push(i)
                        }
                        return <ProductCard key={index} product={product} filledStars={filledStars} outlinedStars={outlinedStars} />
                    })
                }
            </div>
            <span className="scale-125">
                <ButtonFilled value={"Show More"} url={""} />
            </span>
        </section>
    )
}

export default ProductsContainer