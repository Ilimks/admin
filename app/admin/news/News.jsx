"use client";

import './news.css';
import './news.media.css';
import addImg from './img/add.svg';
import delImg from './img/del.svg';
import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { mutate } from 'swr';
import vector from "./img/Vector.svg";
import icon from "./img/Icon .svg";
import icon1 from "./img/Icon1.svg";
import vector2 from "./img/vector2.svg";
import Image from 'next/image';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function News({ initialNews }) {
  const [selectedNews, setSelectedNews] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const { data: news = initialNews, error } = useSWR('https://ades.kg:8086/news/getAllNews', fetcher, {
    fallbackData: initialNews,
    revalidateOnFocus: false,  
    refreshInterval: 3600 * 1000, 
  });

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
      setSelectedNews([]);
      setOpenSelect(false);
      mutate('https://ades.kg:8086/news/getAllNews');
    } catch (error) {
      console.error('Ошибка при удалении новостей:', error);
    }
  };

  if (error) return <p>Ошибка при загрузке новостей</p>;

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleModalFile = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
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
            
          <div className="news__box__content-uploadFiles">
            {isModalOpen? (
              <>
                <div className="news__box__content-uploadFiles__cards">
                  <div className="news__box__content-uploadFiles__card">
                    <h4>В китае</h4>
                    <label className='upload-container' htmlFor="fileInput">
                          <input id="fileInput" className='c__news__form__img' type="file" accept="xlsx/*"/>
                          <span className="c__news__form__img__upload">Добавить обложку</span>
                        </label>
                  </div>
                  <div className="news__box__content-uploadFiles__card">
                    <h4>В Кыргызстане</h4>
                    <label className='upload-container' htmlFor="fileInput">
                          <input id="fileInput" className='c__news__form__img' type="file" accept="xlsx/*" />
                          <span className="c__news__form__img__upload">Добавить обложку</span>
                        </label>
                  </div>
                </div>
                <button>Отправить</button>
              </> 
            ): ""}
          </div>
        
          <div className="news__box-vectors">
            <div
              className={`news__box-vector ${showOptions ? "open" : ""}`} 
              onClick={toggleOptions} 
            >
              <Image
                src={showOptions? vector2: vector}
                alt="vector"
              />
            </div>

            {showOptions && (
              <div className="news__options show">
                <button className="news__options-btn" onClick={toggleModalFile}>
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
      </div>

      {isModalOpen && (
        <div className="overlay" onClick={toggleModalFile}></div>
      )}
    </section>
  );
}
