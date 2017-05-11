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
   


// ******************************************************
//轮播
var $$=jQuery.noConflict();
var datu=$$(".datu");
var lunboimgs=$$(".datu img");
var lunbo=$$(".lunbo");
var liLink=$$(".li-link");
var lunboLeft=$$(".lunbo-left");
var lunboRight=$$(".lunbo-right");
var titleItems=$$(".title-items");

var colorArr=["#370f63","#6539e6","#ffc414","#5f22be","#005c83","#101518","#e7f8ff","#ff3e00","#ff9923","#28484a","#f9111d"];
lunboimgs.eq(0).css("zIndex","3");
lunbo.css("background","#370f63");
liLink.eq(0).css("background","rgba(0,0,0,0.8)");
$$(".top-items").eq(0).css("display","block");

var t=setInterval(moveing,2000);
var q=0;
 function moveing(){
    q++;
    console.log(q);
    if(q==lunboimgs.length){
       q=0;
    }
    lunboimgs.each(function(){
        var index=$$(this).index();
        $$(this).css("zIndex","1");
        liLink.eq(index).css("background","rgba(0,0,0,0.4)");
        $$(".top-items").css("display","none");
        
    })
    lunboimgs.eq(q).css("zIndex","3");
    lunbo.css("background",colorArr[q]);
    liLink.eq(q).css("background","rgba(0,0,0,0.8)");
    $$(".top-items").eq(q).css("display","block");
}


lunbo.hover(function(){
   clearInterval(t);
},function(){
   t=setInterval(moveing,2000);
})
lunboLeft.click(function(){
    q--;
    if(q<0){
      q=lunboimgs.length-1;
    }
    lunboimgs.each(function(){
        var index=$$(this).index();
        $$(this).css("zIndex","1");
        liLink.eq(index).css("background","rgba(0,0,0,0.4)");
    })
    lunboimgs.eq(q).css("zIndex","3");
    lunbo.css("background",colorArr[q]);
    liLink.eq(q).css("background","rgba(0,0,0,0.8)");

})
lunboRight.click(function(){
    moveing();  
})



liLink.each(function(){
   var index=$$(this).index();
    $$(this).hover(function(i){
       liLink.css("background","rgba(0,0,0,0.4)");
       liLink.eq(index).css("background","rgba(0,0,0,0.8)");
       lunboimgs.css("zIndex","1");
       lunboimgs.eq(index).css("zIndex","3");
       lunbo.css("background",colorArr[index]);
       titleItems.eq(index).show();
        $$(".top-items").css("display","none");
    },function(){
        titleItems.eq(index).hide();
        q=index;
    })

})













//右侧定位条
var youList=$(".you-list")[0];
var clientH=document.documentElement.clientHeight;
    youList.style.height="clientH";
window.onresize=function(){
    clientH=document.documentElement.clientHeight;
    youList.style.height="clientH";
    // alert(clientH);
}



// 点击input搜索框出现
   var inputBox=$(".input-box")[0];
   var inputs=$("input",inputBox)[0];
   var hiddenResult=$(".hidden-result")[0];
   inputs.onfocus=function(){
       hiddenResult.style.display='block';
   }
   inputs.onblur=function(){
       hiddenResult.style.display='none';
   }

// ******************************************************

var youList=$(".you-list")[0];
var shows=$(".shows");
var spans=$("span",youList);
var licailen=shows.length;
for (var i = 0; i < licailen; i++) {
   shows[i].index=i;
   shows[i].onmouseover=function(){
       spans[this.index].style.background="#FFAA01";
       spans[this.index].style.color="#383838";
       animate(spans[this.index],{right:36},400,Tween.Linear);
       // spans[this.index].style.width="100%";
        
   }
   shows[i].onmouseout=function(){
       spans[this.index].style.background="#383838";
       spans[this.index].style.color="#FFAA01";
       animate(spans[this.index],{right:-140},400,Tween.Linear);
        
   }
};


