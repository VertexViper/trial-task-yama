'use client'
import dynamic from "next/dynamic";
import Loader from "@/components/ui/loader";
import { useAccount } from "wagmi";


const SideBar = dynamic(() => import("@/components/layout/sidebar"), {
  loading: () => <Loader />,
});
const HeaderBar = dynamic(() => import("@/components/layout/header"), {
  loading: () => <Loader />,
});
interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isConnected } = useAccount();
  return (
    <section className="flex flex-col md:flex-row w-full">
        <SideBar />
        <div className="w-full bg-gray-900 flex flex-col">
          <HeaderBar />
          {children}
        </div>
    </section>
  )
}

export default Layout