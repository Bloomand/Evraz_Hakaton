import {Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import MainPage from "./pages/MainPage.jsx";


function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element = {<AuthPage/>}/>
        <Route path='/main' element = {<MainPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
