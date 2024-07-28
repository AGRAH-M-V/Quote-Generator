import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 

const Quote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    const fetchQuote = async () => {
        setIsFetching(true);
        setError(''); // Clear any previous error
        try {
            const response = await axios.get('https://api.quotable.io/random');
            setQuote(response.data.content);
            setAuthor(response.data.author);
        } catch (error) {
            console.error("Error fetching the quote", error);
            setError('Failed to fetch quote. Please try again later.');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="quoteContainer">
            {isFetching ? (
                <div className="spinner"></div>
            ) : (
                <div className="quote">
                    <h2 className="title">Quote</h2>
                    {error ? (
                        <p className="text">{error}</p>
                    ) : (
                        <>
                            <p className="text">"{quote}"</p>
                            <p className="author">- {author}</p>
                        </>
                    )}
                    <button
                        className={isFetching ? 'newQuoteButtonDisabled' : 'newQuoteButton'}
                        onClick={fetchQuote}
                        disabled={isFetching}
                    >
                        {isFetching ? 'Fetching...' : 'New Quote'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quote;
