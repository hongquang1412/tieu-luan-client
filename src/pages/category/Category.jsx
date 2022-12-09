import React, { useState, useEffect } from "react";
import { Container, Row, Col, List } from "reactstrap";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import CardProduct from "../../components/card/CardProduct";
import * as productsApi from "../../api/productsApi";
function Category() {
  const { name } = useParams();
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }) => {
    return isActive ? "filter-category-link-active" : "filter-category-link";
  };
  const [products, setProducts] = useState([]);
  const [length, setLength] = useState();
  let filters = [];
  if (name === "iPhone" || name === "iPhone 14" || name === "iPhone 13") {
    filters = [
      {
        url: "iPhone",
        title: "Tất cả",
      },
      {
        url: "iPhone%2014",
        title: "iPhone 14",
      },
      {
        url: "iPhone%2013",
        title: "iPhone 13",
      },
    ];
  } else {
    filters = [
      {
        url: "iPad",
        title: "Tất cả",
      },
      {
        url: "iPad%20Pro%20M1",
        title: "iPad Pro M1",
      },
      {
        url: "iPad%20Air",
        title: "iPad Air",
      },
    ];
  }

  useEffect(() => {
    const fetchApi = async () => {
      const getProducts = await productsApi.getByName(name);
      setProducts(getProducts.products);
      setLength(getProducts.products.length);
    };
    fetchApi();
  }, [name]);

  console.log("products", length);

  return (
    <div className="content">
      <Container>
        {length > 0 ? (
          <>
            <Row className="mb-3">
              <Col>
                {filters.map((filter, index) => (
                  <NavLink
                    key={index}
                    to={`/category/${filter.url}`}
                    className={navLinkClass}
                  >
                    {filter.title}
                  </NavLink>
                ))}
              </Col>
            </Row>
            <Row>
              {products.map((product, index) => (
                <Col key={index} className="mb-3 col-4">
                  <CardProduct
                    id={product.sp_id}
                    img={`http://127.0.0.1:8887/${product.hinhs[0]?.h_ten}`}
                    title={product.sp_ten}
                    price={product.giatiens[0].gt_gia}
                    discount={product.giam?.g_phantram}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <h1 className="text-center text-white" style={{padding: "50px 0"}}>Sản phẩm chưa được cập nhật</h1>
        )}
      </Container>
    </div>
  );
}

export default Category;
