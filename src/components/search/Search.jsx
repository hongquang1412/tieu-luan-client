import React, { useState, useEffect, useRef } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { TiDelete } from "react-icons/ti";
import { BiLoaderCircle } from "react-icons/bi";
import { BsMic, BsMicMute } from "react-icons/bs";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import ProductItem from "../productItem/ProductItem";
import { default as PopperWrapper } from "../popper/Wrapper";
import * as productsApi from "../../api/productsApi";
import { default as useDebounce } from "../../hooks/useDebounce";
function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 500);
  const [mic, setMic] = useState(false);

  // mic
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  useEffect(() => {
    setSearchValue(transcript);
  }, [transcript]);
  console.log(listening);
  useEffect(() => {
    const fetchApi = async () => {
      if (!debounced.trim()) {
        setSearchResult([]);
        return;
      }
      setLoading(true);
      const getProducts = await productsApi.search(debounced);
      setSearchResult(getProducts.products);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

  return (
    <HeadlessTippy
      interactive
      render={(attrs) => (
        <div className="search-result" tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <small className="search-title">Sản phẩm gợi ý</small>
            {searchResult?.map((result) => (
              <ProductItem
                key={result.sp_id}
                data={result}
                setShowResult={setShowResult}
              />
            ))}
          </PopperWrapper>
        </div>
      )}
      visible={showResult && searchResult.length > 0}
      onClickOutside={() => {
        setShowResult(false);
      }}
    >
      <div className="search">
        <input
          value={searchValue}
          ref={inputRef}
          type="text"
          name=""
          id=""
          required
          placeholder="Tìm kiếm sản phẩm"
          onChange={(e) => {
            const searchValue = e.target.value;
            if (!searchValue.startsWith(" ")) {
              setSearchValue(searchValue);
            }
          }}
          onFocus={(e) => {
            setShowResult(true);
          }}
        />
        {!!searchValue && !loading && (
          <button
            className="clear"
            onClick={() => {
              setSearchValue("");
              searchResult([]);
              inputRef.current.focus();
            }}
          >
            <TiDelete />
          </button>
        )}
        {loading && <BiLoaderCircle className="loading" />}
        <button
          onClick={() => {
            if (mic) {
              SpeechRecognition.stopListening();
              setMic(false);
            } else {
              startListening();
              setMic(true);
            }
          }}
          className="mic"
        >
          {listening ? <BsMicMute /> : <BsMic />}
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
