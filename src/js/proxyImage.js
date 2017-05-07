//引入  封装好的 图片代理
var preload = (function(){
        let _img = new Image(),
            _arr = [];
            _img.width = 192;
            _img.height = 192;
    return function(src,dom,fn){
            if(_arr.indexOf(src) != -1){
                dom.src = src;
                fn(dom,document.getElementsByClassName('content-wrap')[0])    
                return ;
            }
            _img.src = src;
            _arr.push(src);
            _img.onload = ()=>{
                dom.src = _img.src;
                fn(dom,document.getElementsByClassName('content-wrap')[0])
            }
    }
 
})()
