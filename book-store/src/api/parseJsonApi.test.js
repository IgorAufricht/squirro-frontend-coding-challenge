import { parseJsonApi } from './parseJsonApi';

test('parses JSON object in JSON:API format to a nested object structure', () => {
  const jsonApiData = {
    jsonapi: {
      version: '1.0',
    },
    meta: {
      total: 3,
    },
    data: [
      {
        type: 'stores',
        id: 1,
        attributes: {
          name: 'MicroBooks',
          website: 'https://www.micro-books-store.com',
          rating: 4,
        },
        relationships: {
          countries: {
            data: {
              id: 1,
              type: 'countries',
            },
          },
          books: {
            data: [
              {
                id: 1,
                type: 'books',
              },
              {
                id: 2,
                type: 'books',
              },
            ],
          },
        },
      },
      {
        type: 'stores',
        id: 2,
        attributes: {
          name: 'SquirroBooks',
          website: 'https://www.squirro.com',
          rating: 5,
        },
        relationships: {
          countries: {
            data: {
              id: 3,
              type: 'countries',
            },
          },
          books: {
            data: [
              {
                id: 8,
                type: 'books',
              },
            ],
          },
        },
      },
    ],
    included: [
      {
        type: 'countries',
        id: 1,
        attributes: {
          code: 'AU',
        },
      },
      {
        type: 'books',
        id: 1,
        attributes: {
          name: 'JavaScript: The Good Parts',
          copiesSold: 154,
        },
        relationships: {
          author: {
            data: {
              id: 1,
              type: 'authors',
            },
          },
        },
      },
      {
        type: 'authors',
        id: 1,
        attributes: {
          fullName: 'Douglas Crockford',
        },
      },
      {
        type: 'books',
        id: 2,
        attributes: {
          name: 'JavaScript: The Definitive Guide',
          copiesSold: 66,
        },
        relationships: {
          author: {
            data: {
              id: 2,
              type: 'authors',
            },
          },
        },
      },
      {
        type: 'authors',
        id: 2,
        attributes: {
          fullName: 'David Flanagan',
        },
      },
      {
        type: 'books',
        id: 8,
        attributes: {
          name: 'JavaScript Pocket Reference: Activate Your Web Pages',
          copiesSold: 47,
        },
        relationships: {
          author: {
            data: {
              id: 2,
              type: 'authors',
            },
          },
        },
      },
      {
        type: 'countries',
        id: 3,
        attributes: {
          code: 'CH',
        },
      },
    ],
  };

  expect(parseJsonApi(jsonApiData)).toEqual([
    {
      id: 1,
      type: 'stores',
      name: 'MicroBooks',
      website: 'https://www.micro-books-store.com',
      rating: 4,
      countries: {
        id: 1,
        type: 'countries',
        code: 'AU',
      },
      books: [
        {
          id: 1,
          type: 'books',
          name: 'JavaScript: The Good Parts',
          copiesSold: 154,
          author: {
            id: 1,
            type: 'authors',
            fullName: 'Douglas Crockford',
          },
        },
        {
          id: 2,
          type: 'books',
          name: 'JavaScript: The Definitive Guide',
          copiesSold: 66,
          author: {
            id: 2,
            type: 'authors',
            fullName: 'David Flanagan',
          },
        },
      ],
    },
    {
      id: 2,
      type: 'stores',
      name: 'SquirroBooks',
      website: 'https://www.squirro.com',
      rating: 5,
      countries: {
        id: 3,
        type: 'countries',
        code: 'CH',
      },
      books: [
        {
          id: 8,
          type: 'books',
          name: 'JavaScript Pocket Reference: Activate Your Web Pages',
          copiesSold: 47,
          author: {
            id: 2,
            type: 'authors',
            fullName: 'David Flanagan',
          },
        },
      ],
    },
  ]);
});

test('works without relationships', () => {
  const jsonApiData = {
    data: [
      {
        id: 1,
        type: 'test',
        attributes: {
          key1: 'value1',
          key2: 'value2',
        },
      },
    ],
  };

  expect(parseJsonApi(jsonApiData)).toEqual([
    {
      id: 1,
      type: 'test',
      key1: 'value1',
      key2: 'value2',
    },
  ]);
});

test('keeps null values for relationships', () => {
  const jsonApiData = {
    data: [
      {
        id: 1,
        type: 'test',
        attributes: {
          key1: 'value1',
          key2: 'value2',
        },
        relationships: {
          rel1: {
            data: null,
          },
        },
      },
    ],
  };

  expect(parseJsonApi(jsonApiData)).toEqual([
    {
      id: 1,
      type: 'test',
      key1: 'value1',
      key2: 'value2',
      rel1: null,
    },
  ]);
});

test('keeps empty arrays for relationships', () => {
  const jsonApiData = {
    data: [
      {
        id: 1,
        type: 'test',
        attributes: {
          key1: 'value1',
          key2: 'value2',
        },
        relationships: {
          rel1: {
            data: [],
          },
        },
      },
    ],
  };

  expect(parseJsonApi(jsonApiData)).toEqual([
    {
      id: 1,
      type: 'test',
      key1: 'value1',
      key2: 'value2',
      rel1: [],
    },
  ]);
});

test('fails if relationship specified in other way than with "data"', () => {
  const jsonApiData = {
    data: [
      {
        id: 1,
        type: 'test',
        attributes: {
          key1: 'value1',
          key2: 'value2',
        },
        relationships: {
          rel1: {
            links: 'self',
          },
        },
      },
    ],
  };

  expect(() => {
    parseJsonApi(jsonApiData);
  }).toThrow('Unknown relationship format {"links":"self"}');
});

test('fails when a related object is missing from the "included" array', () => {
  const jsonApiData = {
    data: [
      {
        id: 1,
        type: 'test',
        attributes: {
          key1: 'value1',
          key2: 'value2',
        },
        relationships: {
          rel1: {
            data: {
              id: 1,
              type: 'nonexistent',
            },
          },
        },
      },
    ],
    included: [],
  };

  expect(() => {
    parseJsonApi(jsonApiData);
  }).toThrow('Cannot find included object of id=1, type=nonexistent');
});
