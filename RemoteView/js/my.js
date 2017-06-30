var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
var mousedownEvt = null;
var mouseMoveEvt = null;

if (image.attachEvent) {
    //IE处理
    image.attachEvent('oncontextmenu', function (e) { rightclick(e); });
    image.attachEvent('onmousedown', function (e) { mouseDown(e); });
    image.attachEvent('onmouseup', function (e) { mouseUp(e); });
    image.attachEvent('onload', setReloadTimeout);
    image.attachEvent('onmousemove', function (e) { mouseMove(e); mouseMoveUpdate() });

} else {
//非IE处理
    image.addEventListener('contextmenu', function (e) { rightclick(e); });
    image.addEventListener('mousedown', function (e) { mouseDown(e); });
    image.addEventListener('mouseup', function (e) { mouseUp(e); });
    image.addEventListener('load', setReloadTimeout);
    image.addEventListener('mousemove', function (e) { mouseMove(e); mouseMoveUpdate() });
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
    setTimeout('imageLoader();', 1000);
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