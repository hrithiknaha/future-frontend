import jwtDecode from "jwt-decode";

export const isTokenExpired = (exp) => {
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
};

export const retrieveAccessToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};

    const { username, exp } = jwtDecode(token);
    return { username, token, exp };
};

export const convertTitleToUrl = (id, title) => {
    const cleanText = title
        .replace(/[^\w\s]/gi, "")
        .split(" ")
        .filter((s) => s !== "")
        .join(" ");
    const title_split = cleanText.toLowerCase().split(" ");
    const elements = [id.toString(), ...title_split];
    return elements.join("-");
};

export const extractIdFromUrl = (title) => {
    return title.split("-")[0];
};

export const makeGenreBetter = (genres) => {
    if (!genres) return [];

    const uniqueGenresArray = [];

    genres.forEach((genre) => {
        const individualGenres = genre.split(" / ");
        individualGenres.forEach((individualGenre) => {
            if (!uniqueGenresArray.includes(individualGenre)) {
                uniqueGenresArray.push(individualGenre);
            }
        });
    });

    return uniqueGenresArray;
};

export const findBookCompletion = (pageCount, currentPage) => {
    return ((currentPage / pageCount) * 100).toFixed(2);
};
