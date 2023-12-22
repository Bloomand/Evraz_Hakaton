import {Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";


function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element = {<AuthPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
