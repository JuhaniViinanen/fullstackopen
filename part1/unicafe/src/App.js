import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (0 === all) return <div>No feedback given</div>

  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title={"Give feedback"}/>
      <Button handleClick={() => setGood(good + 1)} text={"good"}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button handleClick={() => setBad(bad + 1)} text={"bad"}/>
      <Header title={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
