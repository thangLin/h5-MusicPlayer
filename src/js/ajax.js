function getSong(url,callback){
    $.ajax({
        url:url,
        type:"GET",
        success:callback,
        error:function(e){
            console.log(e);
        }
    })
}