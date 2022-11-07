import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as categoriesApi from "../../api/categoriesApi";
import * as productsApi from "../../api/productsApi";
import Search from "../search/Search";
function Header() {
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    const fetchApi = async () => {
      const getCategories = await categoriesApi.get();
      setCategories(getCategories.categories);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const getProducts = await productsApi.get();
      setProducts(getProducts.products);
    };
    fetchApi();
  }, []);

  console.log(products);

  return (
    <div>
      <Container className="header py-3 bg-black" fluid>
        <Row className="mx-5 justify-content-around align-items-center">
          <Col className="d-flex">
            <NavLink
              to="/"
              className="ms-4 fs-6 fw-semibold text-white text-decoration-none"
            >
              <img src="/images/logo.png" alt="" width="200" />
            </NavLink>
          </Col>

          <Col className="d-flex">
            {categories.map((category) => (
              <NavLink
                to={`/category/${category.l_id}`}
                className="ms-4 fs-6 fw-semibold text-white text-decoration-none"
              >
                {category.l_ten}
              </NavLink>
            ))}
          </Col>

          <Col className="col-4">
              <Search/>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            <NavLink to="/cart">
              <RiShoppingCartLine className="ms-4 fs-2 text-white" />
            </NavLink>
            {localStorage.getItem("infoCustomer") === null ||
            localStorage.getItem("infoCustomer") === undefined ? (
              <>
                <NavLink
                  to="/register"
                  className="ms-4 mb-0 fs-6 fw-semibold text-white text-decoration-none"
                >
                  Đăng ký
                </NavLink>

                <NavLink
                  to="/login"
                  className="ms-4 mb-0 fs-6 fw-semibold text-white text-decoration-none"
                >
                  Đăng nhập
                </NavLink>
              </>
            ) : (
              <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ms-4">
                <DropdownToggle caret className="bg-black">
                  {account.kh_hoten}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink
                      to="/info"
                      className="text-decoration-none text-black"
                    >
                      Thông tin cá nhân
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      to="/orders"
                      className="text-decoration-none text-black"
                    >
                      Đơn hàng
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink
                      to="#"
                      className="text-decoration-none text-black"
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("infoCustomer");
                        navigate("/login");
                      }}
                    >
                      Đăng xuất
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
