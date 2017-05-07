// 。。。。代理对象

var btnController = {
    'songScope':0,//总歌曲 个数  
    'oData':null,//获取到的歌曲信息数组
    'idx':0,//当前歌曲播放  在数组中的index
    'audio':null,//被控制使用的音频对象
    'likeBtnObj':null,//点击喜欢  的span  dom对象
    'timeSpanObj':null,//当前歌曲的总时长
    '_func':null,//引用外部渲染函数  （只提供给内部使用）
    '_common':function(){//提取的公共行为执行函数  （只提供给内部使用）
        var _obj = this['oData'][this['idx']];

        this['_func'](_obj,domPool['songinfoDom'],domPool['sonimgDom']);

        this['likeBtnObj']['show'](_obj.isLike);
        this['timeSpanObj']['showTime'](_obj.duration);
        this['audio']['setSource'](_obj.audio,_obj.duration); 
    },
    'init':function(obj){
        this['audio'] = obj;
        this['_common']();
    },
    'next-btn': function(){
        if (this['idx'] === this['songScope'] - 1){
            this['idx'] = 0;    
        }else{
            this['idx']++;            
        }   
        this['_common']();        
    },
    'prev-btn':function(){
        if (this['idx'] === 0){
            this['idx'] = this['songScope'] - 1;      
        }else{
            this['idx']--;  
        }
        this['_common']();              
    },
    'play-btn':function(){
        var oAudio = this.audio;
        if(oAudio.status == 'pause'){
            oAudio.play();
        }else if(oAudio.status == 'play'){
            oAudio.pause();
        }
    },
    'like-btn':function(){
        var flag = this['oData'][this['idx']].isLike;

        flag ?
            this['likeBtnObj']['pause']():
            this['likeBtnObj']['play']();
        this['oData'][this['idx']].isLike = !flag;

    }
}