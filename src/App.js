import {Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ChooseStation from "./pages/ChooseStation.jsx";


function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element = {<AuthPage/>}/>
        <Route path='/main' element = {<MainPage/>}/>
        <Route path='/choice' element = {<ChooseStation/>}/>
      </Routes>
    </div>
  );
}

export default App;
