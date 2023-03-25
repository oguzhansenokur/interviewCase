export const LoginFunc = ({token='2866d48220af33c1865bc5d4fa2c7b74a3616efb4bdb2c9a773c9cf6af14ff19'}) => {
    localStorage.setItem('token', token)
    window.location.reload();
}
export const Logout = () => {
    localStorage.clear()
    window.location.reload();
}
export const isLogin = () => {
    if(localStorage.getItem('token')) {
        return true;
    }
    else {
        return false;
    }
}