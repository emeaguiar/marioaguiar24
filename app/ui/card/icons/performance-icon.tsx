/**
 * External dependencies
 */
import { v7 as uuidV7 } from 'uuid';

const idA = uuidV7();
const idB = uuidV7();
const idC = uuidV7();

export default function PerformanceIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="234" height="135" fill="none">
            <g clip-path={`url(#${ idA })`}>
                <g clip-path={`url(#${ idB })`}>
                    <mask id={ idC } width="285" height="28" x="4.5" y="4.93" fill="#000" maskUnits="userSpaceOnUse">
                        <path fill="#fff" d="M4.5 4.93h285v28H4.5z"/>
                        <path d="M4.5 8.93a4 4 0 0 1 4-4h277a4 4 0 0 1 4 4v20H4.5v-20Z"/>
                    </mask>
                    <path fill="#F49CBB" d="M4.5 8.93a4 4 0 0 1 4-4h277a4 4 0 0 1 4 4v20H4.5v-20Z"/>
                    <rect width="12" height="12" x="12.5" y="10.93" fill="#EE695E" rx="6"/>
                    <rect width="12" height="12" x="32.5" y="10.93" fill="#F5BD4F" rx="6"/>
                    <rect width="12" height="12" x="52.5" y="10.93" fill="#61C454" rx="6"/>
                </g>
                <path fill="#000" d="M4.5 4.93h285-285Zm285 28H4.5v-8h285v8Zm-285-4v-24 24Zm285-24v24-24Z" mask={`url(#${ idC })`}/>
            </g>
            <rect width="229" height="130" x="2.5" y="2.93" stroke="#000" stroke-width="4" rx="6"/>
            <defs>
                <clipPath id={ idA }>
                    <rect width="225" height="126" x="4.5" y="4.93" fill="#fff" rx="4"/>
                </clipPath>
                <clipPath id={ idB }>
                    <path fill="#fff" d="M4.5 8.93a4 4 0 0 1 4-4h277a4 4 0 0 1 4 4v20H4.5v-20Z"/>
                </clipPath>
            </defs>
        </svg>
    );
}