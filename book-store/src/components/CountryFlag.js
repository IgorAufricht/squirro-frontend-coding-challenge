import './CountryFlag.scss';

function CountryFlag(props) {
  const { img, name } = props;
  return <img className="country-flag" src={img} alt={`Country of the book store: ${name}`} />;
}

export default CountryFlag;
