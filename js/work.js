$(function(){
    $(".box").each(function(i){
        $(this).hover(function(){
            $(".ap>span").eq(i).stop(true).animate({width:100},300)
        },function(){
            $(".ap>span").eq(i).stop(true).animate({width:0},300)
        })
    })


    var colorarr=["#33302b","deeppink","#AB1E81","#4CB748","#000","brown","#4CB748","deeppink","#33302b","#AB1E81"];
    var imgUrl=["images/000.png","images/555.png","images/333.png","images/111.png","images/liantu.png","images/baidu.png","images/222.png","images/444.png","images/666.png","images/777.png"]
    $(".td").each(function(i){
        $(this).css("background",colorarr[i]);
    });
    $(".tu").each(function(i){
        $(this).css({
            background:"url('"+imgUrl[i]+"')",
            backgroundSize:"cover"
        });
    });


    var ch=$(window).height();

    var pbox=$(".box");

    var sct=$("body").scrollTop();

    for(var i=0;i<pbox.length;i++){
        var aa=pbox[i].offsetTop
        if(sct+ch/2>aa){
            $(pbox[i]).css({
                transform:"scale(1,1)"
            })
            $(pbox[i]).animate({opacity:1},1000)
        }
    }


    $(window).scroll(function(){
        var sct=$("body").scrollTop();

        for(var i=0;i<pbox.length;i++){
            var aa=pbox[i].offsetTop
            if(sct+ch/2>aa){
                $(pbox[i]).css({
                    transform:"scale(1,1)"
                })
                $(pbox[i]).animate({opacity:1},1000)
            }
        }
    })




})