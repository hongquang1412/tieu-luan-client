import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  List,
  ListInlineItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useParams, useSearchParams } from 'react-router-dom';
import CardProduct from "../../components/card/CardProduct";
function Category(direction) {
  // const { id } = useParams();
  // console.log(id);
  const [search, setSearch] = useSearchParams();
  const searchne = search.get("name") || "";
  console.log(searchne);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="content">
      <Container>
        <Row>
          <Col>
            <List type="inline">
              <ListInlineItem className="text-white">Tất cả</ListInlineItem>
              <ListInlineItem className="text-white">iPhone13</ListInlineItem>
              <ListInlineItem className="text-white"></ListInlineItem>
            </List>
          </Col>
        </Row>
        <Row>
          <Col>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction={direction}
              className="top-0 mb-3"
            >
              <DropdownToggle caret>Xếp theo</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Giá thấp đến cao</DropdownItem>
                <DropdownItem>Giá cao đến thấp</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3 col-4">
            <CardProduct
              img="https://cdn.tgdd.vn/Products/Images/42/230529/s16/iphone-13-pro-max-gold-650x650.png"
              title="iPhone 13 Pro Max 128GB"
              priceNew="27.590.000₫"
              priceOld="33.990.000₫"
              discount="-18%"
            />
          </Col>
          <Col className="mb-3 col-4">
            <CardProduct
              img="https://cdn.tgdd.vn/Products/Images/42/230529/s16/iphone-13-pro-max-gold-650x650.png"
              title="iPhone 13 Pro Max 128GB"
              priceNew="27.590.000₫"
              priceOld="33.990.000₫"
              discount="-18%"
            />
          </Col>
          <Col className="mb-3 col-4">
            <CardProduct
              img="https://cdn.tgdd.vn/Products/Images/42/230529/s16/iphone-13-pro-max-gold-650x650.png"
              title="iPhone 13 Pro Max 128GB"
              priceNew="27.590.000₫"
              priceOld="33.990.000₫"
              discount="-18%"
            />
          </Col>
          <Col className="mb-3 col-4">
            <CardProduct
              img="https://cdn.tgdd.vn/Products/Images/42/230529/s16/iphone-13-pro-max-gold-650x650.png"
              title="iPhone 13 Pro Max 128GB"
              priceNew="27.590.000₫"
              priceOld="33.990.000₫"
              discount="-18%"
            />
          </Col>
          <Col className="mb-3 col-4">
            <CardProduct
              img="https://cdn.tgdd.vn/Products/Images/42/230529/s16/iphone-13-pro-max-gold-650x650.png"
              title="iPhone 13 Pro Max 128GB"
              priceNew="27.590.000₫"
              priceOld="33.990.000₫"
              discount="-18%"
            />
          </Col>


        </Row>
      </Container>
    </div>
  );
}

export default Category;
