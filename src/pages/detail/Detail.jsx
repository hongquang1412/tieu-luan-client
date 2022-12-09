import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import vi from "moment/locale/vi";
import * as productsApi from "../../api/productsApi";
import * as commentsApi from "../../api/commentsApi";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  // state
  const [product, setProduct] = useState([]);
  const [selected, setSelected] = useState(0);
  const [prices, setPrices] = useState([]);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [nameColor, setNameColor] = useState("");
  const [colorSeleted, setColorSeleted] = useState([]);
  const [nameCapacity, setNameCapacity] = useState("");
  const [capacitySelected, setCapacitySelected] = useState([]);
  const [render, setRender] = useState(false);
  const [comments, setComments] = useState([]);
  const [idCmt, setIdCmt] = useState("");
  const [contentCmt, setContentCmt] = useState("");
  const [contentCmtEdit, setContentCmtEdit] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getProduct = await productsApi.get(id);
      setProduct(getProduct.products[0]);
      setCapacities(getProduct.products[0].dungluongs);
      setPrices(getProduct.products[0].giatiens);
      // setPrice(getProduct.products[0].dungluongs[0].giatien.gt_gia);
      setPrice(getProduct.products[0].giatiens[0].gt_gia);
      setNameColor(getProduct.products[0].mausacs[0].ms_mau);
      setColorSeleted([
        {
          id: getProduct.products[0].mausacs[0].ms_id,
          color: getProduct.products[0].mausacs[0].ms_mau,
        },
      ]);
      setNameCapacity(
        getProduct.products[0].giatiens[0].dungluong.dl_dungluong
      );
      setCapacitySelected([
        {
          id: getProduct.products[0].giatiens[0].dungluong.dl_id,
          capacity: getProduct.products[0].giatiens[0].dungluong.dl_dungluong,
        },
      ]);
      setImages(
        getProduct.products[0].hinhs.map((img) => ({
          original: `http://127.0.0.1:8887/${img.h_ten}`,
          thumbnail: `http://127.0.0.1:8887/${img.h_ten}`,
        }))
      );
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    setPrice(prices[parseInt(selected)]?.gt_gia);
  }, [selected]);

  useEffect(() => {
    const fetchApi = async () => {
      const getComments = await commentsApi.get(id);
      setComments(getComments.comments);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  // tính gia san pham sau khi giam
  let productPriceNew = 0;
  if (product.giam?.g_phantram !== 0) {
    productPriceNew =
      parseInt(price) * ((100 - parseInt(product.giam?.g_phantram)) / 100);
  }

  // gio hang
  const handleAddCart = () => {
    const quantityAvailable = product.sp_soluong;
    if (quantityAvailable > 0) {
      let carts = [];
      const productId = id;
      const productName = product.sp_ten;
      const productImg = images[0].original;
      const productPrice = parseInt(price);
      const productCapacity = capacitySelected;
      const productColor = colorSeleted;
      const productQuantity = 1;

      const getCarts = localStorage.getItem("carts");
      if (getCarts) {
        carts = JSON.parse(getCarts);
      }

      const item = carts.find((cart) => {
        return (
          cart.productName === productName &&
          cart.productColor[0].id === productColor[0].id &&
          cart.productCapacity[0].id === productCapacity[0].id
        );
      });

      if (item) {
        item.productQuantity = item.productQuantity + 1;
      } else {
        carts = [
          ...carts,
          {
            productId,
            productName,
            productImg,
            productPrice,
            productPriceNew,
            productCapacity,
            productColor,
            productQuantity,
            quantityAvailable,
          },
        ];
      }
      localStorage.setItem("carts", JSON.stringify(carts));
      navigate("/cart");
    } else {
      alert("Sản phẩm hiện hết hàng");
    }
  };

  const handleAddCmt = async (e) => {
    e.preventDefault();
    const account = JSON.parse(localStorage.getItem("infoCustomer"));
    if (account) {
      const data = {
        sp_id: id,
        kh_id: account.kh_id,
        bl_noidung: contentCmt,
      };
      await commentsApi.post(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setContentCmt("");
      setRender(true);
    } else {
      alert("Vui lòng đăng nhập");
      navigate("/login");
    }
  };

  const handleEditCmt = async (e) => {
    e.preventDefault();
    const data = {
      bl_noidung: contentCmtEdit,
    };
    await commentsApi.patch(idCmt, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setEdit(false);
    setRender(true);
  };

  const handleDeleteCmt = async (e) => {
    const confirm = window.confirm("Bạn có muốn xóa không!");
    if (confirm) {
      const id = e.target.dataset.id;
      await commentsApi._delete(id);
      setRender(true);
    }
  };

  return (
    <Container fluid className="content">
      <Row className="mb-4">
        <Col className="col-6">
          {images ? <ImageGallery items={images} /> : <p>Hình đang cập nhật</p>}
        </Col>
        <Col className="col-1"></Col>
        <Col className="col-4 text-white">
          <h1 className="text-light">{product.sp_ten}</h1>
          {productPriceNew !==0 ? (
            <div className="mb-3">
              {price ? (
                <>
                  <span className="fs-3">
                    {productPriceNew?.toLocaleString("VND", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <span className="fs-3 ms-3 text-decoration-line-through">
                    {parseInt(price)?.toLocaleString("VND", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </>
              ) : (
                <span className="fs-3">Đang cập nhật</span>
              )}
              <span className="fs-4 ms-3">-{product.giam?.g_phantram}%</span>
            </div>
          ) : (
            <div className="mb-3">
              <span className="fs-3 ms-3">
                {price
                  ? parseInt(price)?.toLocaleString("VND", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "Đang cập nhật"}
              </span>
            </div>
          )}

          <div>
            <h3 className="mb-3">Dung lượng: {nameCapacity}</h3>
            {prices?.map((price, index) => (
              <Button
                key={index}
                className="btn-capacity"
                onClick={(e) => {
                  setSelected(index);
                  setCapacitySelected([
                    {
                      id: price.dungluong.dl_id,
                      capacity: price.dungluong.dl_dungluong,
                    },
                  ]);
                  setNameCapacity(price.dungluong.dl_dungluong);
                }}
              >
                {price.dungluong.dl_dungluong}
              </Button>
            ))}
          </div>
          <div>
            <h3 className="my-3">Màu sắc: {nameColor}</h3>
            {product.mausacs?.map((color, index) => (
              <Button
                key={index}
                className="color me-2"
                style={{ backgroundColor: color.ms_ma }}
                onClick={(e) => {
                  setColorSeleted([
                    {
                      id: color.ms_id,
                      color: color.ms_mau,
                    },
                  ]);
                  setNameColor(color.ms_mau);
                }}
              ></Button>
            ))}
          </div>
          <Button
            color="primary"
            block
            className="mt-3"
            onClick={handleAddCart}
          >
            Thêm vào giỏ hàng
          </Button>
        </Col>
      </Row>
      <Row className="pt-4 bg-white">
        <Col className="col-6 mx-auto">
          <h3 className="text-center">Thông số kĩ thuật</h3>
          <Table bordered>
            <tbody>
              {product.sp_mota?.split("..").map((a1) => (
                <tr>
                  {a1.split(":").map((a) => (
                    <td>{a}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="pt-4 bg-white">
        <Col className="col-6 mx-auto">
          <h3>Bình luận sản phẩm</h3>
          <Form
            className="mb-4"
            onSubmit={(e) => {
              handleAddCmt(e);
            }}
          >
            <Row className="align-items-end">
              <Col className="col-8">
                <Input
                  id="exampleText"
                  name="text"
                  type="textarea"
                  rows="3"
                  required
                  placeholder="Nhập bình luận"
                  onChange={(e) => {
                    setContentCmt(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Button color="primary">Bình luận</Button>
              </Col>
            </Row>
          </Form>

          {comments.map((cmt, index) => (
            <Row key={index}>
              <p className="mb-1">
                <b>{cmt.khachhang.kh_hoten}</b>
              </p>
              {edit && cmt.bl_id === parseInt(idCmt) ? (
                <Form
                  onSubmit={(e) => {
                    handleEditCmt(e);
                  }}
                >
                  <FormGroup>
                    <Input
                      type="textarea"
                      defaultValue={contentCmtEdit}
                      onChange={(e) => {
                        setContentCmtEdit(e.target.value);
                      }}
                    ></Input>
                    <Button color="primary" className="mt-2">
                      Xong
                    </Button>
                    <Button
                      color="secondary"
                      className="mt-2 ms-3"
                      onClick={(e) => {
                        setEdit(false);
                      }}
                    >
                      Hủy
                    </Button>
                  </FormGroup>
                </Form>
              ) : (
                <p className="mb-1">{cmt.bl_noidung}</p>
              )}

              <div className="d-flex mb-2">
                <p className="mb-0 me-3">
                  {moment(cmt.bl_ngaytao).locale("vi", vi).fromNow()}
                </p>

                {account?.kh_id === cmt.kh_id && (
                  <>
                    <NavLink
                      to="#"
                      data-id={cmt.bl_id}
                      className="me-3"
                      onClick={(e) => {
                        setEdit(true);
                        setIdCmt(e.target.dataset.id);
                        setContentCmtEdit(cmt.bl_noidung);
                      }}
                    >
                      Chỉnh sửa
                    </NavLink>

                    <NavLink
                      to="#"
                      data-id={cmt.bl_id}
                      className="me-3"
                      onClick={(e) => {
                        handleDeleteCmt(e);
                      }}
                    >
                      Xóa
                    </NavLink>
                  </>
                )}
              </div>
              <hr />
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
