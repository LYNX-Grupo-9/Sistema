import { useState } from "react";

export function IconDocs(props) {
    const [hovered, setHovered] = useState(false);


    return (
        <div {...props}         
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
            color: hovered ? props.hovercolor : props.actualcolor,
            transition: 'color 0.3s',
            cursor: 'pointer',
            display: 'inline-block'
        }}>
            <svg width="32" height="46" viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.125 2.6875H1.9375V43.3125H30.0625V13.625M19.125 2.6875L30.0625 13.625M19.125 2.6875V13.625H30.0625M6.625 23H25.375M6.625 13.625H14.4375M6.625 32.375H25.375" stroke="currentColor" stroke-width="3.75" stroke-linejoin="round" />
            </svg>

        </div>
    );
} 