import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavigationBar />
    </>
  );
}

export default App;
