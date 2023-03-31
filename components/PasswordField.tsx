"use client"

import { BsEyeSlash, BsEye } from "react-icons/bs"
import { useState } from "react"

interface Password {
    label: String,
    id: String,
    placeholder: String,
    val: any
}

const PasswordField = ({ label, id, placeholder, val }: Password) => {
    const [showPassword, setShowPassword] = useState<Boolean>(false)

    return (
        <div className="flex flex-col gap-1 flex-1">
            <label htmlFor={`${id}`} className="font-[500] text-base">{label}</label>
            <div className="flex min-w-[280px] relative">
                <input type={`${showPassword ? "text" : "password"}`} id={`${id}`} placeholder={`${placeholder}`} className="outline-none border-b-2 border-b-black px-2 py-2 w-full pr-8" {...val} />
                {
                    showPassword
                        ?
                        <span onClick={() => setShowPassword(false)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                            <BsEyeSlash />
                        </span>
                        :
                        <span onClick={() => setShowPassword(true)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                            <BsEye />
                        </span>
                }
            </div>
        </div>
    )
}

export default PasswordField