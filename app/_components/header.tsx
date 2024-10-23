import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="FSW Foods"
          height={30}
          width={110}
          quality={100}
        />
      </Link>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};
