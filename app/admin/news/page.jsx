"use client";
import { useState, useEffect } from "react";
import "./news.css";
import "./news.media.css";
import addImg from "./img/add.svg";
import delImg from "./img/del.svg";
export default function News() {
  const [news, setNews] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);

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
     
      </div>
    </section>
  );
}
