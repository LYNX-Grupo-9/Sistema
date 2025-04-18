import { useState } from "react";

export function IconCalendar(props) {
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
            <svg width="38" height="33" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.625 6.125H4.375C3.47754 6.125 2.75 6.85254 2.75 7.75V28.875C2.75 29.7725 3.47754 30.5 4.375 30.5H33.625C34.5225 30.5 35.25 29.7725 35.25 28.875V7.75C35.25 6.85254 34.5225 6.125 33.625 6.125Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.875 2.875V9.375M19.8125 16.6875H10.875M27.125 23.1875H10.875M27.125 2.875V9.375" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
            </svg>

        </div>
    );
} 