
const Personform = ({
    submitHandler,
    nameValue,
    nameChangeHandler,
    numberValue, 
    numberChangeHandler}) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={nameValue} onChange={nameChangeHandler} />
                number: <input value={numberValue} onChange={numberChangeHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Personform
