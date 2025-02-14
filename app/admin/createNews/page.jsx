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
  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter()


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
    if (!imageSrc || !title || !description) return;

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("cover", imageFile);

    try {
      const response = await axios.post("https://ades.kg:8086/news/createNews",formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(`/admin/news/${response.data.id}`)
      setSuccessMessage("Добавлено!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setError("Повторите попытку!");
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
                </div>
                <div className="create__news__box">
                    <form className='create__news__form' action="">
                      {!imageSrc && (
                        <label className='upload-container' htmlFor="fileInput">
                          <input id="fileInput" className='c__news__form__img' type="file" accept="image/*" onChange={handleFileChange}/>
                          <span className="c__news__form__img__upload">Добавить обложку</span>
                        </label>
                      )}

                      {imageSrc && (
                          <label className='upload-container__img' htmlFor="fileInput">
                              <div className="image-preview">
                                <img src={imageSrc} alt="Preview"/>
                                <div className="image-overlay">
                                  <span className="c__news__form__img__upload1">Добавить обложку</span>
                                </div>
                              </div>
                          </label>
                      )}

                      <input 
                        id="fileInput" 
                        className='c__news__form__img1' 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={{ display: "none" }}
                      />

                      <label htmlFor="">
                        <input onChange={(event) => setTitle(event.target.value)} className='c__news__form__des' type="text" name="" id="" placeholder='Введите заголовок новости'/>
                      </label>

                      <label className='textarea__box' htmlFor="">
                        <textarea onChange={(event) => setDescription(event.target.value)} value={description} maxLength={500} className='c__news__form__text' name="" id="" placeholder='Введите описание новости'></textarea>
                        <div className="char-counter">{description.length}/500</div>
                      </label>

                      <div className="c__news__form__button">
                        <button onClick={handleSubmit} className={`c__news__form__btn ${isFormValid ? 'active' : 'inactive'}`} disabled={!isFormValid || loading}>{loading ? 'Загружается...' : 'Опубликовать новость'}</button>
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