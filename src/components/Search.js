import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from "reactstrap";

class Search extends Component {
    constructor(props) {
        super(props);
        this.base_url = "https://www.googleapis.com/books/v1/volumes?q=";
        this.state = {
            searchString: '',
            constraint: "intitle:",
            dropdownOpen: false
        }
    }

    doSearch(query_url) {
        fetch(query_url)
            .then((response) => { return response.json()} )
            .then( (json) => {this.props.storeSearchResults(json.items)});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.doSearch(`${this.base_url}${this.state.constraint}${this.state.searchString}`.replace(/\s/g, "+")+ "&startIndex=0&maxResults=40");
    }

    handleRadioChange(e) {
        this.setState({constraint: e.target.value});
    }

    handleTextChange(e) {
        this.setState({searchString: e.target.value});
    }

    render() {
        return(
            <div className = "search_form">
                <Form onSubmit={ (e) => this.handleSubmit(e) } inline>
                    <FormGroup>
                        <Label className={"form-label"} for="searchString">Search For: </Label>
                            <Input type="text" id='searchString' value={ this.state.searchString }
                                   onChange={ (e) => this.handleTextChange(e) } />
                    </FormGroup>
                    <FormGroup>
                        <Label for={"title"}>Title</Label>
                        <Input type='radio' id='title' name='constraint' value='intitle:' defaultChecked={true} onChange={ (e) => { this.handleRadioChange(e) }}/>{' '}
                    </FormGroup>
                    <FormGroup>
                        <Label for={"author"}>Author</Label>
                        <Input type='radio' id='author' name='constraint' value='inauthor:' onChange={ (e) => { this.handleRadioChange(e) }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"category"}>Category</Label>
                        <Input type='radio' id='category' name='constraint' value='subject:' onChange={ (e) => { this.handleRadioChange(e) }}/>{' '}
                    </FormGroup>
                    <FormGroup>
                        <Button id={"submitSearch"}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Search;