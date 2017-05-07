var domPool = {
    'songinfoDom':document.getElementsByClassName('song-info')[0],
    'songimgDom':document.getElementsByClassName('img-wrap')[0],
    'play-btn':document.getElementsByClassName('play-btn')[0],
    'like-btn':document.getElementsByClassName('like-btn')[0],
    'cur-time':document.getElementsByClassName('cur-time')[0],
    'all-time':document.getElementsByClassName('all-time')[0],
    'pro-top':document.getElementsByClassName('pro-top')[0],
    'pro-wrap':document.getElementsByClassName('pro-wrap')[0],
    '$playControl':$('.play-control')
}//把需要用到的dom存入一个对象中   方便人查看。

var playBtn = new BtnClick(domPool['play-btn'],['play-btn','playing']),
    likeBtn = new BtnClick(domPool['like-btn'],['like-btn','liked']),
    timeSpan = new Duration(domPool['all-time']),
    leftTimeSpan = new Duration(domPool['cur-time']),
    progressBarDom = domPool['pro-top'],
    progressBar = new ProgressBar(leftTimeSpan,progressBarDom);
// 添加likebtn方法  以便进行  likebtn的特殊化处理

//切换歌曲时候  需要查看这首歌是否被  点击喜欢过

//从写  show方法
likeBtn.show = function(isliked){
    if(isliked == true){
        this.play();
    }else if(isliked == false){
        this.pause();
    }
}

//处理audioPlayer 对象。
var audioPlayer = new AudioPlayer();

audioPlayer.sonPlay = playBtn;
audioPlayer.progressBar = progressBar;

//绑定歌曲播放结束后的函数
$(audioPlayer.audio).on('ended',function(){
        btnController['next-btn']();
})


//   添加需要处理的控制对象  处理btnController对象.

btnController['_func'] = renderInfo;
btnController['likeBtnObj'] = likeBtn;
btnController['timeSpanObj'] = timeSpan;

//ajax获取数据
getSong('./data/data.json',function(data){
    btnController['oData'] = data;
    btnController['songScope'] = data.length;
    btnController['init'](audioPlayer);
});

//绑定滑动进度条时间
(function(){
    var width = domPool['pro-wrap'].offsetWidth,
        ofLeft = domPool['pro-wrap'].offsetLeft,
        oStatus,//状态记录--变量
        oPercent;
    $('.slide-point').eq(0).on('touchstart',function(e){
          oStatus =  btnController['audio']['status'];
          //记录触摸前的 播放状态
          //自己写的函数当暂停的时候会改变它本身的状态；
          btnController['audio']['pause']();
    }).on('touchmove',function(e){
        var touchLeft = e.changedTouches[0].clientX;
        oPercent = (touchLeft - ofLeft)/width;
        if(oPercent >= 0 && oPercent <=1){
             btnController['audio']['jumpToPlay'](oPercent);  
        }
    }).on('touchend',function(e){
        if(oStatus == 'play'){
            btnController['audio']['play']();
            oStatus == 'pause'; 
        }
    })
    //将函数  绑定放在一个立即执行函数里   这样使得 全局变量  变少。
}());


domPool['$playControl'].on('click',function(eve){
    var tar = eve.target||window.event.srcElement;

    //判断点击的span 的class从而做出相对的行为
    var oClick = returnClassName(tar.className);
    //代理模式  应用
    if(btnController[oClick]){
        btnController[oClick]();
    } 
});





// ../  自定义判断函数 ，逻辑太简单  不用封装

//用于处理上面点击  后的class属性


function returnClassName(str){
    if(str.indexOf('playing') != -1){
        return 'play-btn';            
    }else if(str.indexOf('liked') != -1){
        return 'like-btn';
    }else{
         return str;        
    }
}






