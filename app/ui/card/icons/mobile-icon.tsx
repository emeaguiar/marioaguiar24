import { v7 as uuidV7 } from 'uuid';

const id = uuidV7();

export default function MobileIcon() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="69" height="138" fill="none">
            <rect width="65" height="134.93" x="2" y="1.5" fill="#fff" stroke="#000" stroke-width="3" rx="9.5"/>
            <g clip-path={`url(#${ id })`}>
                <rect width="57.674" height="127.605" x="5.663" y="5.163" fill="#F49CBB" rx="8"/>
                <path fill="#FAFAFA" d="M14.663 5.163h39a7 7 0 0 1-7 7h-25a7 7 0 0 1-7-7Z"/>
            </g>
            <defs>
                <clipPath id={ id }>
                    <rect width="57.674" height="127.605" x="5.663" y="5.163" fill="#fff" rx="8"/>
                </clipPath>
            </defs>
        </svg>
    );
}
