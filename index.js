// From https://www.quirksmode.org/js/findpos.html
function findPos(obj) {
    var curleft = curtop = 0;

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return [curleft, curtop];
    }
}

function centerSongLink(songLinkUrl) {
    refUrl = new URL(songLinkUrl)
    document.querySelectorAll("a.song-link").forEach(a => {
        linkUrl = new URL(a.href)
        if (linkUrl.href === refUrl.href) {
            window.scroll({
                top: findPos(a)[1] - (window.innerHeight / 2),
                left: 0,
                behavior: 'instant'
            })
            return;
        }
    }, true)
}

window.addEventListener('DOMContentLoaded', e => {
    if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
        centerSongLink(document.referrer)
    }
})
