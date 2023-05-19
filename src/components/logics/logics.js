export const getName = (user) => {
    const userName = user.name;
    return userName.split(" ")[0];
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
