import "./App.css";
import Home from "./components/Home";
import Install from "./components/Install";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {window?.ethereum ? <Home /> : <Install />}
      </header>
    </div>
  );
}

export default App;
