import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./routes/Intro";
import Main from "./routes/Main";
import Statics from "./routes/Statics";
import Option from "./routes/Option";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="main" element={<Main />} />
        <Route path="statics" element={<Statics />} />
        <Route path="option" element={<Option />} />
      </Routes>
    </Router>
  );
}

export default App;
