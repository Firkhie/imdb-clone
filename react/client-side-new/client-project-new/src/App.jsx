import './App.css'
import NavbarCustom from './components/NavbarCustom'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavbarCustom />
      <Outlet />
    </>
  )
}

export default App
