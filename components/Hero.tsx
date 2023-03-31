import ButtonFilled from "@/components/ButtonFilled"
import ButtonOutlined from "@/components/ButtonOutlined"
import Image from "next/image"

const Hero = () => {
    return (
        <section className="flex items-center gap-4 max-h-[550px] min-h-[550px] overflow-hidden px-4">
            <div className="flex-[1.2] flex flex-col items-center text-center md:block md:text-left">
                <h3 className="sm:text-4xl text-2xl font-[600]">Code Your Style With</h3>
                <h1 className="sm:text-7xl font-[900] leading-normal mb-6 text-[12vw]">ProgramMerch</h1>
                <p className="text-sm text-gray-700">Welcome to ProgramMerch - your one-stop-shop for all things programming-related! We offer a wide range of high-quality merchandise for coders and tech enthusiasts, from stylish t-shirts and hoodies to mugs and stickers. Express your love for coding with our unique designs and show off your passion to the world. Shop now and join the community of proud programmers with ProgramMerch!</p>
                <div className="flex items-center mt-12 gap-4">
                    <ButtonFilled url={""} value={"Shop Now"} />
                    <ButtonOutlined url={""} value={"Login"} />
                </div>
            </div>
            <div className="flex-1 items-center justify-center relative rounded-bl-[100%] rounded-br-[100%] hidden md:flex ">
                <Image src={"/hero.png"} alt="abc" width={1000} height={1000}
                    className="min-w-[300px] w-[90%]" />
            </div>
        </section>
    )
}

export default Hero