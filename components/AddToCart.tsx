import { BsCartPlus } from "react-icons/bs"

const AddToCart = () => {
    return (
        <button className="flex bg-black text-white items-center gap-4 w-full justify-center p-4 rounded-[10px] mt-4">
            <BsCartPlus />
            <span>Add To Cart</span>
        </button>
    )
}

export default AddToCart