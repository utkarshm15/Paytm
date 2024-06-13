import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Heading } from "./components/Heading";
import { SubHeading } from "./components/SubHeading";
import { InputBox } from "./components/InputBox";
import { Button } from "./components/Button";
import { Warning } from "./components/Warning";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/send" element={<SendMoney/>}/>
          </Routes>
      </BrowserRouter>
    </div>
    
  )

}

export default App
