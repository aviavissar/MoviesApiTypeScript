export const getLocalStorage = (key: string) => {
    try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const setLocalStorage = (key: string, value: any) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};