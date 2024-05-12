import React, { useEffect, useState } from 'react';
import { Quote } from '@/types';
import SingleQuote from './SingleQuote';

function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [quoteHistory, setQuoteHistory] = useState<Quote[]>([]);
  const defaultQuery = "no user query provided, return a generic famous quote."
  const systemInstructions = "Make sure to not repeat yourself, I'm providing a list of previous quotes you've generated so don't provide anything similar to that!!!"

  const getLastQuotes = (quoteHistory: Quote[]) => {
    const lastTenQuotes = quoteHistory.slice(-10);
    return lastTenQuotes.map((quote) => `${quote.quoteText} - ${quote.quoteAuthor}`).join('\n')
  }

  const fetchQuote = async (userQuery: string) => {
    try {
      const lastQuotes = getLastQuotes(quoteHistory)
      const query = `${userQuery}\n\n${systemInstructions}\nPrevious Quotes:${lastQuotes}`
      console.log(query)
      const response = await fetch('api/generateQuote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userQuery: query })
      });
      const data = await response.json()
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    const query = userQuery || defaultQuery;

    if (quote) {
      setQuoteHistory((prevHistory) => [...prevHistory, quote]);
    }

    fetchQuote(query);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value)
  };

  return (
    <div className="bg-lime-50 flex flex-col items-center justify-center p-4 min-h-screen">
      <div className=' p-4 m-6 text-center'>
        <h1 className='text-3xl'>Random Quote Generator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={handleInputChange}
            value={userQuery}
            placeholder='Enter your query'
            className='border border-gray-300 rounded-md p-2 w-full mb-2 mt-2'>
          </input>
          <button type='submit' className='mt-2 border border-indigo-500 rounded-full p-2 bg-indigo-100'>
            Get Quote
          </button>
        </form>
        {quote && (
          <SingleQuote quote={quote} />
        )}
        {quoteHistory.length > 0 && (
          <div className='mt-6'>
            <hr className="my-4" /> 
            <h2 className='text-xl mb-2 font-light'>Previous Quotes</h2>
            {
              quoteHistory.map((quote, index) => (
                <SingleQuote quote={quote} key={index} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default QuoteGenerator;