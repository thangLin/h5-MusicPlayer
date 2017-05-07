//   进度条对象    因为有拖动事件  所以需要控制左边的Timespan

// _______________Date() 对象  当被赋值后，getTime不会变
// getTime 得到的是毫秒数
// 例如 ： var  a = new Date();
// a.getTime()  == 10s 后的  a.getTime(); 
//

//animationFrame  和  event对象  都是绑定到window对象上的，需要注意内部this指向。
var ProgressBar = function(timeDomObj,barDom){
    this.barDom = barDom;  
    this.timeDom = timeDomObj;
}
ProgressBar.prototype = {
    curDuration:0,
    playedTime:0,
    startTime:0,
    frameId:'',
    _transveter:function(time){
        var percent = (1- time/this.curDuration)*100;
        return -percent + '%';
    },//将时间转换为百分比 -- 供进度条使用  （该函数仅限于内部使用）
    jumpTo:function(jumpRate){
        var oDurTime = this.curDuration;
        this.playedTime = Math.round(jumpRate * oDurTime*1000);
        //因为是毫秒数  所以需要乘 1000；
        this.barDom.style.transform = 'translateX('+ -(1 - jumpRate)*100 +'%)';
        //进度条直接移动到touchend结束时的地方
        this.timeDom['showTime'](Math.round(jumpRate* oDurTime))
        //因为我写的方法没有 处理小数点  所以这里加个math  方法处理。

    },//提供接口方法，让audioPlayer对象可以直接调用；
    barSlide:function(playedTime){
        var processRate = this._transveter(playedTime)
        this.barDom.style.transform = 'translateX('+  processRate +')';
    },//直接控制进度条，不需要像--时间span---一样引入一个对象
    startPlay:function(){
        this.startTime = new Date().getTime();
        cancelAnimationFrame(this.frameId);
        var _self = this,
            lastTotalTime = 0;
            //添加一个判断 可以提高性能，让子类里的函数到该执行的时间  才执行，
            //不然每次都执行  感觉十分耗费性能。
        var AiFrame = function(){
            var curTime = new Date().getTime(),
                passedTime = curTime - _self.startTime,
                totalTime = Math.round((_self.playedTime + passedTime)/1000);
            if(lastTotalTime == totalTime){
               return _self.frameId = requestAnimationFrame(AiFrame);
               //如果没有 增加一秒  ，就不 更新进度条  和  时间；
               //并且不更新  该函数里的 lastTotalTime （该startPlay里的上次已经播放的总时间 -- 非该porgressBar 对象的已播放时间）
            }else if(totalTime <= _self.curDuration){
                _self.barSlide(totalTime);                
                _self.timeDom['showTime'](totalTime);     
                _self.frameId = requestAnimationFrame(AiFrame)
            }else{
                _self.barDom.style.transform = 'translateX(-0%)';//进度条 运动到边界
                _self.timeDom['showTime'](_self.curDuration);//总时间
                cancelAnimationFrame(_self.frameId);
            }
            lastTotalTime = totalTime;
         }
         AiFrame()
    },
    pausePlay:function(){
        cancelAnimationFrame(this.frameId);
        this.playedTime += new Date().getTime() - this.startTime;
        //playedTime 得到的是毫秒数  
    },
    initPlay:function(duration){
        this.playedTime = 0;
        //清空上次播放过的时间。
        this.curDuration = duration;
        //初始化最新一次的总播放播放时间。
        this.barDom.style.transform = 'translateX(-100%)';
        this.timeDom['showTime'](0);    
    }
}

