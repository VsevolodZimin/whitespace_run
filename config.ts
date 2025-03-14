const config = {
    getImgPath: (name: string) => {
        const x = `${ import.meta.env.VITE_ASSETS_PATH}/img/${name}`;
        return x;
    },

    getSoundPath: (name: string) => {
        return `${ import.meta.env.VITE_ASSETS_PATH}/sounds/${name}`;
    },

    getFontPath: (name: string) => {
        return `${ import.meta.env.VITE_ASSETS_PATH}/fonts/${name}`;
    }
};

export { config }