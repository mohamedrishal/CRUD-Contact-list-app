import "./App.css";
import Header from "./Components/Header";
import {Route, Routes} from 'react-router-dom';
import Home from "./Pages/Home";
import Update from "./Components/Update";
import AddPage from "./Pages/AddPage";

function App() {
  return (

    <div className="app">

      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<AddPage/>} />
        <Route path="update/:id" element={<Update />}/>
      </Routes>

    </div>


  );
}

export default App;
