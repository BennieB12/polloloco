document.addEventListener("DOMContentLoaded", () => {
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ").reduce((acc, currentCookie) => {
      const [key, value] = currentCookie.split("=");
      acc[key] = decodeURIComponent(value || "");
      return acc;
    }, {});
    return cookies[name] || null;
  }

  const cookieBar = document.getElementById("cookie-bar");
  const acceptCookiesButton = document.getElementById("accept-cookies");

  if (getCookie("cookies-accepted") === "true") {
    cookieBar.style.display = "none";
  } else {
    cookieBar.style.display = "block";
  }

  acceptCookiesButton.addEventListener("click", () => {
    setCookie("cookies-accepted", "true", 365);
    cookieBar.style.display = "none";
  });
});
