import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import CardProductCart from "../../components/card/CardProductCart";
import * as addressApi from "../../api/addressApi";
import * as ordersApi from "../../api/ordersApi";
import toast, { Toaster } from "react-hot-toast";
function Cart() {
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [addressSelect, setAddressSelect] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [carts, setCarts] = useState([]);
  const [render, setRender] = useState(false);
  const notify = () => toast.success("Successfully created!");
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  const kh_id = account.kh_id;
  const kh_hoten = account.kh_hoten;
  useEffect(() => {
    setCarts(JSON.parse(localStorage.getItem("carts")));
    setRender(false);
  }, [render]);

  useEffect(() => {
    const fetchApi = async () => {
      const getAddress = await addressApi.getByCustomerId(kh_id);
      setAddress(getAddress.address);
      setAddressSelect(getAddress.address[0].dc_diachi);
    };
    fetchApi();
  }, [kh_id]);

  let total = 0;
  if (carts) {
    carts.map((cart) => {
      if (cart.productPriceNew !== 0) {
        total += cart.productPriceNew * cart.productQuantity;
      } else {
        total += cart.productPrice * cart.productQuantity;
      }
      return total;
    });
  }

  const handleCheckOut = async () => {
    let detailOrders = [];
    let addressne = "";
    // check dia chi
    if (addressInput !== "") {
      addressne = addressInput;
    } else {
      addressne = addressSelect;
    }

    carts.forEach((cart) => {
      detailOrders = [
        ...detailOrders,
        {
          sp_id: cart.productId,
          sp_hoten: cart.productName,
          ctdh_soluong: cart.productQuantity,
          ctdh_dongia:
            cart.productPriceNew !== 0
              ? cart.productPriceNew
              : cart.productPrice,
          ctdh_mausac: cart.productColor[0].color,
          ctdh_dungluong: cart.productCapacity[0].capacity,
          sp_soluong: cart.quantityAvailable,
        },
      ];
    });

    const data = {
      kh_id,
      kh_hoten,
      dh_diachigh: addressne,
      dh_thanhtien: total,
      detailOrders: JSON.stringify(detailOrders),
    };
    console.log(data);
    await addressApi.post(
      { kh_id, dc_diachi: addressne },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await ordersApi.post(data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("carts");
    alert("Đặt hàng thành công");
    navigate("/");
  };

  return (
    <Container className="cart">
      <Row className="mt-4 justify-content-between">
        <Col className="col-5">
          <NavLink to="/" className="text-dark text-decoration-none">
            <IoChevronBackOutline />
            Mua thêm sản phẩm khác
          </NavLink>
        </Col>
        <Col className="col-3">
          <p>Giỏ hàng của bạn</p>
        </Col>
      </Row>
      {carts !== null || carts?.length === 0 ? (
        <div className="cart__content">
          {carts.map((cart, index) => (
            <CardProductCart
              key={index}
              idItem={index}
              id={cart.productId}
              img={cart.productImg}
              name={cart.productName}
              discount={cart.productPriceNew ? cart.productPriceNew : 0}
              price={cart.productPrice}
              color={cart.productColor[0].color}
              capacity={cart.productCapacity[0].capacity}
              quantity={cart.productQuantity}
              carts={carts}
              setRender={setRender}
            />
          ))}
          <div className="cart__content-address">
            {address.length !== 0 && (
              <Row>
                <Col className="col-8">
                  <FormGroup>
                    <Label for="exampleSelect">Chọn địa chỉ giao hàng:</Label>
                    <br />
                    <select
                      className="p-1"
                      id="exampleSelect"
                      name="select"
                      type="select"
                      onChange={(e) => {
                        setAddressSelect(e.target.value);
                      }}
                    >
                      {address?.map((add, index) => (
                        <option key={index} value={add.dc_diachi}>
                          {add.dc_diachi}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>
              </Row>
            )}

            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleSelect">Nhập địa chỉ giao hàng:</Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setAddressInput(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>

          <div className="cart__content-total">
            <Row className="justify-content-between">
              <Col className="col-5">
                <strong>Tổng tiền: </strong>
              </Col>
              <Col className="col-3">
                <strong className="text-danger">
                  {total.toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
              </Col>
            </Row>
          </div>
          <Row>
            <Col className="col-12">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleCheckOut}
              >
                Đặt hàng
              </button>
            </Col>
          </Row>
        </div>
      ) : (
        <h3 className="text-center">Giỏ hàng rỗng</h3>
      )}
    </Container>
  );
}

export default Cart;
