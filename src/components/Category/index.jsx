import { Ban, Pen } from "lucide-react";


export function Category({ nomeCategoria, corCategoria, editarCategoria, excluirCategoria }) {
    return (
        <div className='flex items-center gap-2.5'>
            <div style={{ backgroundColor: corCategoria, width: '12px', height: '12px', borderRadius: '100%' }}></div>
            <p className='text-2xl font-semibold text-[color:var(--color-grayLight)]'>{nomeCategoria}</p>
            <div className='flex flex-1 justify-end gap-2'>
                <button className='cursor-pointer'>
                    <Pen width={20} color='#3C6A89' onClick={editarCategoria}/>
                </button>
                <button className='cursor-pointer'>
                    <Ban width={20} color="#3C6A89" onClick={excluirCategoria}/>
                </button>
            </div>
        </div>
    )
}