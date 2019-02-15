export const fetchSearchResults = async (query_url) => {
    const response = await fetch(query_url);

    if (response.status >= 400)
        throw( new Error('Error fetching search results'));
    else
        return await response.json();
};