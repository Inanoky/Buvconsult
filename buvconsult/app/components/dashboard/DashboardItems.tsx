"use client"


import Link from "next/link"
import {navLinks} from "@/app/dashboard/layout";
import {cn} from "@/lib/utils"
import {usePathname} from "next/navigation"

export function DashboardItems(){

    const pathname = usePathname();

    return(
        <>
            {navLinks.map((item) => (
                <Link href={item.href} key={item.name} className={cn(
                    pathname == item.href
                        ? "bg-muted text-primary"
                        : "text-muted-foreground bg-none",
                    "flex items-center gap-3 rounder-lg px-3 py-2 transition-all hover:text-primary/70"

                )}>
                    <item.icon className="size-4"/>
                    {item.name}
                </Link>

            ))}
        </>
    )
}