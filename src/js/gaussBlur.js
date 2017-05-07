// 模糊图片

var worker = new Worker('./src/js/gaussWorker.js');

// 创建  worker  线程加载  减少主线程的负担。
function blurImg(img, ele) {
    // ele is a dom
    var w = img.width,
        h = img.height,
        canvasW = 60,
        canvasH = 60;
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = canvasW;
    canvas.height = canvasH;

    ctx.drawImage(img, 0, 0, w, h, 0, 0, canvasW, canvasH);

    var pixel = ctx.getImageData(0, 0, canvasH, canvasH);

    worker.postMessage(pixel);
    worker.onmessage = function(evt){
        var d = evt.data;
        ctx.putImageData(d, 0, 0);
        // console.log(pixel)
        var imageData = canvas.toDataURL();
        ele.style.backgroundImage =  'url(' + imageData + ')';
    };

}