"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => {
    signOut();
  };

  const handleSignInClick = () => {
    signIn();
  };

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

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <>
              <div className="flex items-center gap-3 pt-6">
                <Avatar>
                  <AvatarImage src={data?.user?.image as string | undefined} />
                  <AvatarFallback>
                    {data.user.name?.split(" ")[0][0]}
                    {data.user.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {" "}
                  <h3 className="font-semibold">{data.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {data.user.email}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá, Faça seu Login</h2>
                <Button onClick={handleSignInClick} size="icon">
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}
          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Inicio</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorites-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
          <div className="py-6">
            <Separator />
          </div>
          {data?.user && (
            <Button
              onClick={handleSignOutClick}
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
