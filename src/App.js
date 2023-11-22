// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


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
