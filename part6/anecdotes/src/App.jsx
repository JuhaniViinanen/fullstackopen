import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useSelector } from "react-redux"

const App = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)
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
