import "./App.css";
import { useEffect, useState } from "react";
import { random } from "./utils/random";

function App() {
  const [texts, setTexts] = useState(["Hello World", "World Hello"]);
  const [textNumber, setTextNumber] = useState(random(0, texts.length - 1));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [fromErrorIndex, setFromErrorIndex] = useState(-1);
  const [errorKey, setErrorKey] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);
  const [totalError, setTotalError] = useState(0);

  const handlerPress = (e) => {
    const isRightKeyPressed = e.key === texts[textNumber][currentIndex];
    if (e.key === "Backspace") {
      setCurrentIndex(currentIndex - 1);
    } else if (e.key === "Shift") {
      return;
    } else if (!isRightKeyPressed) {
      if (isError) {
        setCurrentIndex(currentIndex + 1);
        setTotalError(totalError + 1);
      } else {
        setIsError(true);
        setFromErrorIndex(currentIndex);
        setCurrentIndex(currentIndex + 1);
        setTotalError(totalError + 1);
      }
    } else if (isRightKeyPressed && fromErrorIndex == currentIndex) {
      setIsError(false);
      setFromErrorIndex(-1);
      setCurrentIndex(currentIndex + 1);
    } else if (isRightKeyPressed) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (currentIndex === 1) {
      setIsGameActive(true);
    }
    if (currentIndex === texts[textNumber].length) {
      setIsGameActive(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isGameActive) {
      setStartTime(Date.now());
    }
    if (!isGameActive) {
      setTime((Date.now() - startTime) / 1000);
    }
  }, [isGameActive]);

  const drawText = () => {
    if (currentIndex > 0) {
      return (
        <div>
          {texts[textNumber]
            .slice(0, currentIndex)
            .split("")
            .map((char, index) => {
              if (isError) {
                if (fromErrorIndex <= index) {
                  return (
                    <span key={index} className="error">
                      {char}
                    </span>
                  );
                }
              }
              return <span key={index}>{char}</span>;
            })}
        </div>
      );
    } else {
      return <div>{texts[textNumber]}</div>;
    }
  };

  // Hello World
  // 012345678910
  // Helko World

  return (
    <div className="App" tabIndex={-1} onKeyDown={handlerPress}>
      <div className="text">
        {texts[textNumber]}
        {drawText()}
      </div>
      {!isGameActive && currentIndex > 1 ? (
        <div className="result">
          <h3>Congratulations!</h3>
          <p>Your Time Is: {time}s.</p>
          <p>And You made {totalError} errors</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
