import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddFactoryForm from "./components/factory_page/addFactoryForm/addFactoryForm";
import FactoryPage from "./components/factory_page/factoryPage";
import Dashboard from "./components/dashboard/dashboard";
import LandingPage from "./components/landingPage/landingPage";

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
          <Route path="/addfactory" element={<AddFactoryForm />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:factory" element={<FactoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
