import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function ProductHome() {
 return (
 <Card className="w-full border-none  px-0  h-[250px] sm:h-[320px] md:h-[380px] lg:h-[530px] ">
 <CardContent className="relative w-full h-full px-0  ">
 
 <div className= "reletive hidden lg:flex w-full h-full  lg:bg-[url('/مشاوره-خرید.webp')]  lg:bg-fixed bg-auto object-cover bg-no-repeat items-center justify-center lg:bg-cover rounded-lg  ">
{/* <Link href="/contactus">
 <Button className="md:mt-11 md:block hidden lg:w-[145px] lg:h-[55px] bg-blues hover:bg-blues/90 rounded-[60px]  font-bold text-xl text-white z-10 ">
تماس با ما
 </Button>
 </Link> */}
 </div>
 <Image src="/مشاوره-خرید.webp" fill className="lg:hidden"/>
 </CardContent>
 </Card>
 );
}