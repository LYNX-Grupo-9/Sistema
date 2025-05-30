import { Ban, Pen } from 'lucide-react';

function EventDay({ legenda }) {
    return (
        <>
            <div className="bg-white rounded-xl p-3">
                <p className="text-md font-semibold text-[color:var(--color-blueDark)]">{legenda}</p>
            </div>
        </>
    )
}

function NextEvent({nomeEvento, horaEvento, localEvento}) {
    return (
        <>
            <div className="px-5 py-3 bg-[color:var(--bgLightGray)] rounded-xl flex h-fit gap-5 items-center">
                <div>
                    <p className="text-md font-semibold text-[color:var(--color-blueLight)]">{horaEvento}</p>
                </div>
                <div className="min-h-7 w-1 bg-[color:var(--color-blueLight)] rounded-full"></div>
                <div className='flex flex-1 flex-col gap-0'>
                    <span className='font-semibold text-[color:var(--color-grayLight)]'>{nomeEvento}</span>
                    <span className='text-[color:var(--color-grayLight)]'>{localEvento}</span>
                </div>
                <div className='flex gap-2'>
                    <button className='cursor-pointer'>
                        <Pen width={20} color='#3C6A89' />
                    </button>
                    <button className='cursor-pointer'>
                        <Ban width={20} color="#3C6A89" />
                    </button>
                </div>
            </div>
        </>
    )
}

export {NextEvent, EventDay};