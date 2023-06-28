import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

const useSidebar = () => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: HiHome
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: BiSearch
      }
    ],
    [pathname]
  );

  return { routes, pathname };
};

export default useSidebar;
