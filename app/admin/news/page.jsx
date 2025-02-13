import News from './News';

export default async function NewsWrapper() {
  console.log("запрос");
  const res = await fetch('https://ades.kg:8086/news/getAllNews', {
    next: { revalidate: 3600 },
  });

  const news = await res.json();

  return <News initialNews={news} />;
}