// 关闭
   var close=$("em");
   var closed=$(".closed");
   var closelen=close.length;
   for (var i = 0; i <closelen; i++) {
       close[i].index=i;
       close[i].onclick=function(){
           closed[this.index].style.display="none";
       }

   };





    // *******************************************
	var topFixed=$(".top-fixed")[0];
	var fla=true;
	addEvent(window,"scroll",function(){//滚动条事件

		var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    //回到顶部
    var lii=$('.li-7')[0];
     addEvent(lii,"click",function(){
          animate(obj,{scrollTop:0},500,Tween.Linear);
     })
			
				
					if (fla){
            if(obj.scrollTop>300){
						animate(topFixed,{top:0},200,Tween.Linear);	
						fla=false;
					};
			  			
				}else{
					if (obj.scrollTop<300) {
						animate(topFixed,{top:-50},200,Tween.Linear);
						fla=true;	
					};
					
				}
			
			  
		
		
})





	//楼层跳转
      var floors=$(".floor-a");
      
      var zuoList=$(".zuo-list")[0];
      var li=$("li",zuoList);
      var leftzi1=$(".leftzi1");
      for (var i = 0; i <li.length; i++) {
      	li[i].index=i;
      	li[i].onmouseover=function(){
      		  for (var j = 0; j < leftzi1.length; j++) {
      		  	leftzi1[j].style.display="none";
      		  };
             leftzi1[this.index].style.display="block";
      	}
      };

      addEvent(window,"scroll",function(){
	      	 var obj=document.documentElement.scrollTop?document.documentElement:document.body;
	      	 if(obj.scrollTop>800&&obj.scrollTop<6820){
	      	 	 zuoList.style.display="block";
	      	 }else{
	      	 	 zuoList.style.display="none";
	      	 }

	         for (var i = 0; i < floors.length; i++) {
	         	floors[i].oT=floors[i].offsetTop;
	         	if(floors[i].oT<=obj.scrollTop){

	         		for (var j = 0; j < leftzi1.length; j++) {
	         			leftzi1[j].style.display="none";
	         		};
	         	leftzi1[i].style.display="block";
	         	}
	         };

	         for (var i = 0; i <li.length; i++) {
			      	li[i].index=i;

			      	li[i].onclick=function(){
			      		 animate(obj,{scrollTop:floors[this.index].oT},500,Tween.Linear);
			      		 // obj.scrollTop=floors[this.index].oT;
			      	}

      	    }
      })



 // ********************************************************** 
 //按需加载楼层图片
          var ch=document.documentElement.clientHeight;//浏览器的高
          for(var i=0;i<floors.length;i++){
               floors[i].oT=floors[i].offsetTop;
              var floorImgs=$("img",floors[i]);
              for(var j=0;j<floorImgs.length;j++){
                               var srcV=floorImgs[j].getAttribute("src");
                               floorImgs[j].src="";
                               floorImgs[j].setAttribute("aa",srcV);
                               
              }

          }

          addEvent(window,"scroll",function(){
                  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
                  for(var i=0;i<floors.length;i++){
                        if(obj.scrollTop+ch<floors[i].offsetTop){
                          var floorImgs=$("img",floors[i]);
                             for(var j=0;j<floorImgs.length;j++){     
                                floorImgs[j].src=floorImgs[j].getAttribute("aa");
                        }
                      }
                      
                     
                  }
              })
          


//楼层的选项卡

   var tab=$(".tab");
   var floorMain=$(".floor-main");

    for (var i = 0; i < tab.length; i++) {
         tabCard(tab[i],floorMain[i]);
    };
   
    function tabCard(obj,obj1){

          var tabLi=$("li",obj);
          var xs=$(".xs",obj1);

         for (var i = 0; i < tabLi.length; i++) {
            tabLi[i].index=i;
            tabLi[i].onmouseover=function(){
            for (var j = 0; j < xs.length; j++) {
              xs[j].style.display="none";
              tabLi[j].id="";
              
            };
            xs[this.index].style.display="block";
            tabLi[this.index].id="on";
            }
         };
    }
     




// *****************************************************************
var mBox=$(".m-box")[0];
var lbjt=$(".lbjt");
var floorZero=$(".floor-zero")[0];
var mInner=$(".m",floorZero);//内容
mBox.onmouseover=function(){
   lbjt[0].style.display="block";
   lbjt[1].style.display="block";
}
mBox.onmouseout=function(){
   lbjt[0].style.display="none";
   lbjt[1].style.display="none";
}


var len=mInner.length;
var mW=mInner[0].offsetWidth;
for (var i = 0; i < len; i++) {
	if(i!=0){
		 mInner[i].style.left=mW+"px";
	}
	
};

var next=0;
var now=0;
var flag=true;
var lunboBox=$(".lunbo-box-b")[0];
var lis=$("li",lunboBox);
var lislen=lis.length;
for (var i = 0; i < lislen; i++) {
	lis[i].index=i;
	lis[i].onmouseover=function(){
                    if(now==this.index||!flag){
                       return;
                    }//连点时直接跳出函数
                    if(now<this.index){
                         flag=false;
                         mInner[this.index].style.left=mW+"px";
                         animate(mInner[now],{left:-mW},500,Tween.Linear,function(){
                         flag=true;
                    });
                    }else{
                         flag=false;
                         mInner[this.index].style.left=-mW+"px";
                         animate(mInner[now],{left:mW},500,Tween.Linear,function(){
                        flag=true;
                    });
                    }

                    animate(mInner[this.index],{left:0},500,Tween.Linear,function(){
                        flag=true;
                    });
                    lis[now].id="";
                    this.id="ii";
                    next=now=this.index;
	}
};

function moveleft(){
                  if(flag){
                      flag=false;
                      next--;
                  if(next<0){
                     next=len-1;
                  }
                      
                      mInner[next].style.left=-mW+"px";
                      animate(mInner[now],{left:mW},500,Tween.Linear);
                      animate(mInner[next],{left:0},500,Tween.Linear,function(){
                        flag=true;
                      });
                      lis[now].id="";
                      lis[next].id="ii";
                     
                      now=next;
                  }
                  
                  
                  
 }

 function move(){
                  if(flag){
                    flag=false;
                    next++;
                    if(next==len){
                       next=0;
                    }
                    mInner[next].style.left=mW+"px";
                    animate(mInner[now],{left:-mW},500,Tween.Linear);
                    animate(mInner[next],{left:0},500,Tween.Linear,function(){
                       flag=true;
                    });
                    lis[now].id="";
                    lis[next].id="ii";
                    now=next;
                  }
                  
              }
lbjt[0].onclick=function(){
	moveleft();
	
}  

lbjt[1].onclick=function(){
    move();
} 









})