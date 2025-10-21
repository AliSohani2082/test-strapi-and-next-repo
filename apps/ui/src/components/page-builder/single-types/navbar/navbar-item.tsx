"use client"

import { ReactNode } from "react"

import { Link, usePathname } from "@/lib/navigation"
import { cn } from "@/lib/styles"

type Props = {
  href: string
  children: ReactNode
  active?: boolean
  className?: string
  target?: string
}

export function NavbarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        "hover:bg-primary flex items-center justify-center rounded-md px-4 py-2 text-sm leading-[110%] transition duration-200 hover:text-white/80 hover:shadow-[0px_1px_0px_0px_var(--primary)_inset]",
        (active || pathname?.includes(href)) && "bg-transparent",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  )
}
