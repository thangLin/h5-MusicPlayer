  var AudioPlayer =  function(){
      this.sonPlay = null;//点击播放和 暂停的  span - dom节点
      this.audio = new Audio();//音频对象
      this.status = 'pause';
      this.progressBar = null;//进度条对象
  }
  
  AudioPlayer.prototype = {
      pause:function(){
                        this.audio.pause();
                        this.sonPlay.pause();
                        this.progressBar.pausePlay();
                        this.status = 'pause';
                      },
      play:function(){
                        this.audio.play();
                        this.sonPlay.play();
                        this.progressBar.startPlay();
                        this.status = 'play';
                      },
      jumpToPlay:function(jumpRate){
        this.audio.currentTime = (jumpRate * this.audio.duration);
        //跳转音频当前播放 帧 （以秒计）
      },//提供接口方法  让controller对象可以调用
      setSource:function(src,durationTime){
        this.audio.src = src;
        this.audio.load();
        this.progressBar.initPlay(durationTime);
        if(this.status == 'play'){
            this.play();
         }
      },
  }
  
