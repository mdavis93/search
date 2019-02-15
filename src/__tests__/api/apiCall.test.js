import {fetchSearchResults} from "../../api/apiCalls";

const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
beforeEach(() => {

});
describe( "API Call", () => {
    it('should retrieve items on success', async () => {
        window.fetch = jest.fn()
            .mockImplementation( () => {
                return ({
                    status: 200,
                    json:
                        () => new Promise((resolve, reject) => {
                            resolve({
                                items: [
                                    {
                                        volumeInfo: {
                                            title: "Test Book1",
                                            author: ["Test Author1"],
                                            imageLinks: {thumbnail: "http://books.google.com/books/content?id=N5eRDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}
                                        }
                                    },
                                    {
                                        volumeInfo: {
                                            title: "Test Book2",
                                            author: ["Test Author2"],
                                            imageLinks: {thumbnail: "http://books.google.com/books/content?id=N5eRDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}
                                        }
                                    },
                                    {
                                        volumeInfo: {
                                            title: "Test Book3",
                                            author: ["Test Author3"],
                                            imageLinks: {thumbnail: "http://books.google.com/books/content?id=N5eRDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}
                                        }
                                    },
                                    {
                                        volumeInfo: {
                                            title: "Test Book4",
                                            author: ["Test Author4"],
                                            imageLinks: {thumbnail: "http://books.google.com/books/content?id=N5eRDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}
                                        }
                                    },
                                ]

                            });
                        })
                })
            });

        async function sccuessfulSearch() {
            return fetchSearchResults("http://localhost:3000");
        }
        let fetchSuccess = await sccuessfulSearch();
        expect(fetchSuccess.items.length).toBe(4);
    });

    it('should throw an error on failure', async () => {
        window.fetch = jest.fn()
            .mockImplementation( () => ({
                status: 500
            }));

        async function testFetchSearchResult() {
            await fetchSearchResults("http://localhost:3000");
        }
        await expect(testFetchSearchResult()).rejects.toThrow("Error fetching search results");
    });
});