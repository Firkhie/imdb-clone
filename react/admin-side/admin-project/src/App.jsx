import './App.css'
import SidebarCustom from './components/SidebarCustom'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <SidebarCustom />
      <Outlet />
    </>
  )
}

export default App
