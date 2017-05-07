
function renderInfo(obj,dom,imgDom){
    
    var html = '<h1>'+obj.song+'</h1>\
                <h3>'+obj.lyric+'</h3>\
                <h3>'+obj.rhythm+'</h3>\
                <h3>'+obj.album+'</h3>\
                <h3>'+obj.singer+'</h3>';
    dom.innerHTML = html;
    preload(obj.image,document.getElementById('test'),blurImg);
    // proxyimg  introduced
}
