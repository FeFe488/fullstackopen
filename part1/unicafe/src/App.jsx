

import { useState } from 'react'

const Button= (props) => (
  <button onClick={props.click}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad

  if (all == 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const average= (props.good * 1 + props.neutral * 0 + props.bad * -1)/ all
  const positive= (props.good /all) * 100

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + " %"} />
    </div>
  )
}

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const ClickGood = () => setGood(good+ 1)
  const ClickNeutral = () => setNeutral(neutral+ 1)
  const ClickBad= () => setBad(bad+ 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={ClickGood} text="good" />
      <Button click={ClickNeutral} text="neutral" />
      <Button click={ClickBad} text="bad" />
      
      <Statistics good={good} neutral= {neutral} bad= {bad} />
    </div>
  )
}

export default App