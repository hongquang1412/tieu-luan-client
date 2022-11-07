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
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import * as customersApi from "../../api/customersApi";
var bcrypt = require("bcryptjs");
function Login() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const clientId =
    "877073592238-vsv76jaieo73f1cpeipjafs1q4t5c6ij.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const getCustomers = await customersApi.get();
      setCustomers(getCustomers.customers);
    };
    fetchAPI();
  }, []);

  const responseFacebook = async (response) => {
    console.log(response);
    let checkExist = false;
    let kh_id;
    const tk_tentk = response.id;
    const kh_hoten = response.name;
    const data = {
      tk_tentk,
      tk_matkhau: "0",
      kh_hoten,
      kh_loai: "Facebook",
    };
    if (localStorage.getItem("infoCustomer") !== null) {
      localStorage.removeItem("infoCustomer");
    }

    customers.map((customer) => {
      if (customer.taikhoan?.tk_tentk === tk_tentk) {
        checkExist = true;
        kh_id = customer.kh_id;
      }
      return checkExist;
    });

    if (checkExist) {
      localStorage.setItem(
        "infoCustomer",
        JSON.stringify({
          kh_id,
          kh_hoten,
        })
      );
      alert("Đăng nhập thành công");
      navigate("/");
    } else {
      const id = await customersApi.post(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(id);
      localStorage.setItem(
        "infoCustomer",
        JSON.stringify({
          kh_id: id,
          kh_hoten,
        })
      );
      alert("Đăng nhập thành công");
      navigate("/");
    }
  };

  const responseGoogle = async (response) => {
    let kh_id;
    let checkExist = false;
    const tk_tentk = response.profileObj.googleId;
    const kh_hoten = response.profileObj.givenName;
    const data = {
      tk_tentk,
      tk_matkhau: "0",
      kh_hoten,
      kh_loai: "Google",
    };
    if (localStorage.getItem("infoCustomer") !== null) {
      localStorage.removeItem("infoCustomer");
    }

    customers.map((customer) => {
      console.log("customer.taikhoan?.tk_tentk: ", customer.taikhoan?.tk_tentk);
      console.log("tk_tentk: ", tk_tentk);
      if (customer.taikhoan?.tk_tentk === tk_tentk) {
        checkExist = true;
        kh_id = customer.kh_id;
      }
      return checkExist;
    });

    if (checkExist) {
      localStorage.setItem(
        "infoCustomer",
        JSON.stringify({
          kh_id,
          kh_hoten,
        })
      );
      alert("Đăng nhập thành công");
      navigate("/");
    } else {
      const id = await customersApi.post(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("id nè", id);
      localStorage.setItem(
        "infoCustomer",
        JSON.stringify({
          kh_id: id,
          kh_hoten,
        })
      );
      alert("Đăng nhập thành công");
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let check = false;
    let kh_id = "";
    let kh_hoten = "";
    if (localStorage.getItem("infoCustomer") !== null) {
      localStorage.removeItem("infoCustomer");
    }
    customers.map((customer) => {
      const account = customer.taikhoan;
      if (account) {
        if (
          account.tk_tentk === accountName &&
          bcrypt.compareSync(password, account.tk_matkhau)
        ) {
          check = true;
          kh_id = customer.kh_id;
          kh_hoten = customer.kh_hoten;
        }
      }
      return check;
    });
    if (check) {
      localStorage.setItem(
        "infoCustomer",
        JSON.stringify({
          kh_id,
          kh_hoten,
        })
      );
      alert("Đăng nhập thành công");
      navigate("/");
    } else {
      alert("Tài khoản hoặc mật khẩu sai!!!");
    }
  };

  return (
    <Container>
      <Row>
        <Col className="col-6 mx-auto">
          <h1 className="mt-3 text-center">Đăng nhập</h1>
          <Form
            className="mt-5"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Label for="exampleAccount">Tên tài khoản</Label>
              <Input
                id="exampleAccount"
                name="u"
                placeholder="Nhập tên tài khoản"
                type="text"
                required
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Mật khẩu</Label>
              <Input
                id="examplePassword"
                name="p"
                placeholder="Nhập mật khẩu"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button className="bg-primary px-4 py-2">Đăng nhập</Button>
            </div>
          </Form>
          <p className="text-center fs-5">or</p>
          <div className="d-flex justify-content-center mt-3">
            <FacebookLogin
              className="border border-primary"
              appId="480342590679833"
              fields="name,email,picture"
              textButton="&nbsp;&nbsp;ĐĂNG NHẬP VỚI FACEBOOK"
              callback={responseFacebook}
              cssClass="btnFacebook"
              icon={<ImFacebook />}
            />
            &nbsp;&nbsp;
            <GoogleLogin
              className="btnGoogle"
              clientId={clientId}
              buttonText="ĐĂNG NHẬP VỚI GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
