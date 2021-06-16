import "./App.css";
import Card from "./components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import soundFile from "../src/assets/build_testable-projects-fcc_audio_BeepSound.wav";

function App() {
  const [session, setSession] = useState({
    sessionLength: 25,
    breakLength: 5,
    minutes: 25,
    seconds: 0,
    isRunning: false,
    onBreak: false,
  });
  const audioRef = useRef(null);

  const beepHandler = () => {
    audioRef.current.play();
  };

  const beepResetHandler = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const sessionLengthHandler = (event) => {
    if (!session.isRunning) {
      switch (event.target.value) {
        case "-":
          if (session.sessionLength > 1) {
            setSession((prevValue) => {
              return {
                ...prevValue,
                sessionLength: prevValue.sessionLength - 1,
                minutes: session.onBreak
                  ? prevValue.minutes
                  : prevValue.sessionLength - 1,
                seconds: session.onBreak ? prevValue.seconds : 0,
              };
            });
          }
          break;
        case "+":
          if (session.sessionLength < 60) {
            setSession((prevValue) => {
              return {
                ...prevValue,
                sessionLength: prevValue.sessionLength + 1,
                minutes: session.onBreak
                  ? prevValue.minutes
                  : prevValue.sessionLength + 1,
                seconds: session.onBreak ? prevValue.seconds : 0,
              };
            });
          }
          break;
        default:
          break;
      }
    }
  };

  const breakLengthHandler = (event) => {
    switch (event.target.value) {
      case "-":
        if (session.breakLength > 1) {
          setSession((prevValue) => {
            return {
              ...prevValue,
              breakLength: prevValue.breakLength - 1,
              minutes: session.onBreak
                ? prevValue.breakLength - 1
                : prevValue.minutes,
              seconds: session.onBreak ? 0 : prevValue.seconds,
            };
          });
        }
        break;
      case "+":
        if (session.breakLength < 60) {
          setSession((prevValue) => {
            return {
              ...prevValue,
              breakLength: prevValue.breakLength + 1,
              minutes: session.onBreak
                ? prevValue.breakLength + 1
                : prevValue.minutes,
              seconds: session.onBreak ? 0 : prevValue.seconds,
            };
          });
        }
        break;
      default:
        break;
    }
  };

  const startPauseHandler = (event) => {
    switch (event.target.id) {
      case "start_stop":
        setSession((prevValue) => {
          return {
            ...prevValue,
            isRunning: !prevValue.isRunning,
          };
        });
        break;
      default:
        break;
    }
  };

  const resetHandler = () => {
    beepResetHandler();
    setSession({
      sessionLength: 25,
      breakLength: 5,
      minutes: 25,
      seconds: 0,
      isRunning: false,
      onBreak: false,
    });
  };

  useEffect(() => {
    if (session.isRunning) {
      if (session.minutes === 0 && session.seconds === 0) {
        // console.log("Min: " + session.minutes + " Sec: " + session.seconds);
        beepHandler();
      }

      const interval = setInterval(() => {
        if (session.minutes >= 0 && session.seconds >= 0) {
          setSession((prevValue) => {
            return {
              ...prevValue,
              seconds: prevValue.seconds - 1,
            };
          });
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  });

  if (session.isRunning) {
    if (session.seconds < 0 && session.minutes > 0) {
      setSession((prevValue) => {
        return {
          ...prevValue,
          minutes: prevValue.minutes - 1,
          seconds: 59,
        };
      });
    }

    if (session.minutes === 0 && session.seconds < 0) {
      setSession((prevValue) => {
        if (!session.onBreak) {
          // console.log("break");
          return {
            ...prevValue,
            sessionLength: prevValue.sessionLength,
            breakLength: prevValue.breakLength,
            minutes: prevValue.breakLength,
            seconds: 0,
            onBreak: !prevValue.onBreak,
          };
        } else {
          // console.log("session");
          return {
            ...prevValue,
            sessionLength: prevValue.sessionLength,
            breakLength: prevValue.breakLength,
            minutes: prevValue.sessionLength,
            seconds: 0,
            onBreak: !prevValue.onBreak,
          };
        }
      });
    }
  }

  return (
    <>
      <div className="App">
        <Card>
          <h1 id="session-label">Session Length</h1>
          <div id="controls">
            <button
              onClick={sessionLengthHandler}
              value="-"
              id="session-decrement"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <div id="session-length">{session.sessionLength}</div>
            <button
              onClick={sessionLengthHandler}
              value="+"
              id="session-increment"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </Card>
        <Card>
          <div id="timer">
            <audio id="beep" ref={audioRef} src={soundFile}></audio>
            <h1 id="timer-label">{session.onBreak ? "Break" : "Session"}</h1>
            <div id="time-left">{`${
              session.minutes.toString().length === 1
                ? "0" + session.minutes.toString()
                : session.minutes.toString()
            }:${
              session.seconds.toString().length === 1
                ? "0" + session.seconds.toString()
                : session.seconds.toString()
            }`}</div>
          </div>
        </Card>
        <Card>
          <h1 id="break-label">Break Length</h1>
          <div id="controls">
            <button onClick={breakLengthHandler} value="-" id="break-decrement">
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <div id="break-length">{session.breakLength}</div>
            <button onClick={breakLengthHandler} value="+" id="break-increment">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </Card>
      </div>
      <div id="btn">
        <button id="start_stop" onClick={startPauseHandler}>
          PlayPause
          {/* <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} /> */}
        </button>
        <button id="reset" onClick={resetHandler}>
          {/* <FontAwesomeIcon icon={faUndo} /> */}
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
