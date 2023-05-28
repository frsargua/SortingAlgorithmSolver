import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/navbar";
import Canvas from "./components/algorithmCanvas";
import SpeedToggler from "./components/speedToggler";
import NumberInputter from "./components/numberInputter";

function App() {
  const [delayTime, setDelayTime] = useState(1000);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [swapIndices, setSwapIndices] = useState([0, 1]);
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [timerStart, setTimerStart] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelayTime(Number(event.target.value));
  };
  const handleSubmit = (event: any) => {
    const regex = /^(?!.*[.,]{2})[0-9,.]*$/;

    if (regex.test(event)) {
      // Convert string of numbers to array
      const newArray = event
        .split(",")
        .map((item: string) => Number(item.trim()));
      setInputValue(event);
      setNumbers(newArray);
    }
  };

  const handleTaskComplete = () => {
    const endTime = new Date();
    const timeDiff = endTime.getTime() - timerStart.getTime(); // strip the ms

    // get seconds
    const seconds = Math.round(timeDiff);

    console.log(seconds);

    setElapsedTime(seconds);
    setTimerStart(null);
  };

  const startAlgorthm = () => {
    if (numbers.length > 1) {
      setTimerStart(new Date());
      setRunAlgorithm(() => true);
    }
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
            handleTaskComplete();
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
        <SpeedToggler delayTime={delayTime} handleChange={handleChange} />
        <NumberInputter handleSubmit={handleSubmit} inputValue={inputValue} />
        <button className="btn btn-primary mt-2" onClick={startAlgorthm}>
          Run
        </button>
        <div className="d-flex justify-content-center  align-items-center mt-4">
          <Canvas
            width={1000}
            height={400}
            numbers={numbers}
            swapIndices={swapIndices}
            timeTaken={elapsedTime}
          />
        </div>
      </div>
    </>
  );
}

export default App;
