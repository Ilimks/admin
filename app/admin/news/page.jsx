"use client";
import { useState, useEffect } from "react";
import "./news.css";
import "./news.media.css";
import Image from 'next/image';
import addImg from "./img/add.svg";
import delImg from "./img/del.svg";
import vector from "./img/Vector.svg";
import icon from "./img/Icon .svg";
import icon1 from "./img/Icon1.svg";
import vector2 from "./img/vector2.svg";

export default function News() {
  const [news, setNews] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);
  const [showOptions, setShowOptions] = useState(false); 

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("https://ades.kg:8086/news/getAllNews", {
          cache: "no-store",
        });
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      }
    }
    fetchNews();
  }, []);

  const handleSelectNews = (id) => {
    setSelectedNews((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteNews = () => {
    console.log("Удаление новостей:", selectedNews);
    setNews(news.filter((el) => !selectedNews.includes(el.id)));
    setSelectedNews([]);
    setOpenSelect(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <section id="news">
      <div className="container">
        <div className="news__box">
          <div className="news__box__header">
            <h2>Новости</h2>
            <div className="news__box__header-buttons">
              <button>Добавить новость</button>
              <button
                onClick={() =>
                  openSelect ? handleDeleteNews() : setOpenSelect(true)
                }
                className={`delete-button ${
                  openSelect && selectedNews.length > 0 ? "active" : ""
                }`}
                disabled={openSelect && selectedNews.length === 0}
              >
                {openSelect ? "Удалить" : "Выбрать"}
              </button>
            </div>
          </div>

          <div className="news__box__content">
            {news.length > 0 ? (
              news.map((el) => (
                <div className="news__box__content-card" key={el.id}>
                  {openSelect && (
                    <input
                      type="checkbox"
                      checked={selectedNews.includes(el.id)}
                      onChange={() => handleSelectNews(el.id)}
                      className="select_checkbox"
                    />
                  )}
                  <img src={`https://ades.kg:8086/${el.cover}`} alt={el.title} />
                  <p>{el.title}</p>
                </div>
              ))
            ) : (
              <p>Новостей пока нет</p>
            )}
          </div>
        </div>

        <div className="news__box-vectors">
          <div
            className={`news__box-vector ${showOptions ? "open" : ""}`} 
            onClick={toggleOptions} 
          >
            <Image
              src={vector}
              alt="vector"
            />
          </div>

          {showOptions && (
            <div className="news__options show">
              <button className="news__options-btns">
                <Image className="news__options-img" src={icon} alt="icon" />
                Добавить файл
              </button>
              <button className="news__options-btn">
                <Image className="news__options-img" src={icon1} alt="icon" />
                Добавить новость
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}




