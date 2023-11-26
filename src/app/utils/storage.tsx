export const getLocalInfo = (nameLocalStorage: string) => {
    //allGamesFav
    if(typeof window !== "undefined") {
        if(localStorage.getItem(nameLocalStorage) !== null || '""') {
            var allElements: Array<number> = JSON.parse(localStorage.getItem(nameLocalStorage) || '""');
            return allElements;
        } else {
            return []
        } 
    } else {
        return []
    }
}

export const setFav = (id: number | null | undefined) => {
    if(localStorage.getItem("allGamesFav") !== null || '""') {
        var allElements: Array<number | null | undefined> = JSON.parse(localStorage.getItem("allGamesFav") || '""');
        if(allElements.includes(id)) {
            // borramos del array
            allElements = allElements.filter((item: number | null | undefined) => item !== id)
            localStorage.setItem("allGamesFav", JSON.stringify(allElements));
        } else {
            // lo agregamos al array
            if(Array.isArray(allElements)) {
                allElements.push(id)
            } else {
                allElements = [id]
            }
            localStorage.setItem("allGamesFav", JSON.stringify(allElements));
        }
    } else {
        let newStorage = [id];
        localStorage.setItem("allGamesFav", JSON.stringify(newStorage));
    }
}


export const setStarsRating = (id: number, rating: number) => {
    if(localStorage.getItem("allGamesStarsRating") !== null || '""') {
        var allElements: Array<Object> = JSON.parse(localStorage.getItem("allGamesStarsRating") || '""');
        let pair = {[id]: rating}
        allElements = {...allElements, ...pair}
        localStorage.setItem("allGamesStarsRating", JSON.stringify(allElements));
    } else {
        let newStorage = {[id]: rating};
        localStorage.setItem("allGamesStarsRating", JSON.stringify(newStorage));
    }
}


export const checkLocalStorage = (id: number | null | undefined, nameLocalStorage: string) => {
    if(localStorage.getItem(nameLocalStorage) !== null || '""') {
        var allElements: Array<any> = JSON.parse(localStorage.getItem(nameLocalStorage) || '""');
        if(nameLocalStorage === "allGamesStarsRating" && typeof id === "number") {
            console.log(allElements)
            if(allElements.hasOwnProperty(id)) {
                return allElements[id]
            } else {
                return 0
            }
        } else {
            if(allElements.includes(id)) {
                return true
            } else {
                return false
            }
        }
    } else {
        if(nameLocalStorage === "allGamesStarsRating") {
            return 0
        } else {
            return false
        }
    }
}