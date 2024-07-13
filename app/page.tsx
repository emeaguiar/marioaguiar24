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
import Logo from "@/app/ui/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex justify-between w-full p-4">
        <Link href="/">
          <Logo />
        </Link>

        <button className="md:hidden">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
    </main>
  );
}
