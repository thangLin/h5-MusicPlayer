var Duration = function(dom){
    this.dom = dom;
}//持续时间对象，（左右 - 两边各需要一个该对象）
Duration.prototype.showTime = function (duration){
    this.dom.innerHTML = this._formatTime(duration);
}
Duration.prototype._formatTime = function(durTime){//格式化时间  （在span里显示）
    var minutes = Math.floor(durTime/60),
        seconds = durTime - minutes*60,
        str = '';
    minutes < 10 == true ?
         str = str +　 0 + minutes +　":":
         str = str +  minutes +　":";
    seconds < 10 == true ?
        str = str + 0 + seconds:
        str = str + seconds;
    return str;
}
