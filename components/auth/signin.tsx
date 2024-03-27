import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

const validation = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validation),
    });
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data: any) => {
        setLoading(true);
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        if (result?.ok) {
            router.push('/portfolio')
            toast({
                title: "Authentication: Success",
                description: "Signed in successfully",
              })
        }else{
            toast({
                title: "Authentication: Failed",
                description: "Email or password is wrong",
              })
        }
        setLoading(false);
    };
    return (
        <Card className="w-[400px] bg-black text-white py-4">
            <CardHeader className="flex items-center justify-center w-full">
                <CardTitle className="text-3xl">Welcome to Portfolio</CardTitle>
                <CardDescription>Please input your credentials to sign in</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-2 py-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" className="text-white bg-gray-800" placeholder="Your Email" autoComplete="off" {...register("email")} />
                            {errors.email && (<span className="text-red-500 text-sm">{errors?.email.message}</span>)}
                        </div>
                        <div className="flex flex-col space-y-2 py-1">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" className="text-white bg-gray-800" placeholder="Password" autoComplete="off" {...register("password")} />
                            {errors.password && (<span className="text-red-500 text-sm">{errors?.password.message}</span>)}
                        </div>
                    </div>
                    <div className="py-4">
                        <Button type="submit" className="w-full">Sign In</Button>
                        <Separator className="my-4 bg-gray-700" />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="text-sm">Don’t you have an account?</div>
                <Link
                    href="/auth/signup"
                    className="h-[32px] font-light text-blue-300 text-sm"
                >
                    Sign Up
                </Link>
            </CardFooter>
        </Card>
    )
}

export default SignIn
