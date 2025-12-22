const dynamicFavicon = `const favicon = document.querySelector('link[rel="icon"]')

document.addEventListener("visibilitychange", () => {
  
    const state = document.hidden ? "-inactive" : "";


    var storedTheme = localStorage.getItem("theme");
    var prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (state) {
        favicon.setAttribute("href", "/favicon" + state + ".ico")
      } else {
        favicon.setAttribute("href", "/favicon.ico")
      }
    })`;

export default dynamicFavicon;
