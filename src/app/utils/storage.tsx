export const getFavs = () => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem('allGamesFav') !== null || '""') {
            var allElements: Array<number> = JSON.parse(localStorage.getItem('allGamesFav') || '""');
            return allElements;
        } else {
            return []
        } 
    } else {
        return []
    }
}

export const setFav = (id: number | null | undefined) => {
    if(localStorage.getItem('allGamesFav') !== null || '""') {
        var allElements: Array<number | null | undefined> = JSON.parse(localStorage.getItem('allGamesFav') || '""');
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

export const checkFav = (id: number | null | undefined) => {
    if(localStorage.getItem('allGamesFav') !== null || '""') {
        var allElements: Array<number | null | undefined> = JSON.parse(localStorage.getItem('allGamesFav') || '""');
        if(allElements.includes(id)) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}