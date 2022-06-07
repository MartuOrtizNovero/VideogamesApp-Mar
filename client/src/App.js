import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home.jsx';
import Detail from './components/Detail.jsx'
import Form from './components/Form.jsx'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/videogames/:id' element={<Detail />} />
        <Route path='/videogames' element={<Form />} />
      </Routes>
    </div>
  );
}
export default App;
