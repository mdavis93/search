import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from '../App';

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
});