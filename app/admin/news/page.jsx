'use client'
import './news.css'
import './news.media.css'
import addImg from './img/add.svg'
import delImg from './img/del.svg'
import { useEffect, useState } from 'react'
import axios from 'axios' 

export default function News() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("https://ades.kg:8086/news/getAllNews", {
          cache: "no-store", 
        });
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    }
    fetchNews();
  }, []); 

  const handleSelectNews = (id) => {
    setSelectedNews(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(newsId => newsId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteNews = async () => {
    if (selectedNews.length === 0) return;
    try {
      await Promise.all(
        selectedNews
          .filter(id => id) // Фильтруем, чтобы не было undefined/null
          .map(id => axios.delete(`https://ades.kg:8086/news/delete/${id}`))
      );

      setNews(prevNews => prevNews.filter(n => n.id && !selectedNews.includes(n.id))); 
      setSelectedNews([]);
      setOpenSelect(false); 
    } catch (error) {
      console.error("Ошибка при удалении новостей:", error);
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
                onClick={() => openSelect ? handleDeleteNews() : setOpenSelect(true)} 
                className={`delete-button ${openSelect && selectedNews.length > 0 ? "active" : ""}`}
                disabled={openSelect && selectedNews.length === 0} 
              >
                {openSelect ? "Удалить" : "Выбрать"}
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
                onClick={() => openSelect ? handleDeleteNews() : setOpenSelect(true)} 
                className={`delete-button ${openSelect && selectedNews.length > 0 ? "active" : ""}`}
                disabled={openSelect && selectedNews.length === 0}
              >
                <img src={delImg.src} alt="Удалить" />
              </button>
            </div>
          
          </div>

          
          <div className="news__box__content">
            {news.map((el, idx) => (
              <div className="news__box__content-card" key={el.id || idx}>
                {openSelect && (
                  <input 
                    type="checkbox" 
                    checked={selectedNews.includes(el.id)}
                    onChange={() => handleSelectNews(el.id)}
                    className='select_checkbox'
                  />
                )}
                <img src={`https://ades.kg:8086/${el.cover}`} alt={el.title} />
                <p>{el.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
