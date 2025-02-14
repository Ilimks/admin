"use client"

import { useEffect, useState } from 'react';
import '../../createNews/createNews.css'
import Image from 'next/image'
import Check from '../../createNews/createNewsIMG/Check.svg'
import Del from '../../createNews/createNewsIMG/Del.svg'
import Warning from '../../createNews/createNewsIMG/Warning.svg'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

export default function CreateNews(){
  const [newsList, setNewsList] = useState([])
  const [newPost, setNewPost] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter()

  const id = useParams().id

  useEffect(() => {
    axios
      .get("https://ades.kg:8086/news/getAllNews")
      .then((response) => setNewsList(response.data))
      .catch((err) => console.error("Ошибка загрузки новостей:", err));
  }, []);

  useEffect(()=>{
    if (newsList.length > 0) {
        const found = newsList.find((el) => el.id === id);
        found ? setNewPost(found): setNewPost(null)
    }
  }, [newsList, id])


  const handleDeletePost = async () => {
    if (!newPost || !newPost.id) return;

    try {
      await axios.delete(`https://ades.kg:8086/news/delete/${newPost.id}`);
      setNewPost(null);
      setSuccessMessage("Новость удалена!");
      setTimeout(() => setSuccessMessage(""), 3000);
      router.push('/admin/news')
    } catch (err) {
      setError("Ошибка при удалении, попробуйте снова!");
    }
  };

  
    return (
        <>
          <section className="create__news">
            <div className="container">
                <div className="create__news__name-del">
                    <p onClick={()=>router.push(`/admin/news`)} className='create__news__name'>Новости</p>
                    {newPost && (
                      <>
                      <p onClick={handleDeletePost} className='create__news__del'>Удалить</p>
                      <Image onClick={handleDeletePost} className='create__news__del__mobile' src={Del} alt="" />
                      </>
                    )}
                </div>
                {newPost ? (
                  <div className="create__news__box__get">
                    <div className="c__news__box__get__image">
                        {newPost.cover && <img className='c__news__box__get__img' src={`https://ades.kg:8086/${newPost.cover}`} alt={newPost.title}  />}
                    </div>
                    <div className="create__news__content">
                      <h4 className='create__news__content__title'>{newPost.title}</h4>
                      <p className='create__news__content__des'>{newPost.content}</p>
                    </div>
                    {successMessage && (
                    <div className="c__news__box__get__success">
                        <Image className='c__news__box__get__success__img' src={Check} alt="" />
                        <p className="success-message">{successMessage}</p>
                    </div>
                    )}
                    {error && (
                      <div className="c__news__box__get__error">
                        <Image className='c__news__box__get__error__img' src={Warning} alt="" />
                        <p className="error-message">{error}</p>
                    </div>
                    )}
                  </div>
                ):(<h1>Такого поста не найдено</h1>)}
                
            </div>
          </section>
        </>
    )
}