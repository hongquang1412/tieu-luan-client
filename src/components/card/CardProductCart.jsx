import React, { useState } from "react";
import { Row, Col, Input } from "reactstrap";
import { TiDelete } from "react-icons/ti";
import { GrFormAdd } from "react-icons/gr";
import { RiSubtractFill } from "react-icons/ri";
function CardProductCart({
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
  let carts = [];
  const getCarts = localStorage.getItem("carts");
  if (getCarts) {
    carts = JSON.parse(getCarts);
  }

  const [quantityValue, setQuantityValue] = useState(quantity);

  const handleAddQuantity = (id) => {
    const item = carts.find((cart, index) => {
      return index === id;
    });
    if (item) {
      item.productQuantity = quantityValue + 1;
      localStorage.setItem("carts", JSON.stringify(carts));
      setQuantityValue(item.productQuantity);
      setRender(true);
    }
  };
  const handleSubQuantity = (id) => {
    const item = carts.find((cart, index) => {
      return index === id;
    });
    if (item) {
      item.productQuantity = quantityValue - 1;
      localStorage.setItem("carts", JSON.stringify(carts));
      setQuantityValue(item.productQuantity);
      setRender(true);
    }
  };

  const handleDeleteItemCart = (id) => {
    const cartsNew = carts.filter((cart, index) => {
      return index !== id;
    });
    if (cartsNew) {
      localStorage.setItem("carts", JSON.stringify(cartsNew));
      setRender(true);
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
                Màu: {color}, Dung lượng: {capacity}GB
              </p>
            </div>
          </div>
        </Col>
        <Col className="col-3">
          <div className="text-center">
            {discount !== 0 ? (
              <>
                <strong>
                  {discount.toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
                <p className="text-decoration-line-through">
                  {price.toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </>
            ) : (
              <strong>
                {price.toLocaleString("VND", {
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
                handleSubQuantity(id);
              }}
            />
            <Input
              id="exampleText"
              name="text"
              type="text"
              className="w-50 text-center"
              value={quantityValue}
              min={0}
              readOnly
            />
            <GrFormAdd
              className="ms-1 fs-3 p-1 bg-light border border-dark"
              onClick={() => {
                handleAddQuantity(id);
              }}
            />
          </div>
        </Col>
        <Col className="col-1">
          <TiDelete
            className="fs-4"
            onClick={() => {
              handleDeleteItemCart(id);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CardProductCart;
