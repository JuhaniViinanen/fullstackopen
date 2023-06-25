import Personitem from "./Personitem"

const Personslist = ({ persons }) => {
    return (
        <ul>
            {persons.map( person => <Personitem key={person.id} name={person.name} number={person.number} /> )}
        </ul>
    )
}

export default Personslist
