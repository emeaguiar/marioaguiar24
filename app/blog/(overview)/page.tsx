/**
 * Internal dependencies
 */
import { H2 } from "@/app/ui/elements";
import BlogCards from "@/app/ui/blog/cards";

export default function Page() {
    return (
        <div className="flex flex-col gap-10 items-center px-4 lg:max-w-screen-xl">
            <H2>
                Blog
            </H2>

            <p className="text-center lg:max-w-screen-md">
                Una de mis grandes pasiones es escribir y compartir conocimiento, aquí encontrarás algunos de mis artículos más recientes. Mayormente sobre desarrollo web, pero también sobre otros temas que me interesan.
            </p>

            <H2>
                Lo más reciente…
            </H2>

            <BlogCards />

            <H2>
                Lo más interesante…
            </H2>

            <BlogCards />
        </div>
    );
}
