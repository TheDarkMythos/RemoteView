var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
var mousedownEvt = null;
var mouseMoveEvt = null;

if (image.attachEvent) {
    //IE处理
    image.attachEvent('oncontextmenu', function (e) { rightclick(e); });
    image.attachEvent('onmousedown', function (e) { mouseDown(e); });
    image.attachEvent('onmouseup', function (e) { mouseUp(e); });
    document.body.attachEvent('onkeydown', function (e) { keyDown(e); });
    image.attachEvent('onload', setReloadTimeout);
    //image.attachEvent('onmousemove', function (e) { mouseMove(e); mouseMoveUpdate() });

} else {
//非IE处理
    image.addEventListener('contextmenu', function (e) { rightclick(e); });
    image.addEventListener('mousedown', function (e) { mouseDown(e); });
    image.addEventListener('mouseup', function (e) { mouseUp(e); });
    document.body.addEventListener('keydown', function (e) { keyDown(e); });
    image.addEventListener('load', setReloadTimeout);
    //image.addEventListener('mousemove', function (e) { mouseMove(e); mouseMoveUpdate() });
}

setInterval('imageLoader();', 5555);
setInterval('mouseMoveUpdate();', 333);
function mouseMoveUpdate() {
    if (mouseMoveEvt === null) return;
    e = mouseMoveEvt
    px = e.offsetX ? e.offsetX : e.pageX - document.getElementById("image").offsetLeft;
    py = e.offsetY ? e.offsetY : e.pageY - document.getElementById("image").offsetTop;
    mouseMoveEvt = null;
    var request = '/mousemove/0/' + py + '/' + px;
    http.open('GET', request, true);
    http.send();
}
function setReloadTimeout() {
    setTimeout('imageLoader();', 1);
}
function imageLoader() {
    var newImageUrl = '/screen/0/' + new Date() / 1;
    document.getElementById("image").src = newImageUrl;
}
function cancelUiEvts(e) {
    e = window.event || e;
    if (document.all) {  //只有ie识别
        e.cancelBubble = true;
        e.returnValue = false;
    } else {
        e.stopPropagation();
        e.preventDefault();
    }
}
function keyDown(e) {
    e = window.event || e;
    var keynum
    var keychar
    if (window.event) // IE
    {
        keynum = e.keyCode
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which
    }
    switch (keynum) {
        case 8:
            keychar = "{BACKSPACE}";
            break
        case 9:
            keychar = "{TAB}";
            break;
        case 46:
            keychar = "{DELETE}";
            break;
        case 13:
            keychar = "{ENTER}";
            break;
        case 27:
            keychar = "{ESC}";
            break
        case 32:
            keychar = "{SPACE}";
            break;
        case 37:
            keychar = "{LEFT}";
            break;
        case 38:
            keychar = "{UP}";
            break;
        case 39:
            keychar = "{RIGHT}";
            break;
        case 40:
            keychar = "{DOWN}";
            break;
        default:
            keychar = String.fromCharCode(keynum);
            break;
    }
    if ((keynum >= 65 && keynum <= 90) && !e.shiftKey) {
        keychar = keychar.toLowerCase();
    } 
    if ((keynum >= 97 && keynum <= 122) && e.shiftKey) {
        keychar = keychar.toLowerCase();
    } 
    if (keynum >= 112 && keynum <= 123) {
        keychar = "{F" + (keynum - 111) + "}";
    }
    //CTRL+V
    if (keynum == 86 && e.ctrlKey) {
        keychar = "^v";
    }
    //CTRL+C
    if (keynum == 67 && e.ctrlKey) {
        keychar = "^c";
    }
    if (keynum == 186 && e.shiftKey) {
        keychar = ":";
    }
    if (keynum == 186 && !e.shiftKey) {
        keychar = ";";
    }
    if (keynum == 188 && e.shiftKey) {
        keychar = "<";
    }
    if (keynum == 188 && !e.shiftKey) {
        keychar = ",";
    }
    if (keynum == 190 && e.shiftKey) {
        keychar = ">";
    }
    if (keynum == 190 && !e.shiftKey) {
        keychar = ".";
    }
    try { console.log("keydown:" + keychar + "keycode:" + keynum); } catch (e) { }
    var request = '/keydown/0/' + keychar;
    http.open('GET', request, true);
    http.send();

}
function keyUp(e) {

}
function mouseDown(e) {
    cancelUiEvts(e);
    mousedownEvt = e;
}
function mouseUp(e) {
    cancelUiEvts(e);
    if (mousedownEvt === null) return;
    dx = mousedownEvt.offsetX ? mousedownEvt.offsetX : mousedownEvt.pageX - document.getElementById("image").offsetLeft;
    dy = mousedownEvt.offsetY ? mousedownEvt.offsetY : mousedownEvt.pageY - document.getElementById("image").offsetTop;
    ux = e.offsetX ? e.offsetX : e.pageX - document.getElementById("image").offsetLeft;
    uy = e.offsetY ? e.offsetY : e.pageY - document.getElementById("image").offsetTop;
    var request = '/leftclick/0/' + dy + '/' + dx + '/' + uy + '/' + ux;
    http.open('GET', request, true);
    http.send();
    mousedownEvt = null;
}
function rightclick(e) {
    cancelUiEvts(e);
    if (e === null) return;
    px = e.offsetX ? e.offsetX : e.pageX - document.getElementById("image").offsetLeft;
    py = e.offsetY ? e.offsetY : e.pageY - document.getElementById("image").offsetTop;
    var request = '/rightclick/0/' + py + '/' + px;
    http.open('GET', request, true);
    http.send();
}
function mouseMove(e) {
    mouseMoveEvt = e;
}