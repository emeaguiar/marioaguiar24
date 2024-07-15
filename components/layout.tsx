/**
 * Internal dependencies
 */
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Layout( {
    children
}: { children: React.ReactNode } ) {
    return (
        <>
            <div className="flex flex-col items-center mb-6 lg:mb-20">
                <Header />
            </div>

            <main className="flex min-h-screen flex-col gap-6 items-center lg:gap-20">
                { children }
            </main>

            <Footer />
        </>
    );
}
