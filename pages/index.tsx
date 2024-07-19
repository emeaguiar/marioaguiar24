/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import clsx from 'clsx';

/**
 * Next dependencies
 */
import Head from "next/head";
import Link from 'next/link';

/**
 * Internal dependencies
 */
import {
  H2,
  WithUnderline,
} from "@/components/elements";
import { merriweather } from "@/components/fonts";
import BlogCards from "@/components/blog/cards";
import ServicesCard from "@/components/services/card";
import TestimonialsCard from "@/components/testimonials/card";
import { getPosts } from "@/lib/posts";

export default function Home( {
  posts,
}: {
  posts: {
    [ key: string ]: any;
  };
} ) {
  const { t } = useTranslation( 'home' );

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <div className={`${merriweather.className} flex flex-col gap-4 items-center lg:gap-8`}>
        <h1 className="font-bold text-2xl text-center lg:text-5xl">
          <Trans
            i18nKey="home:headline"
            components={ [
              <br className="lg:hidden" key="frontend" />,
            ] }
          />
        </h1>

        <p className="text-lg text-center lg:text-3xl">
          <Trans
            i18nKey="home:hello"
            components={ [
              <strong key="name" />,
              <WithUnderline key="underline" />,
            ] }
          />
        </p>

        <p className="text-center">
          <span className="text-base lg:mt-6 lg:text-2xl">
            <Trans
              i18nKey="home:subtitle"
              components={ [
                <br key="break" />,
              ] }
            />
          </span>
        </p>
      </div>

      <div className="grid gap-4 items-center lg:items-start lg:grid-cols-3 lg:max-w-screen-xl">
        <ServicesCard title={ t( 'responsiveSitesTitle' ) } type="mobile">
          <p className="text-center">
            { t( 'responsiveSites' ) }
          </p>
        </ServicesCard>

        <ServicesCard title={ t( 'performanceTitle' ) } type="performance">
          <p className="text-center">
            { t( 'performance' ) }
          </p>
        </ServicesCard>

        <ServicesCard title="WordPress" type="wordpress">
          <p className="text-center">
            { t( 'wordpress' ) }
          </p>
        </ServicesCard>
      </div>

      <div className="bg-primary flex items-center justify-center px-4 py-8 text-background w-full lg:py-20 dark:bg-slate-800">
        <p className="font-bold max-w-screen-md text-center text-xl lg:text-2xl dark:text-foreground">
          { t( 'strip' ) }
        </p>
      </div>

      <div className="flex flex-col gap-10 items-center px-4 w-full lg:max-w-screen-xl">
        <H2 className="text-center">
          { t( 'blogTitle' ) }
        </H2>

        <BlogCards posts={ posts } />
      </div>

      <div className=" flex items-center w-full lg:max-w-screen-xl lg:px-4">
        <div className="bg-primary dark:bg-slate-800 flex flex-col gap-8 px-4 py-8 w-full lg:flex-row lg:items-center lg:justify-between lg:rounded-2xl lg:p-12">
          <div className="flex flex-col gap-4 items-center max-w-screen-md lg:items-start">
            <H2 className="text-center text-white lg:text-start">
              { t( 'ctaTitle' ) }
            </H2>

            <p className="text-white text-center">
              { t( 'cta' ) }  
            </p>
          </div>

          <Link href="/?modal=1" className={
            clsx(
              "flex items-center border border-red-700 bg-background font-bold px-4 py-2 rounded-lg text-primary uppercase transition-colors",
              "hover:bg-red-50",
              "disabled:cursor-not-allowed disabled:bg-red-50 disabled:text-gray-500 disabled:border-gray-900",
              "dark:border-slate-900 dark:hover:bg-slate-900 dark:text-white"
          )
          }>
            { t( 'common:contactCta' ) }
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-10 items-center max-w-screen-md lg:gap-20">
        <H2 id="testimonials" className="text-center">
          { t( 'whyMe' ) }
        </H2>

        <TestimonialsCard />
      </div>

      <div className="flex">
        <p className={ `${ merriweather.className } italic my-8 text-sm/5 text-center` }>
          <Trans
            i18nKey="home:improve"
            components={ [
              <br key="break" />,
            ] }
          />
        </p>
      </div>
    </>
  );
}

export async function getStaticProps( { locale }: {
  locale: "es" | "en";
} ) {
  const posts = getPosts( locale, 3 );

  return {
    props: {
      posts,
    },
  };
}
