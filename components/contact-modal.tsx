"use client";

/**
 * Next dependencies
 */
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function Modal() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const usesModal = searchParams.get( 'modal' );

    return (
        <>
            {
                usesModal && (
                    <dialog
                        className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                        <div className="bg-white m-auto p-8">
                            <div className="flex flex-col items-center">
                                <h3>Modal content</h3>
                                <br/>

                                <Link href={ pathname }>
                                    <button type="button" className="bg-red-500 text-white p-2 ">Close Modal</button>
                                </Link>
                            </div>

                        </div>
                    </dialog>
                )
            }
        </>
    );
}
