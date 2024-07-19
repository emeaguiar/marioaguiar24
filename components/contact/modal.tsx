"use client";

/**
 * External dependencies
 */
import useTranslation from "next-translate/useTranslation";
import { XMarkIcon } from "@heroicons/react/24/solid";

/**
 * Next dependencies
 */
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Internal dependencies
 */
import {
    H2,
    P,
} from "@/components/elements";
import SocialLinks from "@/components/social/social-links";
import ContactForm from "@/components/contact/form";

export default function Modal() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const usesModal = searchParams.get( 'modal' );
    const { t } = useTranslation( 'common' );

    return (
        <>
            {
                usesModal && (
                    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                        <div className="bg-primary text-background m-auto h-full p-8 lg:rounded-xl lg:h-auto">
                            <Link aria-label={ t( 'close' ) } href={ pathname } className="flex h-6 w-6 mr-0 ml-auto">
                                <XMarkIcon className="w-6 h-6" />
                            </Link>

                            <div className="flex flex-col items-center h-full">
                                <H2 className="mb-4">{ t( 'contactModalTitle' ) }</H2>

                                <P>
                                    { t( 'contactModalMessage' ) }
                                </P>

                                <ContactForm />

                                <SocialLinks className="mb-0 mt-auto lg:mt-8" />
                            </div>

                        </div>
                    </dialog>
                )
            }
        </>
    );
}
