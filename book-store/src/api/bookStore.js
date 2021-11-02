import { parseJsonApi } from './parseJsonApi';
import { fetchCountryMetadata } from './countries';

/**
 * Get list of all stores from the backend. Will parse the JSON:API response into
 * a simple nested object.
 */
export async function fetchStores() {
  const response = await fetch('/stores');
  const jsonApiData = await response.json();
  const stores = parseJsonApi(jsonApiData);

  return decorateStores(stores);
}

// Add additional data that is already not in the JSON:API response:
// - country metadata (name and flag)
//
// Note: It would be more elegant to just load the flag in the CountryFlag component,
// but then we wouldn't be able to use a single request to get flags for all countries
// we have (unless we would load the data for all countries, which is a lot of (unused) data).
async function decorateStores(stores) {
  const countryCodes = stores.map((store) => store.countries.code);

  try {
    const countryMetadata = await fetchCountryMetadata(countryCodes);

    return stores.map((store) => ({
      ...store,
      countryMetadata: countryMetadata[store.countries.code] || {},
    }));
  } catch (error) {
    console.error('Error while adding country metadata:');
    console.error(error);

    // Country metadata is not necessary for the page to work, so we'll just continue without it.
    return stores;
  }
}

/**
 * Set rating for the specified store.
 */
export async function setRating(id, rating) {
  const response = await fetch(`/stores/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: {
        type: 'stores',
        id,
        attributes: {
          rating,
        },
      },
    }),
  });
  await response.json();
}
