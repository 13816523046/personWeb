$(function(){
    var cx=$(window).width();
    if(cx<=730){
        $(".header1").css("display","none");
        $(".header2").css("display","block");
        $(".foot1").css("display","none");
        $(".foot2").css("display","block");
    }else{
        $(".header1").css("display","block");
        $(".header2").css("display","none");
        $(".foot1").css("display","block");
        $(".foot2").css("display","none");
    }
    $(window).resize(function(){
        var cx=$(window).width();
        if(cx<=730){
            $(".header1").css("display","none");
            $(".header2").css("display","block");
            $(".foot1").css("display","none");
            $(".foot2").css("display","block");
        }else{
            $(".header1").css("display","block");
            $(".header2").css("display","none");
            $(".foot1").css("display","block");
            $(".foot2").css("display","none");
        }

    })
    $(".l").click(function(e){
        e.preventDefault();
        $(".l-hid").finish();
         $(".l-hid").slideToggle("slow");
    })
    $(".aa").each(function(i){
        $(this).click(function(e){
            e.preventDefault();
            $(".aa ul").eq(i).finish();
            $(".aa ul").eq(i).slideToggle("slow");
        })
    })


    var i=0;
    $(".links li").eq(0).css({background:"none",border:"1px solid #08c"})
    var t=setInterval(move,3000);
    function move(){
        i++;
        if(i==$(".banner").length-1){
            $(".background").animate({marginLeft:-i*100+"%"},"slow",function(){
                $(".background").css({marginLeft:0*100+"%"})
            });
            i=0;
        }
        $(".background").animate({marginLeft:-i*100+"%"},"slow");
        $(".links li").css({background:"#999",border:"none"})
        $(".links li").eq(i).css({background:"none",border:"1px solid #08c"})
    }
    function move2(){
        i--;
        if(i==-1){
            $(".background").animate({marginLeft:0*100+"%"},"slow");
            i=0;
            return;//必须添加，不然会一直循环.
        }
        $(".background").animate({marginLeft:-i*100+"%"},"slow");
        $(".links li").css({background:"#999",border:"none"})
        $(".links li").eq(i).css({background:"none",border:"1px solid #08c"})
    }
    $(".banner-box").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,3000);
    })

    $(".links li").click(function(){
        var index=$(this).index();
        $(".links li").css({background:"#999",border:"none"});
        $(this).css({background:"none",border:"1px solid #08c"});
        $(".background").animate({marginLeft:-index*100+"%"},"slow");
        i=index;

    })

    //touch.config({
    //    tap:true,                  //tap类事件开关, 默认为true
    //    doubleTap: true,            //doubleTap事件开关， 默认为true
    //    hold: true,                 //hold事件开关, 默认为true
    //    holdTime: 650,              //hold时间长度
    //    swipe: true,                //swipe事件开关
    //    swipeTime: 300,             //触发swipe事件的最大时长
    //    swipeMinDistance: 18,       //swipe移动最小距离
    //    swipeFactor: 5,             //加速因子, 值越大变化速率越快
    //    drag: true,                 //drag事件开关
    //    pinch: true,                //pinch类事件开关
    //})
    var marg;
    touch.on(".background","dragstart",function(e){
        marg=$(".background")[0].offsetLeft;
        console.log(marg);
    })
    touch.on(".background","drag",function(e){
        $(".background").css("marginLeft",marg+e.x);
    })
    touch.on(".background","dragend",function(e){
        console.log(Math.abs(e.x));
        if(Math.abs(e.x)>300|| e.factor<=5){
            if(e.direction=="left"){
                move();
            }else if(e.direction=="right"){
                move2();
            }
        }else{
             $(".background").animate({marginLeft:-i*100+"%"},"slow");
        }
    })
    $(".background").mousedown(function(e){
        e.preventDefault();
    })

    //touch.on(".rotate","touchstart",function(e){
    //    e.startRotate();
    //})
    //touch.on(".rotate","rotate",function(e){
    //    var totalAngle= e.rotation;
    //    $(this).css('transform','rotate(' + totalAngle + 'deg)')
    //})

})