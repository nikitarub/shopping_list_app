function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}


function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }
  

function checkAuth(){
    let userID = getCookie("userID");
    console.log("userID: ", userID);
    if (userID == undefined) {
        console.log("HREF: ", window.location.pathname);
        if (window.location.pathname != "/start"){
            console.log("Opening start");
            window.open('/start', '_self');
        }
        
    }
}

function auth(user_id){
    setCookie("userID", user_id);
    window.open('/', '_self');
}


function logout(){
    // prompt
    deleteCookie("userID");
    window.open('/start', '_self');
}


export {getCookie, setCookie, deleteCookie, checkAuth, auth, logout};