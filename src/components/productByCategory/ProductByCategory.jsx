import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Container, CardGroup } from "reactstrap";
import CardProduct from "../../components/card/CardProduct";
import * as categoriesApi from "../../api/categoriesApi";
function ProductByCategory({ categoryName }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const getProducts = await categoriesApi.getByName(categoryName);
      setProducts(getProducts.categories[0].sanphams);
    };
    fetchApi();
  }, [categoryName]);
  return (
    <div className="productByCategory">
      <p className="text-white text-center fs-2">{categoryName}</p>
      <div>
        <CardGroup className="productByCategory__cardProduct mt-3 mb-5">
          <Container fluid className="px-5">
            <Slider {...settings} className="ml-1">
              {products.map((product) => (
                <CardProduct
                  id={product.sp_id}
                  img={`http://127.0.0.1:8887/${product.hinhs[0]?.h_ten}`}
                  title={`${product.sp_ten}  ${product.dungluongs[0].dl_dungluong}GB`}
                  price={product.dungluongs[0]?.giatien.gt_gia}
                  discount={product.giam?.g_phantram}
                />
              ))}
            </Slider>
          </Container>
        </CardGroup>
      </div>
    </div>
  );
}

export default ProductByCategory;
