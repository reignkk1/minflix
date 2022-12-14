import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// File
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

// ======================================================================================================

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/movie/:category/:id" element={<Home />}></Route>
        </Route>

        <Route path="/tv" element={<Tv />}>
          <Route path=":category/:id" element={<Tv />}></Route>
        </Route>

        <Route path="/search" element={<Search />}>
          <Route path=":id" element={<Search />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
