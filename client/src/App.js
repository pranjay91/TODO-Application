import {Route,Routes,BrowserRouter} from "react-router-dom";
import RegisterPage from "./Component/register/register";
import LoginPage from "./Component/login/login";
import TodoTable from "./Component/list/list";

function App() {
  return (
    <>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegisterPage/>}></Route>
      <Route path="/Login" element={<LoginPage/>}></Route>
      <Route path="/Todo" element={<TodoTable/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;