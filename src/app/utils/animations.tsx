export const animateErrorComponent = (commented: boolean, errorMsg: string, mL?: number | 0) => {
    if(!commented && errorMsg !== "") {
        return { marginLeft: (mL)+"px", opacity: 1, height: "auto", padding: "10px", transition: "opacity 0.3s linear" }
    } else {
        return { marginLeft: (mL)+"px", opacity: 0, height: "0px", padding: "0px", transition: "opacity 0.3s linear" }
    }
}