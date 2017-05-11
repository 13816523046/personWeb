
function game(){
    this.cw=$(window).width();
    this.ch=$(window).height();
    this.letterArr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
    this.letterLen=5;
    this.speed=4;//下降的速度
    this.spans=[];//存放创建的span
    this.arrqu=[];//存放取出的字母
    this.posarr=[];
    this.score=0;
    this.die=10;
    this.currscore=0;
    this.num=10;
    this.scoreEle=$('.score span').eq(1);
    this.dieEle=$('.die span').eq(1);
    this.aa=1;//级别
    var that=this;
    $(window).resize(function(){
        that.cw=$(window).width();
        that.ch=$(window).height();
    });

}

game.prototype={
    play:function(){
        if(this.speed>7){
            this.speed=7;
        }
        this.getLetter(this.letterLen);
        this.move();
        this.key();
    },
    key:function(){
        var that=this;
        $(window).keydown(function(ev){
            var code=String.fromCharCode(ev.which);
            $.each(that.spans,function(i,n){
                if($(this).html()==code){
                    $(this).remove();
                    that.score++;
                    that.currscore++;
                    that.scoreEle.html(that.score);
                    that.spans.splice(i,1);//删除数组存的那个值
                    that.arrqu.splice(i,1);
                    that.posarr.splice(i,1);
                    that.getLetter(1);
                    if(that.currscore%that.num==0){//当分数到10时，升级
                        that.aa++;
                        if(that.aa>8){
                            alert('恭喜您顺利通过所有关！！！');
                            this.restart();
                        }else{
                            $(".next").css("display","block");
                            clearInterval(that.t);
                            $("#step").html(that.aa)
                            //alert('第'+that.aa+'关开始');
                            $("#go").click(function(){
                                that.next();
                                $(".next").css("display","none");
                            })

                        }

                    }
                    return false;
                }
            });
        })
    },
    restart:function(){
        clearInterval(this.t);
        this.spans=[];
        this.arrqu=[];
        this.posarr=[];
        this.speed=3;
        this.letterLen=5;
        this.currscore=0;
        this.die=10;
        this.dieEle.html(this.die);
        this.num=10;
        $('.ss').remove();
        this.play();
    },
    next:function(){
        clearInterval(this.t);
        this.spans=[];
        this.arrqu=[];
        this.posarr=[];
        this.speed++;
        if(this.speed>7){
            this.speed==7;
        }
        this.letterLen++;
        this.currscore=0;
        this.num+=10;
        $('.ss').remove();
        this.play();

    },
    move:function(){
        var that=this;
        this.t=setInterval(function(){
            $.each(that.spans,function(i,n){
                var top1=$(this).offset().top+that.speed;
                $(this).css({top:top1});
                if(top1>that.ch){
                    $(this).remove();
                    that.die--;
                    that.dieEle.html(that.die);
                    that.spans.splice(i,1);//删除数组存的那个值
                    that.arrqu.splice(i,1);
                    that.posarr.splice(i,1);
                    that.getLetter(1);
                    if(that.die==0){
                        clearInterval(that.t);
                        $(".fail").css("display","block");
                        var score2=document.getElementById("score");
                        var again=document.getElementById("again");
                        score2.innerHTML=that.score;
                        //animate(fail,{opacity:1},1000);
                        //alert("游戏结束! 您的得分为:"+that.score+"分!");
                        again.onclick=function(){
                            location.reload();//页面重载
                        }
                    }
                    return false
                }
            });
        },60)
    },

    getLetter:function(num){
        var arr=this.getRand(num);
        var posarr=[];//存放每个span的x边界值
        var that=this;
        $.each(arr,function(i,n){//i下标 n值
            var x=Math.random()*(that.cw-200)+100;
            var y=Math.random()*100;
            var width1=50;
            while(that.checkDie(that.posarr,x,width1)){//检查每个是否重叠
                x=Math.random()*(that.cw-200)+100;
            }
            posarr.push({minx:x,maxx:x+width1});
            that.posarr.push({minx:x,maxx:x+width1});
            that.spans.push($('<div>').html(n).addClass('ss').css({width:'100px',height:'100px',position:'absolute',top:y,left:x,zIndex:200,color:'#fff',fontSize:'35px',fontWeight:"600",textAlign:'center',lineHeight:"100px",background:'url(images/0.png) center center',backgroundSize:'cover'}).appendTo('body'));
        })
    },
    checkDie:function(arr,x,width){//是否在x上重叠
//                $.each(arr,function(i,n){
//                    if(!(x+width< n.minx||x>n.maxx)){//如果在x上重叠的话就返回true
//                        return true;
//                    }
//                })
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){var arr=[];//存放随机取出的字母
        for(var i=0;i<num;i++){
            var rand=Math.floor(Math.random()*this.letterArr.length);//下标
            while(this.checkCopy(this.arrqu,this.letterArr[rand])){
                rand=Math.floor(Math.random()*this.letterArr.length);
            }
            arr.push(this.letterArr[rand]);
            this.arrqu.push(this.letterArr[rand]);
        }
        return arr;
    },
    checkCopy:function(arr,val){//判断是否重复
        for(var i= 0,len=arr.length;i<len;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }
}