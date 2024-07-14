/**
 * External dependencies
 */
import { Bars3Icon } from "@heroicons/react/16/solid";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import {
  H2,
  WithUnderline,
} from "@/app/ui/elements";
import { merriweather } from "@/app/ui/fonts";
import BlogCards from "@/app/ui/blog/cards";
import Logo from "@/app/ui/logo";
import Navigation from "@/app/ui/navigation";
import ProjectCards from "@/app/ui/projects/cards";
import ServicesCard from "@/app/ui/services/card";
import SocialLinks from "@/app/ui/social/social-links";
import TestimonialsCard from "@/app/ui/testimonials/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center lg:gap-20">
      <div className="flex justify-between w-full p-4 max-w-screen-xl">
        <Link href="/">
          <Logo />
        </Link>

        <button className="lg:hidden">  
          <Bars3Icon className="h-6 w-6" />
        </button>

        <Navigation />
      </div>

      <div className={`${merriweather.className} flex flex-col gap-4 items-center lg:gap-8`}>
        <h1 className="font-bold text-2xl text-center lg:text-5xl">
          Desarrollo de <br className="lg:hidden" />Frontend
        </h1>

        <p className="text-lg text-center lg:text-3xl">
          ¡Hola! Soy <strong>
            <WithUnderline>Mario</WithUnderline>
          </strong>.
        </p>

        <p className="text-center">
          <span className="text-base lg:mt-6 lg:text-2xl">
            Desarrollador Frontend <br />
            por más de 10 años
          </span>
        </p>
      </div>

      <div className="grid gap-4 items-center lg:items-start lg:grid-cols-3 lg:max-w-screen-xl">
        <ServicesCard title="Desarrollo de Frontend" type="mobile">
          <p className="text-center">
            Sitios responsivos con las últimas tecnologías y la mejor experiencia del usuario
          </p>
        </ServicesCard>

        <ServicesCard title="Performance y Accesibilidad" type="performance">
          <p className="text-center">
            Sitios rápidos, inclusivos, y fáciles de encontrar
          </p>
        </ServicesCard>

        <ServicesCard title="WordPress" type="wordpress">
          <p className="text-center">
            Temas, plugins, optimización a nivel avanzado
          </p>
        </ServicesCard>
      </div>

      <div className="bg-primary flex items-center justify-center px-4 py-8 text-background w-full lg:py-20">
        <p className="font-bold max-w-screen-md text-center text-xl lg:text-2xl">
          Desde hace 10 años que comencé mi viaje, he hecho trabajos freelance, de agencia, consultoría, pláticas, y he colaborado con personas talentosas para crear sitios web en todo tipo de ramos.
        </p>
      </div>

      <div className="flex flex-col gap-10 items-center px-4 lg:max-w-screen-xl">
        <H2>
          Del Blog…
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
              ¿Convencido?
            </H2>

            <p className="text-white text-center">
              ¡Trabajemos juntos! Enviáme un mensaje de correo y descubramos como podemos colaborar
            </p>
          </div>

          <button className="bg-background font-bold px-4 py-2 rounded-lg text-primary uppercase">
            Contact
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-10 items-center max-w-screen-md lg:gap-20">
        <H2 id="testimonials">
          ¿Por qué trabajar conmigo?
        </H2>

        <TestimonialsCard />
      </div>

      <div className="flex">
        <p className={ `${ merriweather.className } font-bold my-8 text-2xl text-center` }>
          Siempre mejoro,<br />
          mejorando la web.
        </p>
      </div>

      <footer className="bg-primary flex flex-col gap-10 items-center p-8 w-full lg:gap-20">
        <SocialLinks />

        <Link href="/">
          <Logo inverted={ true } />
        </Link>
      </footer>
    </main>
  );
}
