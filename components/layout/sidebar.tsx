'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { generateAvatarURL } from '@cfx-kit/wallet-avatar'
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const SideBar = () => {
    const session = useSession()
    const address = session.data?.user.wallet
    const randomAvatar = generateAvatarURL(address||'')
    return (
        <div className={`w-full md:w-[400px] flex flex-col justify-between md:h-screen bg-gray-950 p-5 text-white`}>
            <div className={``}>
                <div className=" text-xl md:text-3xl font-bold">Portfolio</div>
                <div className="flex flex-col justify-center items-center py-5 gap-4 text-blue-300">
                    <Avatar className='w-[100px] h-[100px]'>
                        <AvatarImage src={randomAvatar} className='w-[100px] h-[100px]' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>{address?address?.substring(0,4)+'...'+address?.substring(address.length-4):'Please connect your wallet'}</div>
                </div>
                <div className="flex justify-center items-center mt-3 w-full">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/portfolio"
                        >
                            <Button variant={"ghost"} className="w-[120px]">Portfolio</Button>
                        </Link>
                        <Link
                            href="swap"
                        >
                            <Button variant={"ghost"} className="w-[120px]">Swap</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <Button variant={"ghost"} className="w-[120px] text-red-500" onClick={()=>signOut({callbackUrl: '/auth/signin'})}>Logout</Button>
            </div>
        </div>
    )
}

export default SideBar;