
function game(){
    this.cw=$(window).width();
    this.ch=$(window).height();
    this.letterArr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
    this.letterLen=5;
    this.speed=4;//�½����ٶ�
    this.spans=[];//��Ŵ�����span
    this.arrqu=[];//���ȡ������ĸ
    this.posarr=[];
    this.score=0;
    this.die=10;
    this.currscore=0;
    this.num=10;
    this.scoreEle=$('.score span').eq(1);
    this.dieEle=$('.die span').eq(1);
    this.aa=1;//����
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
                    that.spans.splice(i,1);//ɾ���������Ǹ�ֵ
                    that.arrqu.splice(i,1);
                    that.posarr.splice(i,1);
                    that.getLetter(1);
                    if(that.currscore%that.num==0){//��������10ʱ������
                        that.aa++;
                        if(that.aa>8){
                            alert('��ϲ��˳��ͨ�����йأ�����');
                            this.restart();
                        }else{
                            $(".next").css("display","block");
                            clearInterval(that.t);
                            $("#step").html(that.aa)
                            //alert('��'+that.aa+'�ؿ�ʼ');
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
                    that.spans.splice(i,1);//ɾ���������Ǹ�ֵ
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
                        //alert("��Ϸ����! ���ĵ÷�Ϊ:"+that.score+"��!");
                        again.onclick=function(){
                            location.reload();//ҳ������
                        }
                    }
                    return false
                }
            });
        },60)
    },

    getLetter:function(num){
        var arr=this.getRand(num);
        var posarr=[];//���ÿ��span��x�߽�ֵ
        var that=this;
        $.each(arr,function(i,n){//i�±� nֵ
            var x=Math.random()*(that.cw-200)+100;
            var y=Math.random()*100;
            var width1=50;
            while(that.checkDie(that.posarr,x,width1)){//���ÿ���Ƿ��ص�
                x=Math.random()*(that.cw-200)+100;
            }
            posarr.push({minx:x,maxx:x+width1});
            that.posarr.push({minx:x,maxx:x+width1});
            that.spans.push($('<div>').html(n).addClass('ss').css({width:'100px',height:'100px',position:'absolute',top:y,left:x,zIndex:200,color:'#fff',fontSize:'35px',fontWeight:"600",textAlign:'center',lineHeight:"100px",background:'url(images/0.png) center center',backgroundSize:'cover'}).appendTo('body'));
        })
    },
    checkDie:function(arr,x,width){//�Ƿ���x���ص�
//                $.each(arr,function(i,n){
//                    if(!(x+width< n.minx||x>n.maxx)){//�����x���ص��Ļ��ͷ���true
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
    getRand:function(num){var arr=[];//������ȡ������ĸ
        for(var i=0;i<num;i++){
            var rand=Math.floor(Math.random()*this.letterArr.length);//�±�
            while(this.checkCopy(this.arrqu,this.letterArr[rand])){
                rand=Math.floor(Math.random()*this.letterArr.length);
            }
            arr.push(this.letterArr[rand]);
            this.arrqu.push(this.letterArr[rand]);
        }
        return arr;
    },
    checkCopy:function(arr,val){//�ж��Ƿ��ظ�
        for(var i= 0,len=arr.length;i<len;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }
}