import Link from 'next/link'
import React from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { BsCartDash } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"

const Navbar = () => {
    return (
        <header className=''>
            <nav className='max-w-max mx-auto'>
                {/* nav top */}
                <div className='flex justify-between w-full relative flex-wrap items-center'>
                    {/* logo */}
                    <Link href={"/"} className="ml-2 text-xl font-[700] md:text-2xl">ProgramMerch</Link>
                    {/* menu */}
                    <div className='order-3 w-full md:order-1 md:w-fit'>
                        <ul className='flex gap-4 justify-around bg-black text-white py-2 flex-wrap px-2 md:bg-white md:text-black md:gap-6'>
                            {/* logo */}
                            <li>
                                <Link href={`/products?filter=t-shirts`}>T-shirts</Link>
                            </li>
                            <li>
                                <Link href={`/products?filter=hoodies`}>Hoodies</Link>
                            </li>
                            <li>
                                <Link href={`/products?filter=shirts`}>Shirts</Link>
                            </li>
                            <li>
                                <Link href={`/products?filter=watches`}>Watches</Link>
                            </li>
                            <li>
                                <Link href={`/products?filter=caps`}>Caps</Link>
                            </li>
                        </ul>
                    </div>
                    {/* icons */}
                    <div className='flex gap-4 items-center py-6 mr-2 text-xl md:order-2 md:text-2xl md:gap-8'>
                        <Link href={"/wishlist"}>
                            <AiOutlineHeart />
                        </Link>
                        <Link href={"/cart"} className='relative'>
                            {/* cart items count */}
                            <span className='absolute top-[-50%] right-[-50%] text-sm bg-black text-white px-1 rounded-[50%]'>0</span>
                            <BsCartDash />
                        </Link>
                        <Link href={"/profile/:id"}>
                            <CgProfile />
                        </Link>
                    </div>
                </div>
                {/* search bar */}
                <form className='flex justify-center py-4'>
                    <div className='w-[95%] max-w-[600px] bg-gray-100 flex p-2 rounded-[10px]'>
                        <input type="search" placeholder='Search here....' className='bg-transparent w-full border-none outline-none px-4' />
                        <button type="submit" className='bg-black text-white rounded-[10px] px-8 py-2'>Search</button>
                    </div>
                </form>
            </nav>
        </header>
    )
}

export default Navbar