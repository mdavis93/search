import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { act } from 'react-dom/test-utils';
import Search from '../../components/Search';
import App from '../../App';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("Search Component", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders a dropdown button to select search type',() => {
        act(() => {
           ReactDOM.render(<Search />, container);
        });
        const searchTypeSelectorButton = container.querySelector(".dropdown-toggle");
        expect(searchTypeSelectorButton.textContent).toContain("Title");
    });

    it('renders a textbox to enter query terms', () => {
        act(() => {
            ReactDOM.render(<Search/>, container);
        });
        const searchQueryTextBox = container.querySelector("#searchString");
        expect(searchQueryTextBox).not.toBeNull();
    });
});

describe("Performing a Search", () => {

    it('should do something', () => {
        act(() => {
            ReactDOM.render(<App/>, container);
        });
        const test1 = ReactTestUtils.renderIntoDocument(<App/>);
        const test = ReactTestUtils.renderIntoDocument(<Search/>);
        const searchButton = container.querySelector("#submitSearch");
        const searchTextBox = container.querySelector("#searchString");

        searchTextBox.value = "Eloquent Javascript";
        act(() => {
            searchButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:Eloquent+Javascript")
            .then((response) => {
                console.log("DEBUG:");
                console.log(response.json().items.length + " :: " + test1.state.items.length);
                expect(test.state.searchType).toBe("intitle");
                expect(false).toBe(true);
            });
    });
});