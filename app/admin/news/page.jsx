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
                <button>Удалить</button>
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