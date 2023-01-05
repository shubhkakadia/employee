import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FactoryPage from './components/Home/factory_page/factoryPage';
import Home from './components/Home/home';
import LandingPage from './components/landingPage/landingPage'

function App() {
  return (
    
    <div className="App">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      />
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/home" element={<Home />}/>
          <Route path='/:factory' element={<FactoryPage/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
