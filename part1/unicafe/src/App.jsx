import { useState } from 'react'

const Title = (props) => <h1>{props.text}</h1>;

const Total = (props) => <p>{props.text} {props.value}</p>  

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
        <Title text={"statistics"} />
        <Total text={"good"} value={good} />
        <Total text={"neutral"} value={neutral} />
        <Total text={"bad"} value={bad} />
        <Total text={"all"} value={good + neutral + bad} />
        <Total text={"average"} value={(good - bad) / (good + neutral + bad)} />
        <Total text={"positive"} value={good / (good + neutral + bad) + "%"} />
      </div>
  )
}

export default App
