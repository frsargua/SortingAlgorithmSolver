import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/navbar";
import Canvas from "./components/algorithmCanvas";

function App() {
  const [delayTime, setDelayTime] = useState(1000);
  const [numbers, setNumbers] = useState([9, 5, 1, 8, 3, 7, 4, 2, 6]);
  const [swapIndices, setSwapIndices] = useState([0, 1]);
  const [runAlgorithm, setRunAlgorithm] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelayTime(Number(event.target.value));
  };

  const startAlgorthm = () => {
    setRunAlgorithm(() => true);
  };

  function bibleSort(arr: number[]) {
    let sorted = false;
    let start = 0;
    let end = arr.length - 1;

    const stepDelay = delayTime;

    const performSorting = () => {
      let i = start;
      let passCompleted = false;

      const performIteration = async () => {
        function wait(timeout: any) {
          return new Promise((resolve) => {
            setTimeout(resolve, timeout);
          });
        }

        async function process() {
          setSwapIndices([i, i + 1]);
          await wait(delayTime / 2);
          if (arr[i] > arr[i + 1]) {
            console.log([i, i + 1]);
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            sorted = false;
          }
        }

        await process();
        i++;

        if (i >= end) {
          end--;
          i = start;
          passCompleted = true;
        }

        if (!passCompleted) {
          setTimeout(performIteration, stepDelay);
        } else {
          if (end > start) {
            passCompleted = false;
            setTimeout(performSorting, stepDelay);
          } else {
            console.log("done");
            setSwapIndices([0, 0]);
          }
        }
      };

      setTimeout(performIteration, stepDelay);
    };

    setTimeout(performSorting, stepDelay);

    return arr;
  }

  useEffect(() => {
    if (runAlgorithm) {
      console.log("reRun");
      bibleSort(numbers);
    }
  }, [runAlgorithm]);

  return (
    <>
      <NavigationBar />
      <h1 className="text-center my-2 font-weight-bold fo">Bubble sort</h1>
      <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
        <input
          type="range"
          className="form-range"
          style={{ width: "80%", borderRadius: "25px" }}
          min={100}
          max={2000}
          step={100}
          value={delayTime}
          onChange={handleChange}
        />
        <div className="text-center mt-2">
          <h4 className="font-weight-light text-primary">Value: {delayTime}</h4>
        </div>
        <button className="btn btn-primary mt-2" onClick={startAlgorthm}>
          Run
        </button>
        <div className="d-inline-block mt-4">
          <Canvas
            width={1000}
            height={400}
            numbers={numbers}
            swapIndices={swapIndices}
          />
        </div>
      </div>
    </>
  );
}

export default App;
