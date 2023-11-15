import { useSelector, useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const handleChange = e => dispatch(changeFilter(e.target.value))

    const style = {
        margin: "5 auto"
    }

    return (
        <div style={style}>
            <label htmlFor="filter">filter:</label>
            <input id="filter" value={filter} onChange={handleChange} />
        </div>
    )
}

export default Filter
