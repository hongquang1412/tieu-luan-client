import React, { useState, useEffect } from "react";
import { Col, Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import * as addressApi from "../../api/addressApi";

function Address() {
  const [address, setAddress] = useState([]);
  const [render, setRender] = useState(false);
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  const kh_id = account.kh_id;
  useEffect(() => {
    const fetchApi = async () => {
      const getAddress = await addressApi.getByCustomerId(kh_id);
      setAddress(getAddress.address);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteAddress = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      addressApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };

  return (
    <Col className="col-6 py-3">
      <h3>Danh sách địa chỉ</h3>
      <div className="address-btn-add">
        <NavLink to="/address/add">
          <Button color="primary">Thêm địa chỉ</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Địa chỉ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {address.map((add, index) => (
            <tr key={index}>
              <td>{add.dc_id}</td>
              <td>{add.dc_diachi}</td>
              <td>
                <NavLink to={`/address/update/${add.dc_id}`}>
                  <Button color="info" className="text-white">
                    Cập nhật
                  </Button>
                </NavLink>
                &nbsp; &nbsp;
                <Button
                  color="danger"
                  onClick={() => handleDeleteAddress(add.dc_id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default Address;
