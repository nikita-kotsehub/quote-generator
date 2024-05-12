import React from 'react'
import { Quote } from '@/types'

const SingleQuote = ({ quote } : { quote: Quote }) => {
  return (
    <div className="mt-4">
      <p className="font-bold mb-2">&quot;{quote.quoteText}&quot;</p>
      <p className="italic">
        {quote.quoteAuthor}, {quote.quoteYear}
      </p>
    </div>
  )
}

export default SingleQuote