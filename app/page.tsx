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
import { H2 } from "@/app/ui/elements";
import { merriweather } from "@/app/ui/fonts";
import BlogCards from "@/app/ui/blog/cards";
import ProjectCards from "@/app/ui/projects/cards";
import ServicesCard from "@/app/ui/services/card";
import SocialLinks from "@/app/ui/social/social-links";
import TestimonialsCard from "@/app/ui/testimonials/card";
import Logo from "@/app/ui/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center">
      <div className="flex justify-between w-full p-4 max-w-screen-xl">
        <Link href="/">
          <Logo className="text-2xl" />
        </Link>

        <button className="md:hidden">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <div className={`${merriweather.className} flex flex-col gap-4 items-center`}>
        <h1 className="text-2xl text-center">
          Desarrollo de <br />Frontend
        </h1>

        <p className="text-center">
          ¡Hola! Soy <strong>Mario</strong>. <br />
          Desarrollador Frontend <br />
          por más de 10 años
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center">
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

      <div className="bg-primary flex items-center justify-center px-4 py-8 text-background w-full">
        <p className="font-bold max-w-screen-md text-center text-xl">
          Desde hace 10 años que comencé mi viaje, he hecho trabajos freelance, de agencia, consultoría, pláticas, y he colaborado con personas talentosas para crear sitios web en todo tipo de ramos.
        </p>
      </div>

      <div className="flex flex-col gap-10 items-center px-4">
        <H2>
          Del Blog…
        </H2>

        <BlogCards />
      </div>

      <div className="flex flex-col gap-8 items-center">
        <H2>
          Projectos
        </H2>

        <ProjectCards />
      </div>

      <div className="bg-primary flex flex-col gap-8 items-center px-4 py-8 w-full">
        <div className="flex flex-col gap-4 items-center max-w-screen-md">
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

      <div className="flex flex-col gap-10 items-center max-w-screen-md">
        <H2>
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

      <footer className="bg-primary flex flex-col gap-10 items-center p-8 w-full">
        <SocialLinks />

        <Logo className="text-3xl" inverted={ true } />
      </footer>
    </main>
  );
}
