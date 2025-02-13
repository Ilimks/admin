"use client";

import './news.css';
import './news.media.css';
import addImg from './img/add.svg';
import delImg from './img/del.svg';
import axios from 'axios';
import { useState } from 'react';

export default function News({ initialNews }) {
  const [selectedNews, setSelectedNews] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);
  const [news, setNews] = useState(initialNews || []);

  const handleSelectNews = (id) => {
    setSelectedNews((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((newsId) => newsId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteNews = async () => {
    if (selectedNews.length === 0) return;
    try {
      await Promise.all(
        selectedNews
          .filter((id) => id)
          .map((id) => axios.delete(`https://ades.kg:8086/news/delete/${id}`))
      );
      setNews((prevNews) => prevNews.filter((n) => n.id && !selectedNews.includes(n.id)));
      setSelectedNews([]);
      setOpenSelect(false);
    } catch (error) {
      console.error('Ошибка при удалении новостей:', error);
    }
  };

  return (
    <section id="news">
      <div className="container">
        <div className="news__box">
          <div className="news__box__header">
            <h2>Новости</h2>
            <div className="news__box__header-buttons">
              {openSelect ? (
                <button onClick={() => { setOpenSelect(false); setSelectedNews([]); }}>
                  Отменить
                </button>
              ) : (
                <button>Добавить новость</button>
              )}

              <button
                onClick={() => (openSelect ? handleDeleteNews() : setOpenSelect(true))}
                className={`delete-button ${openSelect && selectedNews.length > 0 ? 'active' : ''}`}
                disabled={openSelect && selectedNews.length === 0}
              >
                {openSelect ? 'Удалить' : 'Выбрать'}
              </button>
            </div>

            <div className="news__box__header-buttons__mobile">
              {openSelect ? (
                <button onClick={() => { setOpenSelect(false); setSelectedNews([]); }}>
                  ✖
                </button>
              ) : (
                <button><img src={addImg.src} alt="Добавить" /></button>
              )}
              <button
                onClick={() => (openSelect ? handleDeleteNews() : setOpenSelect(true))}
                className={`delete-button ${openSelect && selectedNews.length > 0 ? 'active' : ''}`}
                disabled={openSelect && selectedNews.length === 0}
              >
                <img src={delImg.src} alt="Удалить" />
              </button>
            </div>
          </div>
          <div className="news__box__content">
            {news.length > 0 ? (
              news.map((el, idx) => (
                <div className="news__box__content-card" key={idx}>
                  {openSelect && (
                    <input
                      type="checkbox"
                      checked={selectedNews.includes(el.id)}
                      onChange={() => handleSelectNews(el.id)}
                      className="select_checkbox"
                    />
                  )}
                  <img src={`https://ades.kg:8086/${el.cover}`} alt="" />
                  <p>{el.title}</p>
                </div>
              ))
            ) : (
              <p>Новостей нет</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
