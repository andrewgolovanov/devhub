import Head from "@docusaurus/Head";
import { useHistory, useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CtaFooter } from "@/components/blog/listing/cta-footer";
import { FeaturedPost } from "@/components/blog/listing/featured-post";
import { Hero } from "@/components/blog/listing/hero";
import { PostsSection } from "@/components/blog/listing/posts-section";
import {
  buildBlogPaginationTestPosts,
  buildBlogPosts,
  BLOG_POSTS_SCROLL_STORAGE_KEY,
  BLOG_POSTS_SECTION_ID,
  filterBlogPosts,
  getBlogPageFromPathname,
  getBlogPagePath,
  getBlogCategories,
  getFeaturedBlogPost,
  paginateBlogPosts,
} from "@/lib/blog/blog-posts";
import { BLOG_RSS_PATH, getBlogRssUrl } from "@/lib/blog/rss-feed";
import { siteUrlFromConfig } from "@/lib/site-url";

export default function BlogPage(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const page = getBlogPageFromPathname(pathname);
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const rssHref = useBaseUrl(BLOG_RSS_PATH);
  const rssUrl = getBlogRssUrl(siteUrl);

  const allPosts = useMemo(() => {
    const posts = buildBlogPosts();
    if (process.env.NODE_ENV !== "development") return posts;

    return [...posts, ...buildBlogPaginationTestPosts()].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    );
  }, []);
  const featuredPost = getFeaturedBlogPost(allPosts);
  const categories = useMemo(() => getBlogCategories(allPosts), [allPosts]);

  const listPosts = useMemo(
    () =>
      featuredPost
        ? allPosts.filter((post) => post.id !== featuredPost.id)
        : allPosts,
    [allPosts, featuredPost],
  );

  const categoryPosts = useMemo(
    () =>
      filterBlogPosts(listPosts, {
        category: selectedCategory,
        searchQuery: "",
      }),
    [listPosts, selectedCategory],
  );

  const pagination = useMemo(
    () => paginateBlogPosts(categoryPosts, page),
    [categoryPosts, page],
  );

  useEffect(() => {
    if (page !== pagination.currentPage) {
      history.replace(getBlogPagePath(pagination.currentPage));
    }
  }, [history, page, pagination.currentPage]);

  useEffect(() => {
    if (
      window.sessionStorage.getItem(BLOG_POSTS_SCROLL_STORAGE_KEY) !== "true"
    ) {
      return;
    }

    window.sessionStorage.removeItem(BLOG_POSTS_SCROLL_STORAGE_KEY);
    document.getElementById(BLOG_POSTS_SECTION_ID)?.scrollIntoView({
      block: "start",
    });
  }, [pathname]);

  function handleSelectCategory(category: string | null): void {
    setSelectedCategory(category);
    if (page !== 1) {
      window.sessionStorage.setItem(BLOG_POSTS_SCROLL_STORAGE_KEY, "true");
      history.push(getBlogPagePath(1));
    }
  }

  return (
    <Layout
      title="Blog"
      description="Developer-first guides for building on Databricks."
      noFooter
    >
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Databricks Developer Blog RSS Feed"
          href={rssUrl}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Databricks Developer Blog",
            url: `${siteUrl}/blog`,
            description: "Developer-first guides for building on Databricks.",
          })}
        </script>
      </Head>

      <main className="border-t border-white/10 bg-[#040406] text-white">
        <div className="container px-5 py-16 md:px-8 md:pt-20 md:pb-24 lg:pt-24 xl:px-4 xl:pt-28 2xl:px-0">
          <div className="mx-auto max-w-384">
            <Hero />
            {featuredPost ? <FeaturedPost post={featuredPost} /> : null}
            <PostsSection
              allPosts={allPosts}
              categories={categories}
              selectedCategory={selectedCategory}
              pagination={pagination}
              rssHref={rssHref}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        </div>
        <CtaFooter />
      </main>
    </Layout>
  );
}
