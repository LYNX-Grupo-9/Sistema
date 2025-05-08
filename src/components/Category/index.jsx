export function Category({ nomeCategoria, corCategoria, qtdEventos }) {

    const colorStyle = `w-2 h-2 rounded-full bg-[color:${corCategoria}]`;


    return (
        <div className='flex items-center gap-2.5'>
            <div style={{ backgroundColor: corCategoria, width: '12px', height: '12px', borderRadius: '100%' }}></div>
            <p className='text-2xl font-semibold text-[color:var(--color-grayLight)]'>{nomeCategoria}</p>
            <div className='flex flex-1 justify-end'>
                <span className='bg-[color:var(--bgLightGray)] px-5 py-1 rounded-full text-[var(--color-blueDark)] font-semibold text-xl'>{qtdEventos}</span>
            </div>
        </div>
    )
}