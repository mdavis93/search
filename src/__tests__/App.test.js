import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { shallow } from 'enzyme';
import Search from '../components/Search'

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("App", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('can render the App Component',() => {
        act(() => {
            ReactDOM.render(<App />, container);
        });

        const jumbotronContainer = container.querySelector("#search h1");
        const searchResultsContainer = container.querySelector("#searchResults");
        const cardDeck = container.querySelector(".card-deck");
        expect(jumbotronContainer.textContent).toContain("Find your favorite books on GoogleBooks!");
        expect(searchResultsContainer).not.toBeFalsy();
        expect(cardDeck).not.toBeFalsy();
    });

    it('correctly stores search response from Google API', async () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: {
                items: [
                    {
                        volumeInfo: {
                            title: "GoogleBook API Test Book",
                            authors: ["Test Author"],
                            publisher: "Test Publisher1",
                            imageLinks: {thumbnail: "http://localhost:3000/test_book_img.png"}
                        }
                    }
                ]

            }
        }));
        const renderedComponent = await shallow(<App/>);
        const appInstance = renderedComponent.instance();
        await appInstance.storeSearchResults(fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:How+To").json.items);
        const book = renderedComponent.state('results')[0].volumeInfo;
        expect(book.title).toBe("GoogleBook API Test Book");
        expect(appInstance.shortenTitle(book.title)).toBe("GoogleBook API Te...");
        expect(appInstance.bookImage(renderedComponent.state('results')[0])).toEqual(
            <img alt="Book Thumbnail" src="http://localhost:3000/test_book_img.png" />
        );
        expect(renderedComponent.state('results').length).toBeGreaterThan(0);
        expect(appInstance.getAuthors(renderedComponent.state('results')[0])).toBe("Test Author");
        expect(appInstance.getPublisher(renderedComponent.state('results')[0])).toBe("Test Publisher1");
    });

    it('correctly handles results with no author', async () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: {
                items: [
                    { volumeInfo: { title: "Test Book", imageLinks: {thumbnail: "http://books.google.com/books/content?id=N5eRDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" } } }
                ]

            }
        }));
        const renderedComponent = await shallow(<App />);
        const appInstance = renderedComponent.instance();
        await appInstance.storeSearchResults(fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:How+To").json.items);
        expect(appInstance.getAuthors(renderedComponent.state('results')[0])).toBe("Not Provided");
    });

    it('correctly renders a placeholder image if book image is not provided', async () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: {
                items: [
                    {
                        volumeInfo: { title: "Missing Img Test"
                        }
                    }
                ]

            }
        }));

        const renderedComponent = await shallow(<App />);
        const appInstance = renderedComponent.instance();
        await appInstance.storeSearchResults(fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:How+To").json.items);
        expect(appInstance.bookImage(renderedComponent.state('results')[0])).toEqual(
            <img alt="No Cover Art Thumbnail" height="200" src="https://books.google.com/googlebooks/images/no_cover_thumb.gif" width="120" />
        );
    });
});