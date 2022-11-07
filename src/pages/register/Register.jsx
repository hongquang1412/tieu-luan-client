import React, { useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import * as customersApi from "../../api/customersApi";
function Register() {
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      tk_tentk: accountName,
      tk_matkhau: password,
      kh_hoten: "khách hàng mới",
      kh_loai: "Thường",
    };

    if (form.checkValidity()) {
      if (password !== rePassword) {
        alert("Mật khẩu nhập lại không trùng");
      } else {
        const id = await customersApi.post(data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        localStorage.setItem(
          "infoCustomer",
          JSON.stringify({
            kh_id: id,
            kh_hoten: data.kh_hoten,
          })
        );
        alert("Đăng ký thành công");
        navigate("/");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col className="col-6 mx-auto">
          <h1 className="text-center mt-3">Đăng ký</h1>
          <Form onSubmit={(e) => handleSubmit(e)} className="mt-5">
            <FormGroup>
              <Label for="exampleUserName">Tên tài khoản</Label>
              <Input
                id="exampleUserName"
                name="userName"
                placeholder="Nhập tên tài khoản"
                type="text"
                required
                maxLength={20}
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleUserName">Mật khẩu</Label>
              <Input
                id="exampleUserName"
                name="userName"
                placeholder="Nhập mật khẩu"
                type="password"
                maxLength={10}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleUserName">Nhập lại mật khẩu</Label>
              <Input
                id="exampleUserName"
                name="userName"
                placeholder="Nhập lại mật khẩu"
                type="password"
                required
                maxLength={10}
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
              />
            </FormGroup>

            <div className="d-flex justify-content-center">
              <Button color="primary px-4 py-2">Đăng ký</Button>
            </div>
            <div className="mt-3">
              <span>Bạn đã có tài khoản? </span>
              <NavLink to="/login">Đăng nhập</NavLink>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
