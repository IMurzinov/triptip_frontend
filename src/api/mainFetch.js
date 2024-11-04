const mainFetch = async (url, error) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(error);
    }

    return response.json();
};

export default mainFetch;