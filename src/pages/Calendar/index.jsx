
import { EventDay, NextEvent } from '../../components/NextEvent';

export default function Calendar() {
    return (
        <>
            <div className="flex h-full w-full">
                <div className="w-2/7 bg-[color:var(--bg-light)] h-full">
                    <div className="h-1/2 px-10 pt-10">
                        <span className="typography-black text-[var(--color-blueDark)] text-3xl ">Próximos eventos</span>
                        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll max-h-3/4 scrollbar-thin-gray pr-4"  >
                            <EventDay legenda={"Dia 11, Terça-Feira - Hoje"}/>
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                        </div>
                    </div>
                    <div className="w-full h-0.5 bg-[color:#d9d9d9]"></div>
                    <div className="h-1/2">

                    </div>
                </div>
            </div>
        </>
    );
}