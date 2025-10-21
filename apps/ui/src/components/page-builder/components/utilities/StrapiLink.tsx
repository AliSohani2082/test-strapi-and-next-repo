import React from "react"
import { Data } from "@repo/strapi"

import AppLink from "@/components/elementary/AppLink"

export interface StrapiLinkProps {
  readonly component: Data.Component<"utilities.link"> | undefined | null
  readonly children?: React.ReactNode
  readonly className?: string
  readonly hideWhenMissing?: boolean
  readonly onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function StrapiLink({
  component,
  children,
  className,
  hideWhenMissing,
  onClick,
}: StrapiLinkProps) {
  if (component == null && hideWhenMissing) {
    return null
  }

  if (component?.href == null) {
    return children ?? component?.label ?? null
  }

  return (
    <AppLink
      href={component.href}
      openExternalInNewTab={component.newTab ?? false}
      className={className}
      onClick={onClick}
    >
      {children ?? component.label}
    </AppLink>
  )
}

StrapiLink.displayName = "StrapiLink"

export default StrapiLink
