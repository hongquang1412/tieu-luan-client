import React, { useState, useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { IoShieldOutline } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import Banner from "../../components/banner/Banner";
import CardCategory from "../../components/card/CardCategory";
import { CardGroup } from "reactstrap";
import ProductByCategory from "../../components/productByCategory/ProductByCategory";
import * as categoriesApi from "../../api/categoriesApi";
function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const getCategories = await categoriesApi.get();
      setCategories(getCategories.categories);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Banner />
      <ul className="policy d-flex justify-content-between">
        <li className="d-flex flex-column align-items-center">
          <BsCheck2Circle className="fs-1 text-white mb-2" />
          <span className="text-white">
            Mẫu mã đa dạng, <br /> chính hãng
          </span>
        </li>
        <li className="d-flex flex-column align-items-center">
          <FaCarSide className="fs-1 text-white mb-2" />
          <span className="text-white">Giao hàng toàn quốc</span>
        </li>
        <li className="d-flex flex-column align-items-center">
          <IoShieldOutline className="fs-1 text-white mb-2" />
          <span className="text-white">Bảo hành có cam kết tới 12 tháng</span>
        </li>
        <li className="d-flex flex-column align-items-center">
          <RiArrowGoBackLine className="fs-1 text-white mb-2" />
          <span className="text-white">Có thể đổi trả</span>
        </li>
      </ul>

      <div className="content">
        <CardGroup className="justify-content-around mb-5">
          {categories.map((category, index) => (
              <CardCategory
                key={index}
                img={`http://127.0.0.1:8887/${category.l_hinh}`}
                title={category.l_ten}
              />
          ))}
        </CardGroup>
        {categories.map((category, index) => (
          <ProductByCategory categoryName={category.l_ten} />
        ))}
      </div>
    </>
  );
}

export default Home;
