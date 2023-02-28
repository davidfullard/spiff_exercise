import React, { useEffect, useState } from "react";
import Exercise from "../exercise/Exercise";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

let startInterval = undefined; // Interval before finish request
let finishInterval = undefined; // Interval after finish request

const CompleteProgress = 100; // Total progress
const HangProgress = 90; // Hanging progress(over 15 seconds)
const HangSecond = 15; // Hanging second to progress

const SPEED_DEFAULT = HangProgress / HangSecond / 10; // Default speed before user finish request

const Solution = () => {
  const [running, setRunning] = useState(false); //Check if the progress if running
  const [progress, setProgress] = useState(0); // Current progress
  const [showProgressBar, setShowProgressBar] = useState(true); // Show or hide progress bar

  useEffect(() => {
    return () => {
      if (startInterval) clearInterval(startInterval);
      if (finishInterval) clearInterval(finishInterval);
    }
  }, [])

  useEffect(() => {
    //If the progress reaches to 100%
    if (progress >= CompleteProgress) {
      setRunning(false);
      //Hide progress bar after 3 seconds
      setTimeout(() => {
        setShowProgressBar(false);
      }, 3 * 1000);
    }
  }, [progress])

  const handler = () => {
    setProgress((prev) => {
      let speed = SPEED_DEFAULT;
      const nextValue = prev + speed;
      if (nextValue >= HangProgress) {
        clearInterval(startInterval);
        return HangProgress;
      }

      return nextValue;
    });
  }


  //Start request
  const handleStart = () => {
    if (!running && showProgressBar) {
      if (startInterval) clearInterval(startInterval);
      if (finishInterval) clearInterval(finishInterval);
      setProgress(0);

      setRunning(true);
      startInterval = setInterval(handler, 100); // Start interval
    }
  };

  //Finish request
  const handleFinish = () => {
    if (!running) return;
    if (startInterval) {
      clearInterval(startInterval)
    }

    const leftAmount = CompleteProgress - progress; // Remainig progress when user tap the finish request
    const intervalAmount = leftAmount / 10; // steps to be completed in 1 second
    finishInterval = setInterval(() => {
      setProgress(prev => {
        const nextValue = prev + intervalAmount;
        if (nextValue >= CompleteProgress) {
          clearInterval(finishInterval);
          return CompleteProgress;
        }

        return nextValue;
      })
    }, 100);
  };

  //shoe progress bar again
  const displayProgressBar = () => {
    setShowProgressBar(true);
    setProgress(0);
  }

  return (
    <div className="App">
      <div>
        <div className={`progress-div ${showProgressBar ? 'show' : 'hidden'}`} style={{ width: '100%' }}>
          <div style={{ width: `${progress}%` }} className="progress" />
        </div>
        <div className="button-group">
          <button className="progress-btn green" onClick={handleStart}>
            {running ? "Loading..." : "Start Request"}
          </button>
          <button
            className="progress-btn red"
            onClick={handleFinish}
          >
            Finish Request
          </button>
          {
            !showProgressBar &&
            <button
              className="progress-btn green"
              onClick={displayProgressBar}
            >
              Show ProgressBar
            </button>
          }
        </div>
      </div>
    </div>
  );
};
