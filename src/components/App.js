import '../styles/App.css';
import Home from "./Home";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

function App() {
  return (
      <div style={{ height: "100%" }}>
      <div id="bg"></div>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
