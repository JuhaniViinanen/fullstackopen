const SuccessMessage = ({ message }) => {
    if (!message) return null
    return (<div className="successMessage">{message}</div>)
}

export default SuccessMessage
