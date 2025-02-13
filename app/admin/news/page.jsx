import './news.css'
import './news.media.css'
import addImg from './img/add.svg'
import delImg from './img/del.svg'

export default async function News() {
    const res = await fetch('https://ades.kg:8086/news/getAllNews', {
      next: { revalidate: 3600 },
    });
    const news = await res.json();
  
    return (
      <section id="news">
        <div className="container">
          <div className="news__box">
            <div className="news__box__header">
              <h2>Новости</h2>
              <div className="news__box__header-buttons">
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
=======
                <button>Удалить</button>
>>>>>>> f457db60cb4e7352ce36fe982cb68f6c083c61a8
              </div>

              <div className="news__box__header-buttons__mobile">
                <button><img src={addImg.src} alt="" /></button>
                <button><img src={delImg.src} alt="" /></button>
              </div>
            </div>
            <div className="news__box__content">
              {news?news.map((el, idx)=>(
                <div className="news__box__content-card" key={idx}>
                  <img src={`https://ades.kg:8086/${el.cover}`} alt="" />
                  <p>{el.title}</p>
                </div>
              )):''}
              
            </div>
          </div>
        </div>
        
      </section>
    );
  }