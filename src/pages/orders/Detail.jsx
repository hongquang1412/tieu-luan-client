import React, { useState, useEffect } from "react";
import { Col, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import * as ordersApi from "../../api/ordersApi";

function Detail() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const getDetails = await ordersApi.getDetails(id);
      setDetails(getDetails.orders[0].chitietdonhangs);
    };
    fetchApi();
  }, [id]);
  console.log(details);
  return (
    <Col className="col py-3">
      <h3>Danh sách đơn hàng</h3>
      <Table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Màu sắc</th>
            <th>Dung lượng</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td>{detail.sanpham?.sp_ten}</td>
              <td>{detail.ctdh_mausac}</td>
              <td>{detail.ctdh_dungluong}GB</td>
              <td>{detail.ctdh_soluong}</td>
              <td>
                {parseInt(detail.ctdh_dongia).toLocaleString("VND", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default Detail;
