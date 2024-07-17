/**
 * External depenencies
 */
import { Children } from "react";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";

export default function Alert( { children, type }: {
    children: React.ReactNode;
    type: 'note' | 'tip' | 'important' | 'warning' | 'caution';
} ) {
    const { t } = useTranslation( 'common' );

    return (
        <div
            className={ clsx(
                'p-4 my-4 border-l-4 rounded-lg -mx-8',
                {
                    'border-blue-400 bg-blue-50': type === 'note',
                    'border-green-400 bg-green-50': type === 'tip',
                    'border-yellow-400 bg-yellow-50': type === 'important',
                    'border-red-400 bg-red-50': type === 'warning',
                    'border-purple-400 bg-purple-50': type === 'caution',
                }
            ) }
        >
            {
                Children.map( children, ( child, index ) => {
                    if ( 0 === index ) {
                        // @TODO: Add translations for alert titles
                        return (
                            <div className="alert-title">
                                { child }
                            </div>
                        );
                    }

                    return (
                        <div className="alert-content text-base">
                            { child }
                        </div>
                    );
                } )
            }
        </div>
    );
}
