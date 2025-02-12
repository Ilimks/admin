export default async function News() {
    const res = await fetch('https://ades.kg:8086/news/getAllNews', {
      next: { revalidate: 3600 }, // Обновлять кэш раз в час
    });
    const news = await res.json();
  
    return (
      <div>
        <h1>Новости</h1>
        <ul>
          {news.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  