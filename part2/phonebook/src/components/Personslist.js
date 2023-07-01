import Personitem from "./Personitem"

const Personslist = ({ persons , handleDelete}) => {
    return (
        <ul>
            {persons.map( person => 
              <Personitem 
                key={person.id}
                name={person.name}
                number={person.number}
                id={person.id}
                handleDelete={handleDelete}
              />
            )}
        </ul>
    )
}

export default Personslist
