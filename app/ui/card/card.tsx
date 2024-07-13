/**
 * Internal dependencies
 */
import MobileIcon from "@/app/ui/card/icons/mobile-icon";
import PerformanceIcon from "@/app/ui/card/icons/performance-icon";
import WordPressIcon from "@/app/ui/card/icons/wordpress-icon";

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
        <div className="mb-10">
            { icons[ type ] }
        </div>
    );
    
    return (
        <div className="flex flex-col gap-4 items-center">
            <IconComponent />
    
            <h2 className="font-bold text-2xl">
                { title }
            </h2>
    
            <div className="w-3/4 ppx-4">
                { children }
            </div>
        </div>
    );
}