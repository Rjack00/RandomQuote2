import { useEffect, useState } from 'react'
import './App.css'
import { renderToPipeableStream } from 'react-dom/server';

const api_url =   "https://quoteslate.vercel.app/api/quotes/random";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchData(api_url);
  }, []);

  const fetchData = async (url) => {
    try{
       const response = await fetch(url);
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
   
    let data = await response.json();
    const quoteText = data.quote || data.quotes?.[0] || data;
      const quoteAuth = data.author || data.author?.[0] || data;
    console.log("data: ",quoteText);
    console.log("quoteAuthor: ",quoteAuth);
    setQuote(quoteText);
    setAuthor(quoteAuth);
   } catch (error) {
    console.error(`My Error message: ${error.message}`)
   }
  };

  return (
    <div id="quote-box">
        <h1 id="title">Random Quotes</h1>
      <h2 id="text">{quote}</h2>
      <p id="author">{author}</p>
      <button id="new-quote" onClick={() => fetchData(api_url)} >New Quote</button>
      <a id="tweet-quote" href="twitter.com/intent/tweet">Tweet Quote</a>
    </div>
    );
};

export default App
