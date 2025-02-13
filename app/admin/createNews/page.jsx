"use client"

import { useState } from 'react';
import './createNews.css'
import plus from './createNewsIMG/plus.svg'
import Image from 'next/image'
import axios from 'axios';

export default function CreateNews(){

  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', description);
    formData.append('cover', imageFile); // Передаем сам файл
  
    try {
      const response = await axios.post('https://ades.kg:8086/news/createNews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      setTitle('');
      setDescription('');
      setImageSrc(null);
      setImageFile(null); // Очистка файла
    } catch (err) {
      setError('Ошибка при отправке данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  

    return (
        <>
          <section className="create__news">
            <div className="container">
                <p className='create__news__name'>Новости</p>
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
                        <input onChange={(e) => setTitle(e.target.value)} className='c__news__form__des' type="text" name="" id="" placeholder='Введите заголовок новости'/>
                      </label>

                      <label htmlFor="">
                        <textarea onChange={(e) => setDescription(e.target.value)} className='c__news__form__text' name="" id="" placeholder='Введите описание новости'></textarea>
                      </label>

                      <div className="c__news__form__button">
                        <button onClick={handleSubmit} className={`c__news__form__btn ${isFormValid ? 'active' : 'inactive'}`} disabled={!isFormValid || loading}>{loading ? 'Загружается...' : 'Опубликовать новость'}</button>
                      </div>
                    </form>

                    {error && <p className="error-message">{error}</p>}

                    <div className="create__news__get">
                      <Image className='create__news__get__line' src={plus} alt="" />
                    </div>
                </div>
            </div>
          </section>
        </>
    )
}