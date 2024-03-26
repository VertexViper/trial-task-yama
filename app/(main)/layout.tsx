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
      <section className="flex flex-col md:flex-row w-full">
        <SideBar />
        <div className="w-full bg-gray-900 flex flex-col overflow">
          {children}
        </div>
      </section>
    </PrivateRoutes>
  )
}

export default Layout