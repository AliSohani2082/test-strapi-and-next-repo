import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import { Link, routing } from "@/lib/navigation"
import { fetchArticleBySlug } from "@/lib/strapi-api/content/server"
import { formatStrapiMediaUrl } from "@/lib/strapi-helpers"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"

export default async function BlogDetailPage({
  params,
}: PageProps<{ slug: string }>) {
  const { locale, slug } = await params
  if (!routing.locales.includes(locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations()
  const res = await fetchArticleBySlug(slug, locale)
  const article = res?.data
  if (!article) notFound()

  const authorName = article.author
    ? `${article.author.firstName ?? ""} ${article.author.lastName ?? ""}`.trim()
    : undefined
  const authorImage = article.author?.image?.url
  const authorAvatar = authorImage ? formatStrapiMediaUrl(authorImage) : null
  const date = article.publishedAt || article.createdAt
  const category = article.categories?.[0]?.name

  const related = (article.related_from ?? []).slice(0, 3)

  const posterUrl = article.poster?.url
  const posterSrc = posterUrl ? formatStrapiMediaUrl(posterUrl) : null

  return (
    <div className={cn("bg-background min-h-screen")}>
      <div className="relative h-[400px] w-full overflow-hidden">
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt={article.title || ""}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
        <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      <Container>
        <div className="px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Link
                href={{ pathname: "/blog" }}
                className="text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                <span>
                  {t("blog.back_to_blog", { default: "Back to blog" } as any)}
                </span>
              </Link>

              <div className="mb-8">
                {category ? (
                  <div className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1 text-sm">
                    {category}
                  </div>
                ) : null}
                <h1 className="text-foreground mb-4 text-4xl font-bold">
                  {article.title}
                </h1>
                <div className="text-muted-foreground flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    {authorAvatar ? (
                      <Image
                        src={authorAvatar}
                        alt={authorName ?? "Author"}
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span>{authorName ?? "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {date ? new Date(date).toLocaleDateString(locale) : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg text-foreground max-w-none">
                {/* Replace with a rich text renderer if needed */}
                <div
                  dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  {t("blog.related_articles", {
                    default: "Related articles",
                  } as any)}
                </h3>
                <div className="space-y-4">
                  {related.map((rel) => {
                    const relPoster = rel.poster?.url
                      ? formatStrapiMediaUrl(rel.poster.url)
                      : null
                    return (
                      <Link
                        key={rel.id}
                        href={{ pathname: "/blog/" + rel.slug }}
                        className="group border-border bg-card hover:shadow-medium block overflow-hidden rounded-lg border shadow-sm transition-all"
                      >
                        <div className="relative h-32 overflow-hidden">
                          {relPoster ? (
                            <Image
                              src={relPoster}
                              alt={rel.title || ""}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="bg-muted h-full w-full" />
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 font-semibold transition-colors">
                            {rel.title}
                          </h4>
                          {rel.description ? (
                            <p className="text-muted-foreground line-clamp-2 text-sm">
                              {rel.description}
                            </p>
                          ) : null}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
