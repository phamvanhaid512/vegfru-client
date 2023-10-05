
export const getName = (user) => {
    const userName = user?.name;
    return userName?.split(" ")[0];
}
export const getExpectedTime = (dist) => {
    if (dist <= 2) return "10-15"
    else if (dist > 2 && dist <= 5) return "15-20"
    else return "30-40"
}
export const getExpectedFair = (dist) => {
    if (dist <= 2) return 15
    else if (dist > 2 && dist <= 5) return 25
    else return 40
}
export const getTax = (itemTotal) => {
    const tax = (itemTotal * (5 / 100)).toFixed(2)
    return parseInt(tax);
}
export const getStatus = (status) => {
    if (status === "Accepted") return "yellow"
    else if (status === "Processing") return "blue"
    else if (status === "Out for Delivery") return "purple"
    else return "green"
}
export const getValue = (status) => {
    if (status === "Accepted") return "1"
    else if (status === "Processing") return "2"
    else if (status === "Out for Delivery") return "3"
    else return "4"
}
export const getDate = (date) => {
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const newDate = new Date(date);
    return `${day[newDate.getDay()]} ${month[newDate.getMonth()]} ${newDate.getDate()}-${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
}
export const isLogin = () => {
    const isAuth = JSON.parse(localStorage.getItem("auth"));
    if(isAuth !== null && isAuth === true){
        return true;
    }
    else false;
}
