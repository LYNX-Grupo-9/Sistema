import icon from '../../assets/icons/attachment.svg';
export function AttachmentButton(){
    return (
        <button className="h-[90px] text-[var(--bgLight)] px-4 py-2 rounded-[10px] cursor-pointer text-[28px] typography-semibold flex items-center justify-center gap-2 " style={{
            background: 'var(--gradientHorizontal)',
        }}>
            Ver anexos
            <img src={icon} alt="Attachment Icon" className="w-[50px]  ml-2 inline-block" />
        </button>
    );
}