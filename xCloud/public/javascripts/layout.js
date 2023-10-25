window.onload = () => {
  const themeBtn = document.getElementById("themeBtn");
  const root = document.documentElement;

  themeBtn.onclick = () => {
    themeBtn.style;
  };
  let isDarkMode;
  if (window.matchMedia) {
    isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else {
    isDarkMode = false;
  }

  if (isDarkMode) {
    themeBtn.style.backgroundImage = "url( '/images/theme/sun.svg' )";
  } else {
    themeBtn.style.backgroundImage = "url( '/images/theme/moon.svg' )";
  }

  themeBtn.onclick = () => {
    if (isDarkMode) {
      root.style.setProperty("--txt", "#130e01");
      root.style.setProperty("--txt-a", "#926b08");
      root.style.setProperty("--bg-pri", "#fffaeb");
      root.style.setProperty("--bg-pri-a", "#fcefcf");
      root.style.setProperty("--bg-sec", "#fae09e");
      root.style.setProperty("--bg-sec-a", "#f9d886");
      root.style.setProperty("--bg-ter", "#f7d06e");
      root.style.setProperty("--bg-ter-a", "#f6c955");
      root.style.setProperty("--fg-pri", "#ff8400");
      root.style.setProperty("--fg-pri-a", "#cc6900");
      root.style.setProperty("--fg-sec", "#cf4307");
      root.style.setProperty("--fg-sec-a", "#ac3806");

      isDarkMode = false;
      themeBtn.style.backgroundImage = "url( '/images/theme/moon.svg' )";
    } else {
      root.style.setProperty("--txt", "#fef9ec");
      root.style.setProperty("--txt-a", "#f8d26d");
      root.style.setProperty("--bg-pri", "#140f00");
      root.style.setProperty("--bg-pri-a", "#181201");
      root.style.setProperty("--bg-sec", "#312303");
      root.style.setProperty("--bg-sec-a", "#483505");
      root.style.setProperty("--bg-ter", "#614705");
      root.style.setProperty("--bg-ter-a", "#795906");
      root.style.setProperty("--fg-pri", "#ff8400");
      root.style.setProperty("--fg-pri-a", "#ff9523");
      root.style.setProperty("--fg-sec", "#ac3806");
      root.style.setProperty("--fg-sec-a", "#d84609");

      isDarkMode = true;
      themeBtn.style.backgroundImage = "url( '/images/theme/sun.svg' )";
    }
  };
};
