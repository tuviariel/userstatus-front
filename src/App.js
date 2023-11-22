import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./page/Main";
import Welcome from "./page/Welcome";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/main" element={<Main/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
