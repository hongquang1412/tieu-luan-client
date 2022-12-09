import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { NavLink } from "react-router-dom";
function CardCategory({ img, title }) {
  let width = "0";
  let height = "0";
  switch (title) {
    case "iPhone":
      width = "93";
      height = "111";
      break;
    case "Mac":
      width = "166";
      height = "75";
      break;
    case "iPad":
      width = "116";
      height = "102";
      break;
    case "Watch":
      width = "132";
      height = "84";
      break;
    default:
      width = "120";
  }

  return (
    <NavLink to={`/category/${title}`} className="text-white text-decoration-none">
      <Card
      className="card-item"
        style={{
          width: "180px",
          height: "180px",
          padding: "10px 20px 0 20px",
          backgroundColor: "#222",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={img} alt="" width={width} height={height} />
        <CardBody className="p-0">
          <CardTitle tag="h5" className="mt-3">
            {title}
          </CardTitle>
        </CardBody>
      </Card>
    </NavLink>
  );
}

export default CardCategory;
