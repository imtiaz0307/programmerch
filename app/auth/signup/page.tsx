"use client"

import PasswordField from "@/components/PasswordField"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { BsEye, BsEyeSlash } from "react-icons/bs"


type FormData = {
    firstname: string,
    lastname: string,
    email: string,
    contact_number: string,
    password: string,
    confirm_password: string,
    address: string
}


const Signup = () => {
    const [emailError, setEmailError] = useState<string>("")
    const [phoneNumberError, setPhoneNumberError] = useState<string>("")
    const [showPassword, setShowPassword] = useState<Boolean>(false)

    // zod schema for form vaildation
    const schema: ZodType<FormData> = z.object({
        firstname: z.string().min(4).max(50),
        lastname: z.string(),
        email: z.string().email(),
        contact_number: z.string().min(11),
        password: z.string().min(1),
        confirm_password: z.string().min(1),
        address: z.string().min(1)
    }).superRefine(({ confirm_password, password }, ctx) => {
        if (confirm_password !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match"
            });
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    // sign up handler
    const signUp = async (data: FormData) => {
        const response = await fetch('/api/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const resData = await response.json()
        if (resData.error) {
            resData.error.toLowerCase().includes("email") ? setEmailError(resData.error) : setEmailError("")
            resData.error.toLowerCase().includes("phone") ? setPhoneNumberError(resData.error) : setPhoneNumberError("")
        }
        if (resData.token) {
            localStorage.setItem("auth-token", resData.token)
            window.location.href = "/"
        }
    }


    return (
        <section className="flex items-center justify-center flex-col py-16 px-2">
            <h2 className=" text-5xl leading-normal mb-8 font-[600]">Sign Up!</h2>
            {/* form */}
            <form className="md:p-8 p-4 shadow-my-shadow rounded-[10px]" onSubmit={handleSubmit(signUp)}>
                {/* firstname lastname */}
                <div className="flex flex-wrap gap-4 mb-4">
                    {/* firstname */}
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="firstname" className="font-[500] text-base">First Name</label>
                        <input type="text" id="firstname" placeholder="Enter your first name" className="outline-none border-b-2 border-b-black px-2  min-w-[280px] py-2" {...register("firstname")} />
                        {errors.firstname && <span className="text-[12px] text-red-500">{errors.firstname.message}</span>}
                    </div>
                    {/* lastname */}
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="lastname" className="font-[500] text-base">Last Name</label>
                        <input type="text" id="lastname" placeholder="Enter your last name" className="outline-none border-b-2 border-b-black px-2  min-w-[280px] py-2" {...register("lastname")} />
                        {errors.lastname && <span className="text-[12px] text-red-500">{errors.lastname.message}</span>}
                    </div>
                </div>
                {/* email && phone */}
                <div className="flex flex-wrap gap-4 mb-4">
                    {/* email */}
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="email" className="font-[500] text-base">Email Address</label>
                        <input type="email" id="email" placeholder="abc@xyz.com" className="outline-none border-b-2 border-b-black px-2  min-w-[280px] py-2" {...register("email")} />
                        {<span className="text-[12px] text-red-500">{errors?.email?.message || emailError}</span>}
                    </div>
                    {/* phone */}
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="phone_number" className="font-[500] text-base">Phone Number</label>
                        <input type="number" id="phone_number" placeholder="03123456789" className="outline-none border-b-2 border-b-black px-2  min-w-[280px] py-2" {...register("contact_number")} />
                        {<span className="text-[12px] text-red-500">{errors?.contact_number?.message || phoneNumberError}</span>}
                    </div>
                </div>
                {/* password && confirm */}
                <div className="flex flex-wrap gap-4 mb-4">
                    {/* password */}
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="password" className="font-[500] text-base">Password</label>
                        <div className="flex min-w-[280px] relative">
                            <input type={`${showPassword ? "text" : "password"}`} id="password" placeholder="Enter your password" className="outline-none border-b-2 border-b-black px-2 py-2 w-full pr-8"  {...register("password")} />
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
                        {errors.password && <span className="text-[12px] text-red-500">{errors.password.message}</span>}
                    </div>
                    {/* confirm pass */}
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="confirm_password" className="font-[500] text-base">Confirm Password</label>
                        <div className="flex min-w-[280px] relative">
                            <input type={`${showPassword ? "text" : "password"}`} id="confirm_password" placeholder="Re-enter password" className="outline-none border-b-2 border-b-black px-2 py-2 w-full pr-8"  {...register("confirm_password")} />
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
                        {errors.confirm_password && <span className="text-[12px] text-red-500">{errors.confirm_password.message}</span>}
                    </div>
                </div>
                {/* address */}
                <div>
                    <label htmlFor="address" className="font-[500] text-base">Enter your address</label>
                    <input type="text" id="address" placeholder="Street no:1 House no:2 Karachi" className="outline-none border-b-2 border-b-black px-2 w-full py-2" {...register("address")} />
                    {errors.address && <span className="text-[12px] text-red-500">{errors.address.message}</span>}
                </div>
                {/* button */}
                <div className="flex justify-center">
                    <button type="submit" className="mt-8 bg-black text-white px-6 md:px-8 py-3 rounded-[10px]">Sign Up</button>
                </div>
            </form>
        </section>
    )
}

export default Signup