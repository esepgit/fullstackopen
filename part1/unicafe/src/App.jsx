import { useState } from 'react'

//Component Button
const Button = (props) => <button onClick={props.click}>{props.text}</button>

//Component StatisticLine
const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </> 
  )
}  

//Component Statistics
const Statistics = (props) => {
  if(props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>  
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={props.good} />
            <StatisticLine text={"neutral"} value={props.neutral} />
            <StatisticLine text={"bad"} value={props.bad} />
            <StatisticLine text={"all"} value={props.good + props.neutral + props.bad} />
            <StatisticLine text={"average"} value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
            <StatisticLine text={"positive"} value={(props.good * 100) / (props.good + props.neutral + props.bad) + "%"} />
          </tbody>
        </table>
          
      </div>
    )
  } 
}

//Component App
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
      <div>
        <h1>give feedback</h1>
        <Button click={addGood} text={"good"} />
        <Button click={addNeutral} text={"neutral"} />
        <Button click={addBad} text={"bad"} />
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}

export default App
