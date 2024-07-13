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
import { H2 } from "@/app/ui/blog/elements";
import { merriweather } from "@/app/ui/fonts";
import BlogCards from "@/app/ui/blog/cards";
import ServicesCard from "@/app/ui/services/card";
import Logo from "@/app/ui/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center">
      <div className="flex justify-between w-full p-4">
        <Link href="/">
          <Logo />
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

      <div className="flex items-center bg-primary px-4 py-8 text-background text-center">
        <p className="font-bold text-xl">
          Desde hace 10 años que comencé mi viaje, he hecho trabajos freelance, de agencia, consultoría, pláticas, y he colaborado con personas talentosas para crear sitios web en todo tipo de ramos.
        </p>
      </div>

      <div className="flex flex-col gap-10 items-center px-4">
        <H2>
          Del Blog…
        </H2>

        <BlogCards />
      </div>

      <div className="flex flex-col gap-8">
        <H2>
          Projectos
        </H2>
      </div>
    </main>
  );
}
