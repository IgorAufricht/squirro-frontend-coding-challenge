import './BookList.scss';

function BookList(props) {
  const items = props.items || [];

  if (items.length === 0) {
    return <div className="book-list-no-data">No data available</div>;
  }

  return (
    <ul className="book-list">
      {items.map((item) => (
        <li key={item.id}>
          <div className="book-list-name">{item.name}</div>
          <div className="book-list-author">{item.author.fullName}</div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
