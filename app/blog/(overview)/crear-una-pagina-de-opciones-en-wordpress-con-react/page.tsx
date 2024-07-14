/**
 * Internal dependencies
 */
import { H2 } from "@/app/ui/elements";

export const metadata = {
    title: "Crear una página de opciones en WordPress con React – Parte 1",
};

export default function Page() {
    return (
        <div className="flex flex-col gap-10 items-center px-4 lg:max-w-screen-xl">
            <H2>
                Crear una página de opciones en WordPress con React – Parte 1
            </H2>

            <p className="lg:max-w-screen-md">
                A pesar de los avances en <em>Gutenberg</em> que hemos visto los últimos años, con la idea de que las opciones de un post (o una página) deben ser manejadas <strong>dentro del propio editor de WordPress</strong> (a.k.a Gutenberg). Muchas veces aún nos vemos en la necesidad de tener una página en donde podamos manejar todas nuestras opciones globales, fuera de cada post en específico. A continuación mostraré como crear una página de opciones en WordPress con React.
            </p>
        </div>
    )
}
