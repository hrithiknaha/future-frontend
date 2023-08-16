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

export const computeBookStatus = (books) => {
    const statsMap = new Map([
        ["Completed", 0],
        ["Reading", 0],
        ["TBR", 0],
        ["Stopped", 0],
    ]);

    for (const book of books) {
        statsMap.set(book.status, (statsMap.get(book.status) || 0) + 1);
    }
    return Array.from(statsMap, ([status, count]) => ({ status, count }));
};
