"use client"

import { useState } from 'react';
import './createNews.css'
import plus from './createNewsIMG/plus.svg'
import Image from 'next/image'

export default function CreateNews(){

  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const isFormValid = imageSrc && title && description;
  

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
                        <button className={`c__news__form__btn ${isFormValid ? 'active' : 'inactive'}`} disabled={!isFormValid}>Опубликовать новость</button>
                      </div>
                    </form>
                    <div className="create__news__get">
                      <Image className='create__news__get__line' src={plus} alt="" />
                    </div>
                </div>
            </div>
          </section>
        </>
    )
}