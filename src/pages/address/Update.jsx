import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as addressApi from "../../api/addressApi";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [add, setAdd] = useState([])
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const getAddress = await addressApi.get(id);
      setAdd(getAddress.address[0]);
    };
    fetchApi();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      dc_diachi: address,
    };
    if (form.checkValidity()) {
      await addressApi.patch(id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Cập nhật địa chỉ thành công");
      navigate("/address");
    }
  };

  return (
    <Col className="col-4">
      <h2>Cập nhật địa chỉ</h2>
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
                defaultValue={add?.dc_diachi}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button className="bg-primary px-4 py-2">Cập nhật</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}

export default Update;
