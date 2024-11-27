/**
 * Sets up event listeners and cookie management for the cookie consent banner.
 * This function is executed once the DOM content is fully loaded.
 * It displays the cookie consent banner if the user hasn't already accepted cookies,
 * and sets a cookie to remember the user's choice.
 * 
 * @listens document#DOMContentLoaded - Executes when the DOM content is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  
    /**
     * Sets a cookie with the given name, value, and expiration in days.
     * 
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value to be set for the cookie.
     * @param {number} [days] - The number of days until the cookie expires. If not provided, the cookie expires when the session ends.
     */
    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    /**
     * Retrieves the value of a cookie by its name.
     * 
     * @param {string} name - The name of the cookie to retrieve.
     * @returns {string|null} - The value of the cookie if found, otherwise `null`.
     */
    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
    let cookieBar = document.getElementById("cookie-bar");
    let acceptCookiesButton = document.getElementById("accept-cookies");
    if (!getCookie("cookies-accepted")) {
      cookieBar.style.display = "block";
    }
    acceptCookiesButton.addEventListener("click", () => {
      setCookie("cookies-accepted", "true", 365);
      cookieBar.style.display = "none";
    });
  });
  