
const Personitem = ({ name, number, id , handleDelete}) => {
    return (
        <li>
            {`${name} ${number}`}
            <button onClick={() => handleDelete(id)}>delete</button>
        </li>
    )
}

export default Personitem
