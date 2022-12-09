import React, { useState, useEffect } from "react";
import { ImFacebook } from "react-icons/im";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as customersApi from "../../api/customersApi";

function PasswordRetrieval() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      const getCustomers = await customersApi.get();
      setCustomers(getCustomers.customers);
    };
    fetchAPI();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let check = false;
    let tk_id = "";
    customers.forEach((customer) => {
      if (customer.kh_sdt === phone) {
        check = true;
        tk_id = customer.tk_id;
      }
    });

    if (check) {
      const data = {
        tk_matkhau: password,
      };
      await customersApi.PasswordRetrieval(tk_id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Đổi mật khẩu thành công");
      navigate("/login");
    } else {
      alert("Số điện thoại sai!");
    }
  };

  return (
    <Container>
      <Row>
        <Col className="col-6 mx-auto">
          <h1 className="mt-3 text-center">Quên mật khẩu</h1>
          <Form
            className="mt-5"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Label for="exampleAccount">Số điện thoại</Label>
              <Input
                id="exampleAccount"
                name="sdt"
                placeholder="Nhập sô điện thoại"
                type="text"
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Mật khẩu mới</Label>
              <Input
                id="examplePassword"
                name="p"
                placeholder="Nhập mật khẩu mới"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button className="bg-primary px-4 py-2">Gửi</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordRetrieval;
