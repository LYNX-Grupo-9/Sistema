export function Inputs (props) {
    return (
        <div className="inputContainer">
            <span>
                {props.label}
            </span>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>
    );
} 