/**
 * Internal dependencies
 */
import { merriweather } from "@/app/ui/fonts";
import MobileIcon from "@/app/ui/services/icons/mobile-icon";
import PerformanceIcon from "@/app/ui/services/icons/performance-icon";
import WordPressIcon from "@/app/ui/services/icons/wordpress-icon";

const icons = {
    mobile: <MobileIcon />,
    performance: <PerformanceIcon />,
    wordpress: <WordPressIcon />,
};

export default function Card( {
    children,
    title,
    type,
}: {
    children: React.ReactNode;
    title: string;
    type: "mobile" | "performance" | "wordpress";
} ) {
    const IconComponent = () => (
        <div className="mb-4">
            { icons[ type ] }
        </div>
    );
    
    return (
        <div className={ `${ merriweather.className } flex flex-col gap-4 mb-8 items-center`}>
            <IconComponent />
    
            <h2 className="font-bold">
                { title }
            </h2>
    
            <div className="w-3/4 px-4">
                { children }
            </div>
        </div>
    );
}