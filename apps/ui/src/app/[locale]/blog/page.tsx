import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import { Link, routing } from "@/lib/navigation"
import { fetchArticles } from "@/lib/strapi-api/content/server"
import { formatStrapiMediaUrl } from "@/lib/strapi-helpers"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"

export default async function BlogListPage({ params }: PageProps) {
  const { locale } = await params
  if (!routing.locales.includes(locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations()
  const res = await fetchArticles(locale)
  const posts = res?.data ?? []

  return (
    <div className={cn("bg-background min-h-screen")}>
      <section className="from-primary/10 to-secondary/10 relative bg-gradient-to-l py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              {t("blog.title", { default: "Blog" } as any)}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("blog.subtitle", {
                default: "Latest articles and news",
              } as any)}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => {
              const author = post.author
                ? `${post.author.firstName ?? post.author.first_name ?? ""} ${post.author.lastName ?? post.author.last_name ?? ""}`.trim()
                : undefined
              const authorAvatarUrl = post.author?.image?.url
              const avatarSrc = authorAvatarUrl
                ? formatStrapiMediaUrl(authorAvatarUrl)
                : null
              const date = post.publishedAt || post.createdAt
              const category = post.categories?.[0]?.name
              const posterUrl = post.poster?.url
              const posterSrc = posterUrl
                ? formatStrapiMediaUrl(posterUrl)
                : null
              return (
                <Link
                  key={post.id}
                  href={{ pathname: "/blog/" + post.slug }}
                  className="group border-border bg-card hover:shadow-medium overflow-hidden rounded-xl border shadow-sm transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {posterSrc ? (
                      <Image
                        src={posterSrc}
                        alt={post.Title ?? post.title ?? ""}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="bg-muted h-full w-full" />
                    )}
                    {category ? (
                      <div className="bg-primary text-primary-foreground absolute top-4 right-4 rounded-full px-3 py-1 text-sm">
                        {category}
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                      {post.Title ?? post.title}
                    </h3>
                    {post.description ? (
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.description}
                      </p>
                    ) : null}
                    <div className="text-muted-foreground flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {avatarSrc ? (
                          <Image
                            src={avatarSrc}
                            alt={author ?? "Author"}
                            width={20}
                            height={20}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span>{author ?? "-"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {date
                            ? new Date(date).toLocaleDateString(locale)
                            : "-"}
                        </span>
                      </div>
                    </div>
                    <div className="text-primary mt-4 flex items-center gap-2 font-semibold">
                      <span>
                        {t("blog.read_more", { default: "Read more" } as any)}
                      </span>
                      <ArrowLeft className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>
    </div>
  )
}
