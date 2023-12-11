import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./page/Main";
import Welcome from "./page/Welcome";
import './App.css';

const App = () => {
  return (
    <div className="container text-center">
      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col">
        <Router>
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/main" element={<Main/>} />
          </Routes>
        </Router>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default App;
