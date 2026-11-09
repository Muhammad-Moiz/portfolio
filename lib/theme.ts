export const THEME_KEY = "theme";

export type Theme = "light" | "dark";

export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})();`;
