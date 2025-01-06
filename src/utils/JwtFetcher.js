const getJwt = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "jwt") {
            return value;
        }
    }
    window.location.href = "/";
};

export default getJwt;