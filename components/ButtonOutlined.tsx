import Link from 'next/link'
import React from 'react'

const ButtonOutlined = ({ value, url }: { value: String, url: String }) => {
    return (
        <Link href={`/${url}`} className='rounded-[10px] border-2 border-black sm:text-lg sm:px-8 py-2 px-6 text-sm'>{value}</Link>
    )
}

export default ButtonOutlined