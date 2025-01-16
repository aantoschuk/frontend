import { useEffect, useState, useMemo } from "react";

import "./App.css";

const data = [
  {
    name: "John Doe",
    age: 30,
    city: "New York",
  },
  {
    name: "Jane Smith",
    age: 25,
    city: "Los Angeles",
  },
  {
    name: "Michael Johnson",
    age: 35,
    city: "Chicago",
  },
  ,
];

function App() {
  const [state, setState] = useState<typeof data>([]);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  // create worker
  const worker = useMemo(
    () => new Worker(new URL("./worker.js", import.meta.url)),
    [],
  );

  useEffect(() => {
    setState(data);
  }, []);

  // receive result from the worker
  useEffect(() => {
    if (window.Worker) {
      worker.onmessage = (event: MessageEvent<number>) => {
        setResult(event.data);
        setLoading(false);
      };
    }
  }, [state]);

  // on click send data to the worker
  const handleClick = () => {
    if (window.Worker) {
      setLoading(true);
      worker.postMessage(data);
    }
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {state.map((d: any) => (
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.age}</td>
                <td>{d.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>total age: {result}</h1>
        <button onClick={handleClick} disabled={loading}>
          {loading ? "loading" : "Calculate total age"}
        </button>
      </div>
    </>
  );
}

export default App;
