import StarRating from './StarRating';
import BookList from './BookList';
import Link from './Link';
import CountryFlag from './CountryFlag';

import './BookStore.scss';

function BookStore(props) {
  const { store, onRatingChange } = props;

  const bestSellingBooks = (store.books || [])
    .sort((b1, b2) => (b1.copiesSold > b2.copiesSold ? -1 : 1))
    .slice(0, 2);

  const establishedDate = new Date(store.establishmentDate);

  return (
    <article className="book-store">
      <h1 className="book-store-name">{store.name}</h1>
      <img className="book-store-image" src={store.storeImage} alt={store.name} />
      <div className="book-store-rating">
        <StarRating rating={store.rating} onChange={(rating) => onRatingChange(store.id, rating)} />
      </div>
      <div className="book-store-books">
        <h2>Best-selling books</h2>
        <BookList items={bestSellingBooks} />
      </div>
      <div className="book-store-footer">
        <div className="book-store-established">{formatDate(establishedDate)}</div>
        <div className="book-store-link">
          <Link url={store.website} />
        </div>
        {store.countryMetadata && (
          <div className="book-store-flag">
            <CountryFlag img={store.countryMetadata.flag} name={store.countryMetadata.name} />
          </div>
        )}
      </div>
    </article>
  );
}

// Formats date in dd/mm/yyyy format
function formatDate(date) {
  return date.toISOString().slice(0, 10).split('-').reverse().join('/');
}

export default BookStore;
