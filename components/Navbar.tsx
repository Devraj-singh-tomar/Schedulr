import Logo from "@/public/calendar1.png";
import Image from "next/image";
import Link from "next/link";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  return (
    <div className="py-5 flex items-center justify-between">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={Logo} alt="logo" className="size-10" />

        <h4 className="text-3xl font-semibold uppercase">
          Sche<span className="text-primary">dulr</span>
        </h4>
      </Link>

      <AuthModal />
    </div>
  );
};
