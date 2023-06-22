import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({ text, value}) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (0 === all) return <div>No feedback given</div>

  return (
    <div>
      <StatisticsLine text={"good"} value={good}/>
      <StatisticsLine text={"neutral"} value={neutral}/>
      <StatisticsLine text={"bad"} value={bad}/>
      <StatisticsLine text={"all"} value={all}/>
      <StatisticsLine text={"average"} value={average}/>
      <StatisticsLine text={"positive"} value={`${positive} %`}/>
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
