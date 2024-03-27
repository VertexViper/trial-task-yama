import dynamic from "next/dynamic";
import Loader from "@/components/ui/loader";
import PrivateRoutes from "../privateRoutes";

const SideBar = dynamic(() => import("@/components/layout/sidebar"), {
  loading: () => <Loader />,
});

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PrivateRoutes>
      <div className="flex flex-col md:flex-row w-full">
        <SideBar />
        <div className="w-full bg-gray-900 flex flex-col overflow-y-auto h-screen">
          {children}
        </div>
      </div>
    </PrivateRoutes>
  )
}

export default Layout