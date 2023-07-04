const SearchField = ({value, handleChange}) => {
    return (
        <div>
            find countries <input value={value} onChange={handleChange} />
        </div>
    )
}

export default SearchField
