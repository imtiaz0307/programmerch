import Hero from "@/components/Hero"
import ProductsContainer from "@/components/ProductsContainer"

const Home = async () => {
  const response = await fetch('http://localhost:3000/api/products')
  const products = await response.json()

  return (
    <>
      <Hero />
      <ProductsContainer products={products} heading={"Grand Sale!"} />
      <ProductsContainer products={products} heading={"Newly Arrived!"} />
      <ProductsContainer products={products} heading={"Most Liked!"} />
    </>
  )
}

export default Home