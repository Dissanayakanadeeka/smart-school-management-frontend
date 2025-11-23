import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/welcomePage.jsx";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
