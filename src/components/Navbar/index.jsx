import TemisLogo from '../../assets/temis-logo.png';
import { IconHome } from '../IconHome';
import { IconProfile } from '../IconProfile';
import {IconDocs} from '../IconDocs';
import {IconCalendar} from '../IconCalendar';
import {IconAi} from '../IconAi';

export function Navbar(props) {

    return (    
        <>
            <div className="w-full h-full flex">
                <aside className="w-36 h-screen bg-gradient-to-b from-[var(--color-blueDark)] to-[var(--color-blueLight)] 
                rounded-r-4xl shadow-[0px_0px_20px_rgba(0,0,0,0.40)]
                flex flex-col items-center py-8 gap-16
                ">
                    <img src={TemisLogo} alt="" className='w-2/3 cursor-pointer' />

                    <div className='flex flex-col items-center gap-10'>
                        <IconHome actualcolor="#87939E" hovercolor="#fff" />
                        <IconProfile actualcolor="#87939E" hovercolor="#fff"/>
                        <IconDocs actualcolor="#87939E" hovercolor="#fff"/>
                        <IconCalendar actualcolor="#87939E" hovercolor="#fff"/>
                        <IconAi actualcolor="#87939E" hovercolor="#fff"/>
                    </div>

                </aside>
                <div>
                    {props.children}
                </div>
            </div>
        </>
    )
}