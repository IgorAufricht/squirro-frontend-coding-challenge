/**
 * Get metadata of the specified countries (uses restcountries.com REST API endpoint).
 *
 * @param countryCodes An array of 2-letter country codes (ISO 3166-1 alpha-2 / cca2)
 * @returns An object where the keys is the country code and the value is the metadata object
 *          (containing 'flag' and 'name' keys).
 */
export async function fetchCountryMetadata(countryCodes) {
  const codes = countryCodes.join(',');
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/?codes=${codes}&fields=cca2,name,flags`,
  );
  const data = await response.json();

  return data.reduce((countries, item) => {
    countries[item.cca2] = {
      flag: item.flags.png,
      name: item.name.common,
    };
    return countries;
  }, {});
}
