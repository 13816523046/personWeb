$(function(){

    var yiji=$(".yiji");
    var erji=$(".erji");
    for (var i = 0; i < yiji.length; i++) {
    	yiji[i].index=i;
    	yiji[i].onmouseover=function(){
    		 erji[this.index].style.display="block";
    	}
    	yiji[i].onmouseout=function(){
    		 erji[this.index].style.display="none";
    	}

    };

    for(var i=0;i<erji.length;i++){
            erji[i].index=i;
            erji[i].onmouseover=function(){
                 erji[this.index].style.display="block";
             }
           
             erji[i].onmouseout=function(){
                 erji[this.index].style.display="none";
             }


     }
// ***************************************************************************
// 输入搜索框隐藏列表
     var inputs=$(".inputs")[0];
     var inputZi=$(".input-zi");
     var sousuoBox=$(".sousuo-box")[0];
     var inputBox=$(".input-box")[0];
     var hiddenList=$(".hidden-list")[0];
     inputs.onfocus=function(){
         inputZi[0].style.display="none";
         inputZi[1].style.display="none";
         hiddenList.style.display="block";

         sousuoBox.style.borderColor="#ff6700";
         inputBox.style.borderColor="#ff6700";

         inputBox.onmouseover=null;
         inputBox.onmouseout=null;

     }
     inputs.onblur=function(){
         inputZi[0].style.display="block";
         inputZi[1].style.display="block";
         hiddenList.style.display="none";

         sousuoBox.style.borderColor="#eee";
         inputBox.style.borderColor="#eee";
         inputBox.onmouseover=function(){
         	  sousuoBox.style.borderColor="#b0b0b0";
              inputBox.style.borderColor="#b0b0b0";
         }
         inputBox.onmouseout=function(){
         	  sousuoBox.style.borderColor="#eee";
              inputBox.style.borderColor="#eee";
         }
     }



// ***************************************************************************
//轮播
     var lunboCircle=$(".lunbo-circle")[0];
     var circles=$("em",lunboCircle);
     var bigPics=$(".big-pic");
     var before=$("#before");
     var next=$("#next");
     var circleslen=circles.length;


     var p=setInterval(left,3000);
     var num=0;
     function left(){
        num++;
        if(num==circleslen){
            num=0;
        }
        for (var j = 0; j < bigPics.length; j++) {
                bigPics[j].style.zIndex=0;
                circles[j].id="";
            };
        bigPics[num].style.zIndex=3;
        circles[num].id="kong";

     }

     function right(){
            num--;
            if(num<0){
                num=circleslen-1;
            }
            for (var j = 0; j < bigPics.length; j++) {
                bigPics[j].style.zIndex=0;
                circles[j].id="";
            };
            bigPics[num].style.zIndex=3;
            circles[num].id="kong";
     }

     for(var i = 0; i < circleslen; i++){
     	circles[i].index=i;
        hover(circles[i],function(){
              clearInterval(p);
            for (var j = 0; j < bigPics.length; j++) {
                bigPics[j].style.zIndex=0;
                circles[j].id="";
            };
            bigPics[this.index].style.zIndex=3;
            this.id="kong";
        },function(){
             p=setInterval(left,3000);
             num=this.index;

        })
     };

    next.onclick=function(){
       clearInterval(p);
       left();

    }
    before.onclick=function(){
       clearInterval(p);
       right();
    }


// **********************************************************************************
//选项卡轮播
    var imgbox=$(".c-xia-box")[0];//包图片的容器
    var introboxinner=$(".intro-box-inner")[0];
    var spans=$(".spans");//按钮

    spans[1].onclick=function(){
        clearInterval(t);
        move();
    }

    spans[0].onclick=function(){
        clearInterval(t);
        moveL();
    }
    spans[3].onclick=function(){
        spans[2].id="";
        spans[3].id="hot";
        animate(introboxinner,{left:-1226},800);
    }

    spans[2].onclick=function(){
        if(introboxinner.style.left==0){
            return;
        }    
        spans[2].id="hot";
        spans[3].id="";
        animate(introboxinner,{left:0},800);
    }




    var t=setInterval(move,4000);
    var lefts=0;
    function move(){//向左
            lefts++;
            if(lefts>1){
                lefts=1;
                clearInterval(t);
             t=setInterval(moveL,4000);
             return;
            }    
        spans[0].id="hot";
        spans[1].id="";
    	animate(imgbox,{left:-1226},800);
    }
    function moveL(){//向右
        lefts--;
        if(lefts<0){
            lefts=0;
            clearInterval(t);
            t=setInterval(move,4000);
            return;
        }
         spans[0].id="";
         spans[1].id="hot";
         animate(imgbox,{left:0},800);       
    }
    // function move(){//向左
           
    //         if(imgbox.style.left=="-1226px"){
                
    //             clearInterval(t);
    //             t=setInterval(moveL,4000);
    //         }    
    //     spans[0].id="hot";
    //     spans[1].id="";
    //     animate(imgbox,{left:-1226},800);
    // }
    // function moveL(){//向右
 
    //     if(imgbox.style.left==0){ 
    //         clearInterval(t);
    //         t=setInterval(move,4000);
    //     }
    //      spans[0].id="";
    //      spans[1].id="hot";
    //      animate(imgbox,{left:0},800);       
    // }

 // ******************************************************************************
 //选项卡
 var Tab=$(".Tab");//包内容的容器 
 //alert(rTabs1.length);
 var moreTou=$(".more-tou");
 
for (var i = 0; i <Tab.length; i++) {
    rTab(Tab[i],moreTou[i]);
};


function rTab(obj,list){
         var alists1=$('a',list);
         var tabs=$(".r-tabs",obj)
         for (var i = 0; i < tabs.length; i++) {
            if(i!=0){
                tabs[i].style.display="none";
            }
         };
         for (var i = 0; i < alists1.length; i++) {
             alists1[i].index=i;
             alists1[i].onmouseover=function(){
                for (var j = 0; j < alists1.length; j++) {
                    tabs[j].style.display="none";
                    alists1[j].id="";
                };
                tabs[this.index].style.display="block";
                this.id="style";
             }
         };

}


var havReview=$(".hav-review");

var viewss=$(".viewss");
var havReviewlen=havReview.length;
for (var i = 0; i < havReviewlen; i++) {
    havReview[i].index=i;
    hover(havReview[i],function(){
        animate(viewss[this.index],{bottom:0},300);
    },function(){
        animate(viewss[this.index],{bottom:-92},300);
    })

};

      



var circleBox=$(".circle-box");//放按钮的容器

var lbBox=$(".small-lb-box");//装轮播内容的容器

var xiaJt=$(".xia-jt");//箭头


lb(circleBox[0],lbBox[0],xiaJt[0],xiaJt[1])
lb(circleBox[1],lbBox[1],xiaJt[2],xiaJt[3])
lb(circleBox[2],lbBox[2],xiaJt[4],xiaJt[5])
lb(circleBox[3],lbBox[3],xiaJt[6],xiaJt[7])
function lb(circleBox,lbBox,xiaJt,xiaJt1){

            
            var lis=$("li",circleBox);
            var next=0;
            for (var i = 0; i < lis.length; i++) {
                lis[i].index=i;
                lis[i].onclick=function(){
                    next=this.index;
                    animate(lbBox,{marginLeft:-296*this.index},300)
                    for (var j = 0; j < lis.length; j++) {
                        lis[j].className="nr-yuan";
                    };
                    this.className="nr-circle";
                }
            };



             function zuo(){
                next++;
                if(next>=4){
                    next=4;
                    return;
                }
                for (var j = 0; j < lis.length; j++) {
                        lis[j].className="nr-yuan";
                };
                lis[next].className="nr-circle";
                animate(lbBox,{marginLeft:-296*next},300);
             }

             function you(){
                next--;
                if(next<0){
                    next=0;
                    return;
                }
                for (var j = 0; j < lis.length; j++) {
                        lis[j].className="nr-yuan";
                };
                lis[next].className="nr-circle";
                animate(lbBox,{marginLeft:-296*next},300)
                
             }
             xiaJt1.onclick=function(){
                zuo();
               
            }
            xiaJt.onclick=function(){
                you();
            }

}









})