import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Search from '../../components/Search';
import {Spinner} from 'reactstrap';
import {shallow, mount} from "enzyme";
import App from "../App.test";

let container, renderedComponent, searchInstance;

beforeEach(() => {
    renderedComponent = shallow(<Search />);
    searchInstance = renderedComponent.instance();
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

    it('renders the search form and components',() => {
        act(() => {
           ReactDOM.render(<Search />, container);
        });
        expect(container.querySelector(".dropdown-toggle").textContent).toContain("Title");
        expect(container.querySelector("#searchString")).not.toBeNull();
        expect(container.querySelector("form")).not.toBeNull();
        expect(container.querySelectorAll(".dropdown-item").length).toBe(3);
        expect(container.querySelector("#submitSearch")).not.toBeNull();
    });

    it('updates `state.searchString` as text is entered', () => {
        searchInstance.handleSearchTextChange({target: { value: "New Search"} });
        expect(renderedComponent.state('searchString')).toBe("New Search");
    });

    it('gets and sets search type correctly', () => {
        expect(searchInstance.getSearchType()).toBe("Title");
        searchInstance.handleDropDownSelectionChange({target: {value: "subject"} } );
        expect(searchInstance.getSearchType()).toBe("Subject");
        searchInstance.handleDropDownSelectionChange({target: {value: "inauthor"} } );
        expect(searchInstance.getSearchType()).toBe("Author");
    });

    it('displays a spinner while searching',() => {
        expect(searchInstance.searchButtonText()).toBe("Submit");
        renderedComponent.setState({searching: true});
        expect(searchInstance.searchButtonText()).toEqual(
            <Spinner color={"dark"} size={"sm"} />
        );
    });

    // it('renders the correct menu options for searchType', () => {
    //     act(() => {
    //         ReactDOM.render(<Search />, container);
    //     });
    //     let choices = container.querySelectorAll(".dropdown-item");
    //     const expectedChoicesArray = ["intitle", "inauthor", "subject"];
    //     let actualChoicesArray = [];
    //     for(let i = 0; i < choices.length; i++) {
    //         actualChoicesArray.push(choices[i].value);
    //     }
    //     expect(actualChoicesArray).toEqual(expectedChoicesArray);
    // })
});