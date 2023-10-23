import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{width:'100%'}} className="position-fixed z-1 top-0 bg-dark">
      <Nav
        className="d-flex justify-content-between align-items-center "
        variant="tabs"
        defaultActiveKey="/home"
      >
        <Nav.Item className="w-25 text-center">
          <Link className="text-decoration-none " to={"/"}>
            <Nav.Link className=" fs-5 p-2  " href="/">
              Add <i class="fa-solid fa-square-plus ms-2"></i>
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item className="w-25 text-center">
          <Link className="text-decoration-none" to={"/contact"}>
            <Nav.Link className=" fs-5 p-2  " href="/home">
              Contact <i class="fa-regular fa-address-card ms-2"></i>
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item className="w-25 text-center">
          <Nav.Link className=" fs-5 p-2  " eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Header;
