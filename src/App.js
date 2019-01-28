import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import {Container, Row, Col, Jumbotron, Card, CardHeader, CardText, CardImg, CardBody} from 'reactstrap';

class App extends Component {
    // Our constructor will store the results of each search in
    // an array.  This could allow for future expansions to have
    // access to the entire search results.
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    // Let's store the search results
    storeSearchResults(collection) {
        this.setState({results: collection});
    }

    getAuthors(book) {
        if (book.volumeInfo.authors) {
            return book.volumeInfo.authors.join(", ");
        } else {
            return "Unknown";
        }
    }

    render() {
        return (
            <Container className="App">
                <Row>
                    <Col id="search">
                        <Jumbotron>
                            <h1 className={"text-center"}>Find your next favorite book on GoogleBooks!</h1>
                            <Search className="mr-3" runSearch = {(query) => {this.doSearch(query)}}
                                    storeSearchResults = {(results) => this.storeSearchResults(results)}
                            />
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.results ?
                            (this.state.results.map((entry, index) => (
                    <Col key={index} sm={6} md={4} xl={3}>

                        <Card>
                            <CardHeader>{entry.volumeInfo.title}</CardHeader>
                            <CardImg top width="100%" src={
                                entry.volumeInfo.imageLinks ? entry.volumeInfo.imageLinks.smallThumbnail
                                    : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                            } alt="Card image cap" />
                            <CardBody>
                                <CardText>
                                    Author(s): <em>{this.getAuthors(entry)}</em><br />
                                    Publisher: <em>{entry.volumeInfo.publisher}</em>
                                </CardText>
                                <a href={entry.volumeInfo.infoLink} target={"_blank"} className={"btn btn-primary btn-block"}>More Info</a>
                            </CardBody>
                        </Card>
                    </Col>
                    )))
                    : "No Results To Display"}
                </Row>
            </Container>
        );
    }
}

export default App;