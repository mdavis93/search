import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import {Container, Row, Col, Jumbotron, Card, CardHeader, CardText, CardBody, CardFooter, CardDeck} from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
    }

    storeSearchResults(collection) {
        this.setState({results: collection});
    }

    getAuthors(book) {
        if (book.volumeInfo.authors) {
            return book.volumeInfo.authors.join(", ");
        } else {
            return "Not Provided";
        }
    }

    getPublisher(book) {
        if (book.volumeInfo.publisher)
            return book.volumeInfo.publisher;
        else
            return "Not Provided";
    }

    shortenTitle(title, len = 17) {
        return title.length <= len ? title : `${title.substr(0, len)}...`
    }

    bookImage(book) {
        if (book.volumeInfo.imageLinks)
            return <img src={book.volumeInfo.imageLinks.thumbnail} alt={"Book Thumbnail"}/>;
        else
            return <img src={"https://books.google.com/googlebooks/images/no_cover_thumb.gif"} width="120" height="200" alt={"No Cover Art Thumbnail"} />;
    }

    render() {
        return (
            <Container className="App">
                <Row>
                    <Col id="search">
                        <Jumbotron>
                            <h1 className={"text-center"}>Find your favorite books on GoogleBooks!</h1>
                            <Search className="mr-3"
                                    storeSearchResults = {(results) => this.storeSearchResults(results)}
                            />
                        </Jumbotron>
                    </Col>
                </Row>
                <Row id={"searchResults"}>
                    <CardDeck>
                        {
                            this.state.results ?
                                (this.state.results.map((entry, index) => (
                                    <Col key={index} md={6} lg={4}>

                                        <Card className={"h-100"}>
                                            <CardHeader>{this.shortenTitle(entry.volumeInfo.title)}</CardHeader>
                                            <div className={"row"}>
                                                <div className={"col col-md-5"}>
                                                    {this.bookImage(entry)}
                                                </div>
                                                <div className={"col col-md-7"}>
                                                    <CardBody>
                                                        <CardText>
                                                            <strong>Author(s):</strong><br />
                                                            <em>{this.getAuthors(entry)}</em><br />
                                                            <br />
                                                            <strong>Publisher:</strong><br />
                                                            <em>{this.getPublisher(entry)}</em><br />
                                                        </CardText>
                                                    </CardBody>
                                                </div>
                                            </div>
                                            <CardFooter>
                                                <a href={entry.volumeInfo.infoLink} target={"_blank"} className={"btn btn-primary btn-block"}>More Info</a>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                )))
                                : "No Books Were Found With The Given Criteria."}
                    </CardDeck>
                </Row>
            </Container>
        );
    }
}

export default App;