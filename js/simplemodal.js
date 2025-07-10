var simpleModalCookieName = 'simplemodal-show';

var getSimpleModalCookie = function(cookieName) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var setSimpleModalCookie = function(cookieName, cookieValue, cookieExpires) {
    var options = {};
    var expires = cookieExpires;
  
    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = cookieExpires = d;
    }
    if (expires && expires.toUTCString) {
      cookieExpires = expires.toUTCString();
    }
  
    cookieValue = encodeURIComponent(cookieValue);
  
    var updatedCookie = cookieName + "=" + cookieValue;
  
    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
  
    document.cookie = updatedCookie;
}

var checkSimpleModalCookie = function(cookieName) {
    var result = getSimpleModalCookie(cookieName);

    return typeof result === 'undefined' || Number(result) === 0 
        ? false 
            : true;
}


window.onload = function(event) {
    var checkCookieResult = checkSimpleModalCookie(simpleModalCookieName);

    if(!checkCookieResult) {
        var simpleModal = document.getElementById('simplemodal');
        if (simpleModal) {
            simpleModal.style.display = 'flex';
        }

        var simpleModalButton = document.getElementById('simplemodal-ok');
        if(simpleModalButton) {
            simpleModalButton.onclick = function(event) {
                setSimpleModalCookie(simpleModalCookieName, 1, 365 * 24 * 60 * 60);
                simpleModal.style.display = 'none';
            }
        }
    }
}
