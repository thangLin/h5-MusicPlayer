var BtnClick = function(clickDom,togClassArr){
    this.dom = clickDom;
    this.arr = togClassArr;
}
BtnClick.prototype.play = function(){
    this.dom.className = this.arr[0] + " " +  this.arr[1];
}
BtnClick.prototype.pause = function(){
    this.dom.className = this.arr[0];
}   