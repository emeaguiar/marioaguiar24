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
import { merriweather } from "@/app/ui/fonts";
import Card from "@/app/ui/card/card";
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
        <Card title="Desarrollo de Frontend" type="mobile">
          <p className="text-center">
            Sitios responsivos con las últimas tecnologías y la mejor experiencia del usuario
          </p>
        </Card>

        <Card title="Performance y Accesibilidad" type="performance">
          <p className="text-center">
            Sitios rápidos, inclusivos, y fáciles de encontrar
          </p>
        </Card>

        <Card title="WordPress" type="wordpress">
          <p className="text-center">
            Temas, plugins, optimización a nivel avanzado
          </p>
        </Card>
      </div>
    </main>
  );
}
