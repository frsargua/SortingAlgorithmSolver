import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  FaSortNumericDown,
  FaSortNumericUp,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";
import "./NavigationBar.css";

const NavigationBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="#home">Sorting Visualizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Select Algorithm" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              <FaSortNumericUp /> Bubble Sort
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              <FaSortNumericDown /> Quick Sort
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              <FaSortAlphaUp /> Merge Sort
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              <FaSortAlphaDown /> Heap Sort
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
