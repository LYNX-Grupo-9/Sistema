export function InputDuplo (props) {
    return (
        <div className="inputDuplo">
            <div className="containerLabel">          
                <span>
                    {props.label}
                </span>
                <span>
                    {props.label2}
                </span>
            </div>
            <div className="containerInput">
                <input type={props.type} placeholder={props.placeholder}/>
                <input type={props.type2} placeholder={props.placeholder2}/>  
            </div>
        </div>
    )
}