
const Personform = ({
    submitHandler,
    nameValue,
    nameChangeHandler,
    numberValue, 
    numberChangeHandler}) => {
    return (
        <form onSubmit={submitHandler} >
            <div>
                <label>name:</label><input value={nameValue} onChange={nameChangeHandler} />
            </div>
            <div>
                <label>number:</label><input value={numberValue} onChange={numberChangeHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Personform
