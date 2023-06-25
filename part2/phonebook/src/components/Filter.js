
const Filter = ({ text, value, eventHandler}) => {
    return (
        <div>
            {text} <input value={value} onChange={eventHandler}/>
        </div>
    )
}

export default Filter
