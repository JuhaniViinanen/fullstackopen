import { useEffect } from "react"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useSelector, useDispatch } from "react-redux"
import anecdoteService from "./services/anecdotes"
import { setAnocedotes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(setAnocedotes(anecdotes)))
  }, [])
  const notification = useSelector(state => state.notification)

  return (
    <div>
      {notification && <Notification />}
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default App
