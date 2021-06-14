import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Session increment/decrement card */}
      <div id="session-label">Session Length</div>
      <div id="session-length">25</div>
      <div id="session-increment">+</div>
      <div id="session-decrement">-</div>
      {/* Break increment/decrement card */}
      <div id="break-label">Break Length</div>
      <div id="break-length">5</div>
      <div id="break-increment">+</div>
      <div id="break-decrement">-</div>
      {/* Session timer card */}
      <div id="timer-label">Session</div>
      <div id="time-left">25:00</div>
      {/* Session timer controls */}
      <div id="start_stop">play/stop</div>
      <div id="reset">reset</div>
    </div>
  );
}

export default App;
