import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./routes/Intro";
import Main from "./routes/Main";
import Statics from "./routes/Statics";
import Option from "./routes/Option";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
      </Routes>
      <Routes>
        <Route path="main" element={<Main />}></Route>
      </Routes>
      <Routes>
        <Route path="statics" element={<Statics />}></Route>
      </Routes>
      <Routes>
        <Route path="option" element={<Option />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

//hi
