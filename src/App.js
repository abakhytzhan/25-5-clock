import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [label, setLabel] = useState("Session");

  const resetHandler = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
    setIsPaused(true);
    setLabel("Session");
    setSessionLength(25);
    setBreakLength(5);
    setMinutes(25);
    setSeconds(0);
  };

  const breakDecHandler = () => {
    if (breakLength > 1 && breakLength <= 60) {
      setBreakLength((prev) => prev - 1);
    }
  };

  const breakIncHandler = () => {
    if (breakLength >= 1 && breakLength < 60) {
      setBreakLength((prev) => prev + 1);
    }
  };

  const sessionIncHandler = () => {
    if (sessionLength >= 1 && sessionLength < 60) {
      setSessionLength((prev) => prev + 1);
      setMinutes(() => sessionLength + 1);
      setSeconds(0);
    }
  };

  const sessionDecHandler = () => {
    if (sessionLength > 1 && sessionLength <= 60) {
      setSessionLength((prev) => prev - 1);
      setMinutes(() => sessionLength - 1);
      setSeconds(0);
    }
  };

  useEffect(() => {
    let timer;
    let m = minutes;
    let s = seconds;
    let isSound = true;

    if (!isPaused) {
      timer = setInterval(() => {
        if (s === 0 && m === 0 && isSound) {
          const audio = document.getElementById("beep");
          audio.play();
          isSound = false;
        } else if (s === 0 && m === 0 && !isSound) {
          if (label === "Session") {
            setMinutes(breakLength);
            setLabel("Break");
          } else {
            setMinutes(sessionLength);
            setLabel("Session");
          }
        } else if (s === 0) {
          s = 60;
          s--;
          m = m - 1;
          setMinutes(m);
          setSeconds(s);
        } else {
          s--;
          setMinutes(m);
          setSeconds(s);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, label]);

  return (
    <div className="App">
      <div id="container">
        <div id="app">
          <div>
            <div className="main-title">25 + 5 Clock</div>
            <div className="length-control">
              <div id="break-label">Break Length</div>
              <button
                className="btn-level"
                id="break-decrement"
                value="-"
                onClick={breakDecHandler}
                disabled={!isPaused}
              >
                <i className="fa fa-arrow-down fa-2x"></i>
              </button>
              <div className="btn-level" id="break-length">
                {breakLength.toString()}
              </div>
              <button
                className="btn-level"
                id="break-increment"
                value="+"
                onClick={breakIncHandler}
                disabled={!isPaused}
              >
                <i className="fa fa-arrow-up fa-2x"></i>
              </button>
            </div>
            <div className="length-control">
              <div id="session-label">Session Length</div>
              <button
                className="btn-level"
                id="session-decrement"
                value="-"
                onClick={sessionDecHandler}
                disabled={!isPaused}
              >
                <i className="fa fa-arrow-down fa-2x"></i>
              </button>
              <div className="btn-level" id="session-length">
                {sessionLength.toString()}
              </div>
              <button
                className="btn-level"
                id="session-increment"
                value="+"
                onClick={sessionIncHandler}
                disabled={!isPaused}
              >
                <i className="fa fa-arrow-up fa-2x"></i>
              </button>
            </div>
            <div className="timer">
              <div
                className="timer-wrapper"
                style={
                  minutes === 0
                    ? { color: "rgb(165, 13, 13)" }
                    : { color: "#fff" }
                }
              >
                <div id="timer-label">{label}</div>
                <div id="time-left">
                  {(minutes > 9 ? minutes : "0" + minutes).toString()}:
                  {(seconds > 9 ? seconds : "0" + seconds).toString()}
                </div>
              </div>
            </div>
            <div className="timer-control">
              <button
                id="start_stop"
                onClick={() => setIsPaused((prev) => !prev)}
              >
                <i className="fa fa-play fa-2x"></i>
                <i className="fa fa-pause fa-2x"></i>
              </button>
              <button id="reset" onClick={resetHandler}>
                <i className="fa fa-refresh fa-2x"></i>
              </button>
            </div>
            <audio
              id="beep"
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ></audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
