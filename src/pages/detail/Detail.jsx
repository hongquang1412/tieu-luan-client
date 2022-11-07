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
import * as productsApi from "../../api/productsApi";
import * as commentsApi from "../../api/commentsApi";

function Detail() {
  const { id } = useParams();
  const account = JSON.parse(localStorage.getItem("infoCustomer"));
  const kh_id = account.kh_id;
  const navigate = useNavigate();
  // state
  const [product, setProduct] = useState([]);
  const [selected, setSelected] = useState(0);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [colorSeleted, setColorSeleted] = useState([]);
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
      setPrice(getProduct.products[0].dungluongs[0].giatien.gt_gia);
      setColorSeleted([
        {
          id: getProduct.products[0].mausacs[0].ms_id,
          color: getProduct.products[0].mausacs[0].ms_mau,
        },
      ]);
      setCapacitySelected([
        {
          id: getProduct.products[0].dungluongs[0].dl_id,
          capacity: getProduct.products[0].dungluongs[0].dl_dungluong,
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
    setPrice(capacities[parseInt(selected)]?.giatien?.gt_gia);
  }, [selected]);

  useEffect(() => {
    const fetchApi = async () => {
      const getComments = await commentsApi.get(id);
      setComments(getComments.comments);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  // gio hang
  const productPriceNew =
    parseInt(price) * ((100 - parseInt(product.giam?.g_phantram)) / 100);
  const handleAddCart = () => {
    const quantityAvailable = product.kho?.k_soluong;
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
    const data = {
      sp_id: id,
      kh_id,
      bl_noidung: contentCmt,
    };
    await commentsApi.post(data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setContentCmt("");
    setRender(true);
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
    const id = e.target.dataset.id;
    await commentsApi._delete(id);
    setRender(true);
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
          {product.giam?.g_phantram ? (
            <div className="mb-3">
              {price ? (
                <>
                  <span className="fs-3">
                    {productPriceNew.toLocaleString("VND", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <span className="fs-3 ms-3 text-decoration-line-through">
                    {parseInt(price).toLocaleString("VND", {
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
                  ? parseInt(price).toLocaleString("VND", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "Đang cập nhật"}
              </span>
            </div>
          )}

          <div>
            <h3 className="mb-3">Dung lượng:</h3>
            {capacities?.map((capacity, index) => (
              <Button
                key={index}
                className="me-2"
                onClick={(e) => {
                  setSelected(index);
                  setCapacitySelected([
                    {
                      id: capacity.dl_id,
                      capacity: capacity.dl_dungluong,
                    },
                  ]);
                }}
              >
                {capacity.dl_dungluong}GB
              </Button>
            ))}
          </div>
          <div>
            <h3 className="my-3">Màu sắc: </h3>
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
            Mua ngay
          </Button>
        </Col>
      </Row>
      <Row className="pt-4 bg-white">
        <Col className="col-6 mx-auto">
          <h3 className="text-center">Thông số kĩ thuật</h3>
          <Table bordered>
            <tbody>
              {/* {string.split(".").map((a1) => (
                  <tr>
                    {a1.split(":").map((a) => (
                      <td>{a}</td>
                    ))}
                  </tr>
                ))} */}
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
              {edit ? (
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
                  {moment(cmt.createdAt).format("DD/MM/YYYY")}
                </p>
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