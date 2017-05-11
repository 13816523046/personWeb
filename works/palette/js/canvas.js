$(function(){
    var box=$(".box");
    var copy=$(".copy");
    var canvas=$("canvas");
    var canobj=canvas[0].getContext("2d");

    $(".parent").hover(function(){
       $(this).find($(".son")).finish();
       $(this).find($(".son")).show("slow");
    },function(){
        $(this).find($(".son")).finish();
        $(this).find($(".son")).hide("slow");
    })


    var xp=$(".xp");


    var obj=new shape(copy[0],canvas[0],canobj,xp,$(".selectarea"));

    var files=$(".parent:eq(0)").find(".son li");
    files.click(function(){
        var index=$(this).index();
        if(index==1){
            if(obj.history.length!=0){
                var yes=window.confirm("是否保存");
                if(yes){
                    location.href=canvas[0].toDataURL().replace("data:image/png","data:stream/octect");

                }else{
                    canobj.clearRect(0,0,canvas[0].width,canvas[0].height);
                }
            }else{
                return;
            }
        }
        if(index==0){
            if(obj.history.length>0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
                }
            }
            obj.history=[];
            canobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }
    })

    var kinds=$(".parent:eq(1)").find(".son li");
    kinds.click(function(){
         obj.shapes=$(this).attr("data-role");
        obj.draw();
    })

    var types=$(".parent:eq(2)").find(".son li");
    types.click(function(){
        obj.type=$(this).attr("data-role");
        obj.draw();
    })

    var colors=$(".parent:eq(3)").find(".son li>input");
    colors.change(function(){
        obj.bgcolor=$(this).val();
        obj.draw();
    })

    var colors1=$(".parent:eq(4)").find(".son li>input");
    colors1.change(function(){
        obj.bordercolor=$(this).val();
        obj.draw();
    })

    var size=$(".parent:eq(5)").find(".son li");
    size.click(function(){
        obj.lineWidth=$(this).attr("data-role");
        obj.draw();
    })

    var xpsize=$(".parent:eq(6)").find(".son li");
    xpsize.click(function(){
        var tm=xp.css("opacity");
        if(tm=="0"){
            xp.css("opacity","1");
        }
        var w=$(this).attr("data-role");
        var h=$(this).attr("data-role");
        obj.xp($(".xp"),w,h);

        $(".parent li").not($(".xp2 li")).click(function(){
            var tm2=xp.css("opacity");
            if(tm2=="1"){
                xp.css("opacity","0");
            }
        })
    })


    $(".before").click(function(){
        obj.before();
    })

    $(".select").click(function(){

        obj.select($(".selectarea"));


    })


    //obj.draw();



})