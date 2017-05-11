$(function(){
    var cx=$(window).width();
    if(cx<1077){
        $(".head1").css("display","none");
        $(".head2").css("display","block");
    }else{
        $(".head1").css("display","block");
        $(".head2").css("display","none");
    }

    $(window).resize(function(){
        var cx=$(window).width();
        if(cx<1077){
            $(".head1").css("display","none");
            $(".head2").css("display","block");
        }else{
            $(".head1").css("display","block");
            $(".head2").css("display","none");
        }

    })



    var flag=true;
    $(".caidan").click(function(e){
        e.preventDefault();
        if(flag){
            $(".erji").stop(true).slideDown("slow");
            flag=false;
        }else{
            $(".erji").stop(true).slideUp("slow");
            flag=true;
        }

    })


    //技能楼层
   $(".data-box").each(function(i){
       $(this).hover(function(){
           //alert(index);
           $(".sanjiao").eq(i).css("transform","rotate(180deg)");
           $(".desc").eq(i).attr("data-role","animate-down");
       },function(){
           $(".sanjiao").eq(i).css("transform","rotate(0deg)");
           $(".desc").eq(i).attr("data-role","animate-up");
       })
   })


    $(".title span").css({
            transform:"scale(0.5,0.5)"
    })
    

    $(".down").click(function(e){
        e.preventDefault();
        var index=$(this).parent().index();
        if(index==0){
            $(".center h6").each(function(i){
                 $(this).css({
                      animation:"move 1s linear "+0.2*i+"s forwards",
                      transformOrigin:"center top"
                 })
            })
        }

        $('html,body').animate({scrollTop:$(".floor").eq(index+1).offset().top},1000,function(){
            $(".title span").eq(index).css({
                transform:"scale(1,1)"
            })
            if(index==1){
                $(".data-box").attr("data-role","animate-standup");
            }
            if(index==2){
                $(".images").attr("data-role","animate-long");
            }

        });
    })


    //回到顶部
    $(".up").click(function(){
            $('html,body').animate({
                scrollTop:0
            },1500)
        }

    )






     function mousewheel(obj,upfun,downfun){
         if(obj.attachEvent){
             obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
         }else if(obj.addEventListener){
             obj.addEventListener("mousewheel",scrollFn,false);
             //chrome,safari -webkit
             obj.addEventListener("DOMMouseScroll",scrollFn,false);
             //firefox -moz-
         }
         function scrollFn(e){
             var ev=e||window.event;

             if (ev.preventDefault ){
                 ev.preventDefault();
             }//阻止默认浏览器动作(W3C)
             else{
                 ev.returnValue = false;//阻止默认浏览器动作IE
             }



             if(ev.detail==-3||ev.wheelDelta==120){
                 if(upfun){
                     upfun.call(obj);
                 }
             }else if(ev.detail==3||ev.wheelDelta==-120){
                 if(downfun){
                     downfun.call(obj);
                 }
             }

         }

     }

     var ch1=$(".floor:nth-of-type(1)").offset().top;
     var ch2=$(".floor:nth-of-type(2)").offset().top;
     var ch3=$(".floor:nth-of-type(3)").offset().top;
     var ch4=$(".floor:nth-of-type(4)").offset().top;
     var ch5=$(".floor:nth-of-type(5)").offset().top;
     console.log(ch1,ch2,ch3,ch4,ch5);//每个楼层距离body顶部的距离
     
     var arr=[ch1,ch2,ch3,ch4,ch5];
     var i=0;
     var flag=true;
     mousewheel($(window)[0],function(){

        if(flag){
            flag=false;
            i--;
            if(i<0){
                i=0;
            }
            $("body").animate({scrollTop:arr[i]},1000,function(){
                    flag=true;
            });
        }

     },function(){
         if(flag){
             flag=false;
             i++;
             if(i==5){
                 i=4;
             }

             $("body").animate({scrollTop:arr[i]+"px"},1000,function(){
                 flag=true;
                 if(i==1){
                     $(".center h6").each(function(index){
                         $(this).css({
                             animation:"move 1s linear "+0.1*index+"s forwards",
                             transformOrigin:"center top"
                         })
                     })
                     $(".title span").eq(1).css({
                         transform:"scale(1,1)"
                     })

                 }
                 if(i==2){
                     $(".data-box").attr("data-role","animate-standup");
                 }
                 if(i==3){
                     $(".images").attr("data-role","animate-long");
                 }
             });
         }


     })


     $(".send").click(function(){
         alert("提交成功");
         //location.reload();
         var val1=$("#text").val();
         var val2=$("#email").val();
         setCookie("aa",val1,15);
         setCookie("bb",val2,15);
     })



     function setCookie(key,value,times){
         if(times==undefined){
             document.cookie=key+"="+value+";"
         }else{
             var _date=new Date();//获取当前时间
             _date.setTime(_date.getTime()+times*1000*3600);//单位是毫秒

             document.cookie=key+"="+value+";expires="+_date.toGMTString()+";"
         }
     }

     function getcookie(objname){//获取指定名称的cookie的值
         var arrstr = document.cookie.split("; ");
         for(var i = 0;i < arrstr.length;i ++){
             var temp = arrstr[i].split("=");
             if(temp[0] == objname) return unescape(temp[1]);
         }
     }

     var val1=getcookie("aa");
     var val2=getcookie("bb");

     //if(val1!=undefined){
     $("#text").val(val1)
     $("#email").val(val2)
     //}


 })