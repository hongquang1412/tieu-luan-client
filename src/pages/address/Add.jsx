import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as addressApi from "../../api/addressApi";
function Add() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  console.log(account.kh_id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      kh_id: account?.kh_id,
      dc_diachi: address,
    };
    if (form.checkValidity()) {
      await addressApi.post(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Thêm địa chỉ thành công");
      navigate("/address");
    }
  };
  return (
    <Col className="col-4">
      <h2>Thêm địa chỉ</h2>
      <Row>
        <Col>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Label for="exampleAccount">Địa chỉ</Label>
              <Input
                id="exampleAccount"
                name="u"
                placeholder="Nhập địa chỉ"
                type="text"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button className="bg-primary px-4 py-2">Thêm</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}

export default Add;
