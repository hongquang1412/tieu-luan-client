import React from "react";
import { Col } from "reactstrap";
import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <Col className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
          id="menu"
        >
          <li className="nav-item">
            <NavLink to="/info" className="nav-link align-middle px-0">
              <span className="px-3 d-none d-sm-inline">Thông tin cá nhân</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/address" className="nav-link align-middle px-0">
              <span className="px-3 d-none d-sm-inline">Địa chỉ</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/orders" className="nav-link align-middle px-0">
              <span className="px-3 d-none d-sm-inline">Đơn hàng</span>
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </Col>
  );
}

export default Sidebar;
