!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null;var o=function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))};t.addEventListener("click",(function(){n||(o(),n=setInterval(o,500),t.setAttribute("disabled","true"))})),e.addEventListener("click",(function(){clearInterval(n),n=null,t.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.2bd7b54f.js.map