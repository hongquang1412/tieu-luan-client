import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "reactstrap";
import { TiDelete } from "react-icons/ti";
import { GrFormAdd } from "react-icons/gr";
import { RiSubtractFill } from "react-icons/ri";
import * as productsApi from "../../api/productsApi";
function CardProductCart({
  idItem,
  id,
  img,
  name,
  discount,
  price,
  color,
  capacity,
  quantity,
  setRender,
}) {
  const [currentQuantity, setCurrentQuantity] = useState([]);
  const [quantityValue, setQuantityValue] = useState(quantity);

  useEffect(() => {
    const fetchApi = async () => {
      const getProduct = await productsApi.get(id);
      setCurrentQuantity(getProduct.products[0].sp_soluong);
    };
    fetchApi();
  }, [id]);

  let carts = [];
  const getCarts = localStorage.getItem("carts");
  if (getCarts) {
    carts = JSON.parse(getCarts);
  }

  const handleAddQuantity = (idItem) => {
    const item = carts.find((cart, index) => {
      return index === idItem;
    });
    if (item) {
      if (quantityValue < currentQuantity) {
        item.productQuantity = quantityValue + 1;
        localStorage.setItem("carts", JSON.stringify(carts));
        setQuantityValue(item.productQuantity);
        setRender(true);
      }
    }
  };
  const handleSubQuantity = (idItem) => {
    const item = carts.find((cart, index) => {
      return index === idItem;
    });
    if (item) {
      if (quantityValue > 1) {
        item.productQuantity = quantityValue - 1;
        localStorage.setItem("carts", JSON.stringify(carts));
        setQuantityValue(item.productQuantity);
        setRender(true);
      }
    }
  };

  const handleDeleteItemCart = (idItem) => {
    const cartsNew = carts.filter((cart, index) => {
      return index !== idItem;
    });
    if (cartsNew) {
      localStorage.setItem("carts", JSON.stringify(cartsNew));
      setRender(true);
    }

    if (cartsNew.length === 0) {
      localStorage.removeItem("carts");
    }
  };
  return (
    <div className="cart__content-product">
      <Row className="py-2 justify-content-between">
        <Col className="col-8">
          <div className="d-flex">
            <img src={img} alt="" width={80} height={80} />
            <div className="ms-2">
              <h5 className="fs-5">{name}</h5>
              <p>
                Màu: {color}, Dung lượng: {capacity}
              </p>
              <p>Số lượng hiện có: {currentQuantity}</p>
            </div>
          </div>
        </Col>
        <Col className="col-3">
          <div className="text-center">
            {discount !== 0 ? (
              <>
                <strong>
                  {discount?.toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
                <p className="text-decoration-line-through">
                  {price?.toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </>
            ) : (
              <strong>
                {price?.toLocaleString("VND", {
                  style: "currency",
                  currency: "VND",
                })}
              </strong>
            )}
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <RiSubtractFill
              className="me-1 fs-3 p-1 bg-light border border-dark"
              onClick={() => {
                handleSubQuantity(idItem);
              }}
            />
            <Input
              id="exampleText"
              name="text"
              type="text"
              className="w-50 text-center"
              value={quantityValue}
              readOnly
            />
            <GrFormAdd
              className="ms-1 fs-3 p-1 bg-light border border-dark"
              onClick={() => {
                handleAddQuantity(idItem);
              }}
            />
          </div>
        </Col>
        <Col className="col-1">
          <TiDelete
            className="fs-4"
            onClick={() => {
              handleDeleteItemCart(idItem);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CardProductCart;
