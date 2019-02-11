import React, { Component } from 'react';
import {Button, Form, FormGroup, Spinner, Input, DropdownMenu, InputGroup, InputGroupButtonDropdown, DropdownItem, DropdownToggle} from "reactstrap";

class Search extends Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.handleDropDownSelectionChange = this.handleDropDownSelectionChange.bind(this);
        this.getSearchType = this.getSearchType.bind(this);

        this.base_url = "https://www.googleapis.com/books/v1/volumes?q=";
        this.state = {
            searchString: '',
            searchType: "",
            searching: false,
            dropdownOpen: false
        }
    }

    doSearch(query_url) {
        fetch(query_url)
            .then((response) => { return response.json()} )
            .then( (json) => {this.props.storeSearchResults(json.items)})
            .then( () => {this.setState({searching: false})} )
            .catch((error) => console.log(error));
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        if (this.state.searchType !== "inauthor" && this.state.searchType !== "intitle" && this.state.searchType !== "subject") {
            alert("Please select a search type from the drop-down.");
        } else {
            /*document.getElementById("searchResults").innerHTML = "";*/
            this.setState({searching: true});
            this.doSearch(`${this.base_url}${this.state.searchType}:${this.state.searchString}`.replace(/\s/g, "+") + "&startIndex=0&maxResults=40");
        }
    }

    handleSearchTextChange(e) {
        this.setState({searchString: e.target.value});
    }

    handleDropDownSelectionChange(e) {
        document.getElementById("submitSearch").classList.remove("disabled");
        this.setState({searchType: e.target.value});
    }

    getSearchType() {
        switch(this.state.searchType){
            case "inauthor":
                return "Author";
            case "intitle":
                return "Title";
            case "subject":
                return "Subject";
            default:
                return "Choose One..";
        }
    }

    toggleDropDown() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    searchButtonText() {
        if (this.state.searching) {
            return (
                <Spinner color={"dark"} size={"sm"} />
            );
        } else {
            return "Submit"
        }
    }

    render() {
        return(
            <div className={"search-form"}>
                <Form onSubmit={ (e) => this.handleSearchSubmit(e) }>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupButtonDropdown addonType={"prepend"} isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                                <DropdownToggle color={"primary"} caret>{this.getSearchType()}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Choose One...</DropdownItem>
                                    <DropdownItem value={"intitle"} onClick={(e) => this.handleDropDownSelectionChange(e)}>Title</DropdownItem>
                                    <DropdownItem value={"inauthor"} onClick={(e) => this.handleDropDownSelectionChange(e)}>Author</DropdownItem>
                                    <DropdownItem value={"subject"} onClick={(e) => this.handleDropDownSelectionChange(e)}>Subject</DropdownItem>
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                            <Input type="text" id='searchString' value={ this.state.searchString }
                                   onChange={ (e) => this.handleSearchTextChange(e) } />
                        </InputGroup>
                        <small><em>You may choose to search by <strong>Title</strong>, <strong>Author</strong>, or <strong>Subject</strong>.</em></small>
                    </FormGroup>
                    <FormGroup>
                        <Button color={"success"} id={"submitSearch"} className={"mt-4"}>{this.searchButtonText()}</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Search;