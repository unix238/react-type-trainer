import React from 'react'
import '../Styles/Statistics.css'

export const Statistics = ({texts, totalError, time, isGameActive, restart}) => {
    const getStats = () => {
        if (!isGameActive){
          const words = texts.split(' ').length;
          const errors = totalError;
          const accuracy = ((words - errors) / words * 100).toFixed(2);
          const wordPerMinute = ((words / time) * 60).toFixed(2);
          const finalTime = time.toFixed(2);
          return (
            <div className="stats">
              <div className="stats__item">
                <span className="stats__item-title">Words </span>
                <span className="stats__item-value"> {words}</span>
              </div>
              <div className="stats__item">
                <span className="stats__item-title">Time </span>
                <span className="stats__item-value"> {finalTime}s.</span>
              </div>
              <div className="stats__item">
                <span className="stats__item-title">Errors </span>
                <span className="stats__item-value"> {errors}</span>
              </div>
              <div className="stats__item">
                <span className="stats__item-title">Accuracy </span>
                <span className="stats__item-value"> {accuracy}%</span>
              </div>
              <div className="stats__item">
                <span className="stats__item-title">WPM </span>
                <span className="stats__item-value"> {wordPerMinute}</span>
              </div>
              <button onClick={restart}>Restart</button>
            </div>
          );
        }
      }
  return (
    <div>{getStats()}</div>
  )
}
