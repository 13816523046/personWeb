function shape(canvas,canvas1,canobj,xp,selectobj){
    this.canvas1=canvas1;//canvas
    this.canvas=canvas;//copy
    this.canobj=canobj;
    this.bgcolor="#fff";
    this.bordercolor="#fff";
    this.lineWidth=1;
    this.type="stroke";//类型为划线还是填充
    this.shapes="line";
    this.width=this.canvas1.width;
    this.height=this.canvas1.height;
    this.history=[];
    this.temp=[];
    this.xpp=xp;
    this.selectobj=selectobj;
}

shape.prototype={
    init:function(){
        this.xpp.css("display","none");
        this.selectobj.css("display","none");
        if (this.temp) {
            this.history.push(this.canobj.getImageData(0, 0, this.width, this.height));
            this.temp = null;
        }
        this.canobj.fillStyle=this.bgcolor;
        this.canobj.strokeStyle=this.bordercolor;
        this.canobj.lineWidth=this.lineWidth;
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){//在copy上画

            var startx= e.offsetX;
            var starty= e.offsetY;
            if(that.shapes=="pen"){
                that.init();
                that.canobj.beginPath();
                that.canobj.moveTo(startx,starty);
            }else{
                that.init();
            }
            that.canvas.onmousemove=function(e){
                that.canobj.clearRect(0,0,that.width,that.height);//清除整个画布
                if(that.history.length>0){
                    that.canobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                that[that.shapes](startx,starty,endx,endy);//调用相应函数
            }
            that.canvas.onmouseup=function(e){
                that.history.push(that.canobj.getImageData(0,0,that.width,that.height));
                if(that.shapes=="pen"){
                    that.canobj.closePath();
                }
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
            }
        }


    },
    line:function(x1,y1,x2,y2){
        var that=this;
        that.canobj.beginPath();
        that.canobj.moveTo(x1,y1);
        that.canobj.lineTo(x2,y2);
        that.canobj.closePath();
        that.canobj.stroke();//线只能stroke
    },
    pen:function(x1,y1,x2,y2){
        var that=this;
        that.canobj.lineTo(x2,y2);
        that.canobj.stroke();
    },
    rect:function(x1,y1,x2,y2){
        var that=this;
        that.canobj.beginPath();
        that.canobj.rect(x1,y1,x2-x1,y2-y1);
        that.canobj.closePath();
        that.canobj[that.type]();
    },
    circal:function(x1,y1,x2,y2){
        var that=this;
        that.canobj.beginPath();
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));//按下是圆心，拖拽是半径
        that.canobj.arc(x1,y1,r,0,Math.PI*2)
        that.canobj.closePath();
        that.canobj[that.type]();//改变填充方式
    },
    five:function(x1,y1,x2,y2){
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        var r1=r/2;
        this.canobj.beginPath();
        this.canobj.moveTo(x1+r,y1);
        for(var i=1;i<10;i++){
            if(i%2==0){
                this.canobj.lineTo(x1+Math.cos(i*36*Math.PI/180)*r,y1+Math.sin(i*36*Math.PI/180)*r);
            }else{
                this.canobj.lineTo(x1+Math.cos(i*36*Math.PI/180)*r1,y1+Math.sin(i*36*Math.PI/180)*r1);
            }
        }
        this.canobj.closePath();
        this.canobj[this.type]();//图形既可以划线也可以填充
    },
    xp:function(xpobj,w,h){
        var that=this;
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var lefts=ox-w/2;
            var tops=oy-h/2;
            xpobj.css({
                width:w,
                height:h,
                left:lefts,
                top:tops,
                display:"block"
            })
            //that.canobj.clearRect(lefts-100,tops,w,h);
        }

        that.canvas.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            xpobj.css({
                display:"block"
            })
            that.canvas.onmousemove=function(e){
                var ox= e.offsetX;
                var oy= e.offsetY;
                var lefts=ox-w/2;
                var tops=oy-h/2;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width){
                    lefts=that.width;
                }
                xpobj.css({
                    left:lefts,
                    top:tops
                })
                that.canobj.clearRect(lefts,tops,w,h);
            }
            that.canvas.onmouseup=function(e){
                xpobj.css({
                    display:"none"
                })
                that.history.push(that.canobj.getImageData(0,0,that.width,that.height));//****
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.xp(xpobj,w,h);//******
            }
    
        }
    },
    before:function(){
            var that=this;//这为啥用that
            var last=that.history.pop();//last为数组中最后一个值，此时arr为除了最后一个值的数组
            that.canobj.clearRect(0,0,that.width,that.height);
            if(that.history.length<=0){
                alert("there is null");
            }
            that.canobj.putImageData(that.history[that.history.length-1],0,0);


    },
    select:function(selectAreaObj){
            var that=this;
            that.init();
            that.canvas.onmousedown=function(e){
                that.init();
                var startx= e.offsetX;
                var starty= e.offsetY,minx,miny,w,h;//
                that.canvas.onmousemove=function(e){
                    that.init();
                    var endx=e.offsetX;
                    var endy= e.offsetY;
                    w=Math.abs(startx-endx);
                    h=Math.abs(starty-endy);
                    minx=startx>endx?endx:startx;//定位的值
                    miny=starty>endy?endy:starty;//定位的值
                    selectAreaObj.css({
                        display:"block",
                        width:w,
                        height:h,
                        left:minx,
                        top:miny
                    })
                }
                that.canvas.onmouseup=function(e){
                    that.canvas.onmouseup=null;
                    that.canvas.onmousemove=null;
                    that.temp=that.canobj.getImageData(minx,miny,w,h);
                    that.canobj.clearRect(minx,miny,w,h);that.canobj.getImageData(minx,miny,w,h);
                    that.history.push(that.canobj.getImageData(0,0,that.width,that.height));
                    that.canobj.putImageData(that.temp,minx,miny);
                    that.drag(minx,miny,w,h,selectAreaObj);
                }

            }
    },
    drag:function(x,y,w,h,selectAreaObj){
        var that=this;
        that.canvas.onmousemove=function(e){
            var cx= e.offsetX;
            var cy= e.offsetY;
            if(cx-x<w&&cy-y<h&&cx>=x&&cy>=y){
                $(that.canvas).css("cursor", "move");
            }else{
                $(that.canvas).css("cursor", "default");
                return;//****
            }
        }

        that.canvas.onmousedown=function(e){
            var cx= e.offsetX;
            var cy= e.offsetY;

            var ox=cx-x;
            var oy=cy-y;
            if(cx-x<w&&cy-y<h&&cx>=x&&cy>=y){
                $(that.canvas).css("cursor", "move");
            }else{
                $(that.canvas).css("cursor", "default");
                return;//****
            }

            that.canvas.onmousemove=function(e){
                that.canobj.clearRect(0,0,that.width,that.height);//先清空画布
                //console.log(that.temp)

                if(that.history!=0){
                    that.canobj.putImageData(that.history[that.history.length-1],0,0);
                }//把所有裁剪过得画面放到画布
                var cx= e.offsetX;
                var cy= e.offsetY;
                var lefts=cx-ox;
                var tops=cy-oy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h
                }
                selectAreaObj.css({
                    left:lefts,
                    top:tops
                })
                x=lefts;//*****
                y=tops;//*****


              that.canobj.putImageData(that.temp,lefts,tops);//把裁剪的那块放到拖拽框中

             }

             that.canvas.onmouseup=function(e){

                //that.history.push(that.canobj.getImageData(0,0,that.width,that.height));//****
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.drag(x,y,w,h,selectAreaObj);//再次调用drag事件，此时的x y 已改变

             }


        }
    }

}