"use client"

import { useEffect, useState } from 'react';
import './createNews.css'
import plus from './createNewsIMG/plus.svg'
import Image from 'next/image'
import Check from './createNewsIMG/Check.svg'
import Del from './createNewsIMG/Del.svg'
import Warning from './createNewsIMG/Warning.svg'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateNews(){

  const [newsList, setNewsList] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter()

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://ades.kg:8086/news/getAllNews");
      setNewsList(response.data); 
    } catch (err) {
      console.error("Ошибка загрузки новостей:", err);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      setImageFile(file); 
      setImageSrc(URL.createObjectURL(file)); 
    }
  };

  const isFormValid = imageSrc && title && description;

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!isFormValid) {
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccessMessage('');
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', description);
    formData.append('cover', imageFile);
  
    try {
      const response = await axios.post('https://ades.kg:8086/news/createNews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Ответ сервера:", response.data);

      
      const createdPost = {
        id: response.data.id, 
        cover: URL.createObjectURL(imageFile), 
        title,
        content: description,
      };
  
      setNewPost(createdPost);
      setTitle("");
      setDescription("");
      setImageSrc(null);
      setImageFile(null);
      fetchNews();
      setSuccessMessage('Добавлено!'); 
      setTimeout(() => setSuccessMessage(''), 3000); 
    } catch (err) {
      setError('Повторите попытку!');
      console.error(err);
    } finally {
      setLoading(false);
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
                      <p className='create__news__del'>Удалить</p>
                      <Image  className='create__news__del__mobile' src={Del} alt="" />
                      </>
                    )}
                </div>
                {newPost ? (
                  <div className="create__news__box__get">
                    <div className="c__news__box__get__image">
                        {newPost.cover && <img className='c__news__box__get__img' src={newPost.cover} alt={newPost.title}  />}
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
                ) : (
                <div className="create__news__box">
                    <form className='create__news__form' action="">
                      {!imageSrc && (
                        <label className='upload-container' htmlFor="fileInput">
                          <input id="fileInput" className='c__news__form__img' type="file" accept="image/*" onChange={handleFileChange}/>
                          <span className="c__news__form__img__upload">Добавить обложку</span>
                        </label>
                      )}

                      {imageSrc && (
                          <label className='upload-container__img' htmlFor="">
                              <div className="image-preview">
                                <img src={imageSrc} alt="Preview"/>
                              </div>
                          </label>
                      )}

                      <label htmlFor="">
                        <input onChange={(event) => setTitle(event.target.value)} className='c__news__form__des' type="text" name="" id="" placeholder='Введите заголовок новости'/>
                      </label>

                      <label htmlFor="">
                        <textarea onChange={(event) => setDescription(event.target.value)} className='c__news__form__text' name="" id="" placeholder='Введите описание новости'></textarea>
                      </label>

                      <div className="c__news__form__button">
                        <button onClick={handleSubmit} className={`c__news__form__btn ${isFormValid ? 'active' : 'inactive'}`} disabled={!isFormValid || loading}>{loading ? 'Загружается...' : 'Опубликовать новость'}</button>
                      </div>
                    </form>

                    <div className="create__news__get">
                      <Image className='create__news__get__line' src={plus} alt="" />
                    </div>
                </div>
              )}
            </div>
          </section>
        </>
    )
}