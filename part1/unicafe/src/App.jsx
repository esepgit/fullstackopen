import { useState } from 'react'

//Component Title
const Title = (props) => <h1>{props.text}</h1>;

//Component Total
const Total = (props) => <p>{props.text} {props.value}</p>  

//Component Statistics
const Statistics = (props) => {
  return (
    <div>
        <Title text={"statistics"} />
        <Total text={"good"} value={props.good} />
        <Total text={"neutral"} value={props.neutral} />
        <Total text={"bad"} value={props.bad} />
        <Total text={"all"} value={props.good + props.neutral + props.bad} />
        <Total text={"average"} value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
        <Total text={"positive"} value={props.good / (props.good + props.neutral + props.bad) + "%"} />
    </div>
  )
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
        <Title text={"give feedback"} />
        <button onClick={addGood}>good</button>
        <button onClick={addNeutral}>neutral</button>
        <button onClick={addBad}>bad</button>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}

export default App
