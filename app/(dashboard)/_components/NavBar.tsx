import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./MobileSideBar";

export const NavBar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
