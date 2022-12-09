import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { NavLink } from "react-router-dom";
function CardProduct({ id, img, title, price, discount }) {
  let productPriceNew = parseInt(price) * ((100 - parseInt(discount)) / 100);
  return (
    <NavLink to={`/detail/${id}`} className="text-white text-decoration-none">
      <Card
        className="card-item"
        style={{
          width: "280px",
          padding: "20px",
          backgroundColor: "#222",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={img} alt="" width="250" height="250" />
        <CardBody className="p-0">
          <CardTitle tag="h5" className="mt-3">
            {title}
          </CardTitle>
          <CardText>
            {discount !== 0 ? (
              <>
                {" "}
                <span>
                  {price
                    ? parseInt(productPriceNew).toLocaleString("VND", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "Đang cập nhật"}
                </span>
                &nbsp;&nbsp;
                <span className="text-decoration-line-through">
                  {price
                    ? parseInt(price).toLocaleString("VND", {
                        style: "currency",
                        currency: "VND",
                      })
                    : ""}
                </span>
              </>
            ) : (
              <span>
              {price
                ? parseInt(price).toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })
                : "Đang cập nhật"}
            </span>
            )}
            &nbsp;&nbsp;
            <span>{discount !== 0 ? `${discount}%` : ""}</span>
          </CardText>
        </CardBody>
      </Card>
    </NavLink>
  );
}

export default CardProduct;
