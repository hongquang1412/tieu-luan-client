import React, { useState, useEffect } from "react";
import { Col, Table, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";
import * as ordersApi from "../../api/ordersApi";

function Orders() {
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  const kh_id = account.kh_id;
  const [orders, setOrders] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const getOrder = await ordersApi.get(kh_id);
      setOrders(getOrder.orders);
      setRender(false);
    };
    fetchApi();
  }, [render, kh_id]);

  const handleDeleteOrder = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn hủy đơn không!");
    if (confirm) {
      await ordersApi._delete(id);
      setRender(true);
      alert("Hủy đơn thành công");
      navigate("/orders");
    }
  };

  return (
    <Col className="col py-3">
      <h3>Danh sách đơn hàng</h3>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Địa chỉ giao hàng</th>
            <th>Thành tiền</th>
            <th>trạng thái đơn</th>
            <th>Thời gian giao hàng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.dh_id}</td>
              <td>{order.dh_diachigh}</td>
              <td>
                {parseInt(order.dh_thanhtien).toLocaleString("VND", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>{order.dh_trangthai}</td>
              <td>
                {order.dh_thoigiangh ? moment(order.dh_thoigiangh).format("DD-MM-YYYY") : "Đang cập nhật"}
              </td>
              <td>
                <NavLink to={`/orders/detail/${order.dh_id}`}>
                  <Button>Chi tiết</Button>
                </NavLink>
                &nbsp; &nbsp;
                {order.dh_trangthai === "Chưa duyệt" ? (
                  <Button
                    color="danger"
                    onClick={() => {
                      handleDeleteOrder(order.dh_id);
                    }}
                  >
                    Huỷ đơn
                  </Button>
                ) : (
                  "Không thể hủy đơn"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default Orders;
