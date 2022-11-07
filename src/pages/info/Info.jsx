import React, { useState, useEffect } from "react";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as customersApi from "../../api/customersApi";

function Info() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  const kh_id = account.kh_id;
  useEffect(() => {
    const fetchApi = async () => {
      const getCustomer = await customersApi.get(kh_id);
      setCustomer(getCustomer.customers[0]);
    };
    fetchApi();
  }, [kh_id]);

  useEffect(() => {
    setName(customer.kh_hoten);
    setEmail(customer.kh_email);
    setPhone(customer.kh_sdt);
  }, [customer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      kh_hoten: name,
      kh_email: email,
      kh_sdt: phone,
    };

    if (form.checkValidity()) {
      await customersApi.patch(kh_id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (name !== customer.kh_hoten) {
        localStorage.removeItem("infoCustomer");
        localStorage.setItem(
          "infoCustomer",
          JSON.stringify({
            kh_id,
            kh_hoten: name,
          })
        );
      }
      alert("Cập nhật thông tin thành công");
      navigate("/info");
    }
  };
  return (
    <Col className="col-4 py-3 mx-auto">
      <h3 className="text-center">Thông tin cá nhân</h3>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormGroup>
          <Label for="exampleAccount">Họ tên</Label>
          <Input
            id="exampleAccount"
            name="u"
            placeholder="Nhập họ tên"
            type="text"
            required
            defaultValue={customer.kh_hoten}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleAccount">Email</Label>
          <Input
            id="exampleAccount"
            name="u"
            placeholder="Nhập email"
            type="email"
            required
            defaultValue={customer.kh_email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleAccount">Số điện thoại</Label>
          <Input
            id="exampleAccount"
            name="u"
            placeholder="Nhập số điện thoại"
            type="text"
            required
            maxLength="11"
            defaultValue={customer.kh_sdt}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button className="bg-primary px-4 py-2">Cập nhật</Button>
        </div>
      </Form>
    </Col>
  );
}

export default Info;
