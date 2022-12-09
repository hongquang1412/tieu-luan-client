import React from "react";
import { NavLink } from "react-router-dom";
function ProductItem({ data, setShowResult }) {
  const price =  parseInt(data.giatiens[0].gt_gia) * ((100 - parseInt(data.giam?.g_phantram)) / 100);
  return (
    <NavLink
      to={`/detail/${data.sp_id}`}
      onClick={() => {
        setShowResult(false);
      }}
      className="text-decoration-none"
    >
      <div className="wrapper-product">
        <img
          className="product"
          src={`http://127.0.0.1:8887/${data.hinhs[0]?.h_ten}`}
          alt=""
        />
        <div className="info">
          <p className="name">{data.sp_ten}</p>
          <p className="price">
            <b>
              {price ? price.toLocaleString(
                "VND",
                {
                  style: "currency",
                  currency: "VND",
                }
              ): "Đang cập nhật"}
            </b>
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductItem;
