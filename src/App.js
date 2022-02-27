import "./App.css";
import { useEffect, useState } from "react";
import { random } from "./utils/random";
import { Navbar } from "./Components/Navbar";
import BooksServices from "./api/BooksServices";
import { Statistics } from "./Components/Statistics";

function App() {
  const [texts, setTexts] = useState("");
  const [textNumber, setTextNumber] = useState(random(0, texts.length - 1));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [fromErrorIndex, setFromErrorIndex] = useState(-1);
  const [errorKey, setErrorKey] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);
  const [totalError, setTotalError] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlerPress = (e) => {
    const isRightKeyPressed = e.key === texts[currentIndex];
    if (e.key === "Backspace") {
      setCurrentIndex(currentIndex - 1);
    } else if (e.key === "Shift") {
      return;
    } else if (e.key === "Tab") {
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
    if (currentIndex === texts.length && !isError) {
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

  const updateText = async () => {
    try {
      BooksServices.getRandomText().then((data) => {
        console.log(data.data.results[0].text);
        setTexts(data.data.results[0].text);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateText();
  }, []);

  // const drawText = () => {
  //   if (currentIndex > 0) {
  //     return (
  //       <div>
  //         {texts[textNumber]
  //           .slice(0, currentIndex)
  //           .split("")
  //           .map((char, index) => {
  //             if (isError) {
  //               if (fromErrorIndex <= index) {
  //                 return (
  //                   <span key={index} className="error">
  //                     {char}
  //                   </span>
  //                 );
  //               }
  //             }
  //             return <span key={index}>{char}</span>;
  //           })}
  //       </div>
  //     );
  //   } else {
  //     return <div>{texts[textNumber]}</div>;
  //   }
  // };

  const drawText = () => {
    const text = texts;
    return text.split("").map((letter, index) => {
      if (isError) {
        if (fromErrorIndex <= index && currentIndex > index) {
          return (
            <span key={index} className="error">
              {letter}
            </span>
          );
        } else {
          if (index < fromErrorIndex && index < currentIndex) {
            return (
              <span key={index} className="success">
                {letter}
              </span>
            );
          } else {
            return (
              <span key={index} className="future">
                {letter}
              </span>
            );
          }
        }
      } else {
        if (currentIndex > index) {
          return (
            <span key={index} className="success">
              {letter}
            </span>
          );
        } else if (index >= currentIndex) {
          return (
            <span key={index} className="future">
              {letter}
            </span>
          );
        }
      }
    });
  };

  const restart = () => {
    setIsLoading(true);
    setIsGameActive(false);
    setIsError(false);
    setFromErrorIndex(-1);
    setCurrentIndex(0);
    setTextNumber(random(0, texts.length - 1));
    setStartTime(0);
    setTime(0);
    setTotalError(0);
    updateText();
  };

  // Hello World
  // 012345678910
  // Helko World

  return (
    <div className="App" tabIndex={-1} onKeyDown={handlerPress}>
      <Navbar></Navbar>
      {!isLoading ? (
        <div className="main">
          <h2>{drawText()}</h2>
        </div>
      ) : (
        <div className="main">
          <div className="lds-dual-ring"></div>
        </div>
      )}

      {!isGameActive && currentIndex > 1 ? (
        <div className="result">
          <Statistics
            restart={restart}
            time={time}
            totalError={totalError}
            texts={texts}
            isGameActive={isGameActive}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="bottom__section">
        {/* how to play section */}
        <div className="how-to-play">
          <div className="how-to-play__items">
          <h4>How to play</h4>
            <div className="how-to-play__item">
              
              <p>
                You can type the text in the text box and press enter to
                continue.
              </p>

              <p>
                If you type the wrong letter, you will see the red text and the
                text will be highlighted in red.
              </p>

              <p>
                If you type the right letter, the text will be highlighted in
                green.
              </p>

              <p>
                If you type the right letter and you are at the end of the text,
                you will see the green text and the game will be finished.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
