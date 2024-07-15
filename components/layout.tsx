/**
 * Internal dependencies
 */
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Layout( {
    children
}: { children: React.ReactNode } ) {
    return (
        <div className="flex flex-col gap-6 lg:gap-20">
            <Header />

            <main className="flex min-h-screen flex-col gap-6 items-center lg:gap-20">
                { children }
            </main>

            <Footer />
        </div>

    );
}
