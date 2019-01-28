# GoogleBooks Search
----
## About:

This project demonstrates the usage of Google's [_GoogleBooks API_](https://developers.google.com/books/docs/v1/) to search for books by _author_, _title_, or _category, and was scafolded via `create-react-app` [module](https://github.com/facebook/create-react-app).

[reactstrap](https://reactstrap.github.io/) was used to make use of Bootstrap 4 on the front-end.  Each located book will display its title, a thumbnail, it's publisher, and author(s) via Bootstrap `Card` component.

This project uses an asynchronous call to Google's API to perform searching, and re-rendering of the results.  There are no page reloads, or URLs to remember.  Each result's _card_ will present an option to obtain "_More Info_" by opening a new tab to that book's URL.

####Components:
- App.js
  - This is the main app, and contains the following methods
    * storeSearchResults(collection)
      - Store the parsed response in `state` for later use
    * getAuthors(book)
      - Retrieves the list of authors for a given book, if present in the response object, otherwise displays "_Unknown_"

- Search.js
  - This component renders the search interface, and contains the following methods:
    * doSearch(query)
      - Sends the provided query to remote endpoint, calling `storeSearchResults` with the returned collection
    * handleSubmit(e)
      - Handles the process of _building_ the query, replacing all typed spaces (' ') with the plus ('+') character.
      - Calls `.preventDefault()` to stop event propagation through the app.
    * handleRadioChange(e)
      - Sets a state variable according to which search constraint that is chosen (`title`, `author`, `category`).
    * handleTextChange(e)
      - Updates a state variable to match the value entered into the searchbox
    
## Installation:

1. To install, clone the project into a project directory:
    ```
    mkdir googleBooksSearch && cd googleBooksSearch
    git clone git@github.com:mdavis93/search.git
    ```
2. Run `npm install` to install dependencies.
3. Run `npm start` and navigate to `http://localhost:3000` to view project

No other configuration is needed for this project