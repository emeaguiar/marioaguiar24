/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

/**
 * Next dependencies
 */
import Head from "next/head";

/**
 * Internal dependencies
 */
import {
  H2,
  WithUnderline,
} from "@/components/elements";
import { merriweather } from "@/components/fonts";
import BlogCards from "@/components/blog/cards";
import ProjectCards from "@/components/projects/cards";
import ServicesCard from "@/components/services/card";
import TestimonialsCard from "@/components/testimonials/card";

export default function Home() {
  const { t } = useTranslation( 'home' );

  return (
    <>
      <Head>
        <title>
          { t( 'title' ) }
        </title>
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

      <div className="bg-primary flex items-center justify-center px-4 py-8 text-background w-full lg:py-20">
        <p className="font-bold max-w-screen-md text-center text-xl lg:text-2xl">
          { t( 'strip' ) }
        </p>
      </div>

      <div className="flex flex-col gap-10 items-center px-4 lg:max-w-screen-xl">
        <H2>
          { t( 'blogTitle' ) }
        </H2>

        <BlogCards />
      </div>

      <div className="flex flex-col gap-8 items-center w-full lg:max-w-screen-xl">
        <H2 id="projects">
          Proyectos
        </H2>

        <ProjectCards />
      </div>

      <div className=" flex items-center w-full lg:max-w-screen-xl lg:px-4">
        <div className="bg-primary flex flex-col gap-8 px-4 py-8 w-full lg:flex-row lg:items-center lg:justify-between lg:rounded-2xl lg:p-12">
          <div className="flex flex-col gap-4 items-center max-w-screen-md lg:items-start">
            <H2 className="text-white">
              { t( 'ctaTitle' ) }
            </H2>

            <p className="text-white text-center">
              { t( 'cta' ) }
            </p>
          </div>

          <button className="bg-background font-bold px-4 py-2 rounded-lg text-primary uppercase">
            { t( 'common:contactCta' ) }
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-10 items-center max-w-screen-md lg:gap-20">
        <H2 id="testimonials">
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
