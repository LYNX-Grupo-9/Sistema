export function PossuiConta(props) {
    return (
        <div className="possuiConta">
            <span>{props.label}</span> <a href={props.link}>{props.linkLabel}</a>
        </div>
    );
}