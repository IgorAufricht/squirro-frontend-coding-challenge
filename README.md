## Squirro Frontend Coding Challenge

This is my entry for the [Squirro Frontend Coding Challenge](https://github.com/squirro/frontend-coding-challenge).

### Usage
* Clone the project
* Run `npm install`
* Run `npm start` to serve the application

### Project structure

* `book-store`: ReactJS frontend of the project.
* `book-store-api`: Backend coming straight from the coding challenge repo above.

### Notes
* The `book-store-api` was not modified apart from changing the port the server runs on.
* As for `book-store`:
  * I'm not super experienced with CSS, but I tried to make it look nice and responsive.
  * The flags are loaded with a single REST call, which is done in a slightly awkward manner,
    but I think it's much better than loading the flags one by one
    (I also needed to use [http://restcountries.com](restcountries.com) as opposed to
    [restcountries.eu](restcountries.eu), as the latter seems to be dead).
  * The store rating can be updated by clicking on the stars and it will show a flash message.
    I'm not super happy with how the related state update is done in the code, but I think using
    Redux (or something similar) is an overkill for a tiny project like this.
  * I didn't add any component or end-to-end tests to `book-store` since I don't have enough
    experience with ReactJS to be able to add some meaningful tests without spending too much time on it.
  * I did add unit tests for my custom JSON:API parser, since I needed that anyway to make
    sure it works correctly.
