function vwTOpx(value) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
    var result = (x*value)/100;
    return result;
  }

function pxTOvw(value) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
    var result = (100*value)/x;
    return result;
  }

export { vwTOpx, pxTOvw};
