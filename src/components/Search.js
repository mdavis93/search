import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            constraint: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        alert(`You typed ${this.state.searchString}`);
    }

    handleChange(e) {
        this.setState({searchString: e.target.value});
    }

    render() {
        return(
            <div className = "search_form">
                <form onSubmit={ (e) => this.handleSubmit(e) }>
                    <label for='searchString'>Search For: </label>
                    <input type='text' id='searchString' value={ this.state.searchString }
                           onChange={ (e) => this.handleChange(e) } />

                    <label htmlFor="author">Author</label>
                    <input type='radio' id='author' name='constraint' value='author' checked/>
                    <label htmlFor="title">Title</label>
                    <input type='radio' id='title' name='constraint' value='title' checked/>
                    <label htmlFor="category">Category</label>
                    <input type='radio' id='category' name='constraint' value='category' checked/>

                    <input type='submit' />
                </form>
                <strong>Something Spectacular Will Go Here!</strong>
            </div>
        );
    }
}

export default Search;