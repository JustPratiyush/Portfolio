import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteors"

export const metadata = {
  title: "My Writings",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;



export default async function WritingsPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Meteors number={40} angle={-45} className="z-[-1]" />
      <section className="relative w-full min-h-[500px]">
        <div className="relative z-10 w-full">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-medium text-2xl mb-8 tracking-tighter">
            My Writings
          </h1>
        </BlurFade>
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="flex flex-col space-y-1 mb-4"
                href={`/writings/${post.slug}`}
              >
                <div className="w-full flex flex-col">
                  <p className="tracking-tight">{post.metadata.title}</p>
                  {post.metadata.summary && (
                    <p className="text-sm text-zinc-500 font-sans mt-0.5">
                      {post.metadata.summary}
                    </p>
                  )}
                  <p className="h-6 text-xs text-muted-foreground">
                    {post.metadata.publishedAt}
                  </p>
                </div>
              </Link>
            </BlurFade>
          ))}
      </div>
    </section>
    </>
  );
}
