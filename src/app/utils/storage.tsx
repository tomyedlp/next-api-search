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


export const setIdToValue = (nameLocalStorage: string, id: number, something: number | string) => {
    //allGamesStarsRating, allGamesPlaying, allGamesFav, allGamesNotes
    if(localStorage.getItem(nameLocalStorage) !== null || '""') {
        var allElements: Array<Object> = JSON.parse(localStorage.getItem(nameLocalStorage) || '""');
        let pair = {[id]: something}
        allElements = {...allElements, ...pair}
        localStorage.setItem(nameLocalStorage, JSON.stringify(allElements));
    } else {
        let newStorage = {[id]: something};
        localStorage.setItem(nameLocalStorage, JSON.stringify(newStorage));
    }
}


export const checkLocalStorage = (id: number | null | undefined, nameLocalStorage: string) => {
    if(localStorage.getItem(nameLocalStorage) !== null || '""') {
        var allElements: Array<any> = JSON.parse(localStorage.getItem(nameLocalStorage) || '""');
        if(nameLocalStorage !== "allGamesFav" && typeof id === "number") {
            console.log(allElements)
            if(allElements.hasOwnProperty(id)) {
                return allElements[id]
            } else {
                if(nameLocalStorage === "allGamesNotes") {
                    return ""
                } else {
                    return 0
                }
            }
        } else {
            if(allElements.includes(id)) {
                return true
            } else {
                return false
            }
        }
    } else {
        if(nameLocalStorage !== "allGamesFav") {
            return 0
        } else {
            return false
        }
    }
}