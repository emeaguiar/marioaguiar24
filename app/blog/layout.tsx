/**
 * Internal dependencies
 */
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";

export default function Layout( {
    children,
}: {
    children: React.ReactNode;
} ) {
    return (
        <main className="flex min-h-screen flex-col gap-6 items-center lg:gap-20">
            <Header />

            { children }

            <Footer />
        </main>
    );
}
