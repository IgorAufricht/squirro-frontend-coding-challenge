import { useEffect, useState } from 'react';
import { fetchStores, setRating } from '../api/bookStore';
import BookStore from './BookStore';

import './BookStoreList.scss';
import { dispatch } from '../utils/events';

function BookStoreList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const stores = await fetchStores();
        setIsLoaded(true);
        setItems(stores);
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      }
    }
  }, []);

  const onRatingChange = async (id, rating) => {
    try {
      await setRating(id, rating);

      const updatedItems = items.map((item) => ({
        ...item,
        rating: item.id === id ? rating : item.rating,
      }));
      setItems(updatedItems);

      dispatch('flash', {
        message: 'Rating was updated',
        type: 'success',
      });
    } catch (error) {
      console.error(error);
      dispatch('flash', {
        message: 'Error updating rating',
        type: 'error',
      });
    }
  };

  if (error) {
    return (
      <article className="book-store-list-error">
        <h1>An error occured</h1>
        <code>Error: {error.message}</code>
        <p>(See console for details.)</p>
      </article>
    );
  }

  if (!isLoaded) {
    return <div className="book-store-list-loading">&#8987; Loading...</div>;
  }

  return (
    <ul className="book-store-list">
      {items.map((item) => (
        <li key={item.id}>
          <BookStore store={item} onRatingChange={onRatingChange} />
        </li>
      ))}
    </ul>
  );
}

export default BookStoreList;
