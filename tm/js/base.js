window.onload=function(){
        //顶部搜索条
        var topList=getClass('top-list')[0];
        var topInput=getFirst(topList);
        topInput.style.marginLeft="400px";
        topInput.style.marginTop="5px";
        var flag=true;//控制滚动条下拉的开关，第一次开，这个开关要保证每一次往下拉时都是开着的
        var flag2=true;
        addEvent(window,"scroll",function(){
             var obj=document.documentElement.scrollTop?document.documentElement:document.body;
             if(obj.scrollTop>=300){
                   if(flag){
                       animate(topList,{top:0},300,Tween.Linear);
                       flag=false;
                       flag2=true;
                   }
                   
             }else{
                   if(flag2){
                      animate(topList,{top:-50},300,Tween.Linear);
                      flag=true;
                      flag2=false;  
                   }
             }
        })
       
        //左侧定位条
           var floorl=$(".floor-list")[0];
           var listnum=$("li",floorl);
           var contF=$(".container-a");
           window.onscroll=function(){
                var obj=document.documentElement.scrollTop?document.documentElement:document.body;
                var sT=obj.scrollTop;
                var lii=$('.iii')[0];
                 addEvent(lii,"click",function(){
                      animate(obj,{scrollTop:0},500,Tween.Linear);
                 })
                if(sT>800&&sT<6700){
                    floorl.style.display="block";
                }else{
                    floorl.style.display="none";
                }
                for(var i=0;i<contF.length;i++){
                     contF[i].oT=contF[i].offsetTop;
                    
                     if(sT>=contF[i].oT){
                        for(var j=0;j<listnum.length;j++){
                             listnum[j].style.backgroundColor="#ccc";
                             listnum[j].style.color="#fff";
                        }
                        listnum[i].style.backgroundColor="#fff";
                        listnum[i].style.color="#333";
                     }      
                }       
            }
             for(var i=0;i<listnum.length;i++){
                      listnum[i].index=i;
                      listnum[i].onclick=function(){
                       var obj=document.documentElement.scrollTop?document.documentElement:document.body;
                       // obj.scrollTop=contF[this.index].oT;
                       animate(obj,{scrollTop:contF[this.index].oT},500,Tween.Linear);

                      }
                }
           
  //按需加载楼层图片
          var ch=document.documentElement.clientHeight;//浏览器的高
          
          for(var i=0;i<contF.length;i++){
               contF[i].oT=contF[i].offsetTop;
              var floorImgs=$("img",contF[i]);
              for(var j=0;j<floorImgs.length;j++){
                               var srcV=floorImgs[j].getAttribute("src");
                               floorImgs[j].src="";
                               floorImgs[j].setAttribute("aa",srcV);
                               
              }

          }

          addEvent(window,"scroll",function(){
                  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
                  for(var i=0;i<contF.length;i++){
                        if(obj.scrollTop+ch<contF[i].offsetTop){
                          var floorImgs=$("img",contF[i]);
                             for(var j=0;j<floorImgs.length;j++){     
                                floorImgs[j].src=floorImgs[j].getAttribute("aa");
                        }
                      }
                      
                     
                  }
              })
          

    //隐藏的显示
         var yiji=$(".yiji");
         var erji=$(".erji");
         for(var i=0;i<yiji.length;i++){
             yiji[i].index=i;
             yiji[i].onmouseover=function(){
                  erji[this.index].style.display="block";
             }
             yiji[i].onmouseout=function(){
                 erji[this.index].style.display="none";
             }
         }
         for(var i=0;i<erji.length;i++){
            erji[i].index=i;
            erji[i].onmouseover=function(){
                 erji[this.index].style.display="block";
             }
           
             erji[i].onmouseout=function(){
                 erji[this.index].style.display="none";
             }


         }          
          



//右侧定位条
          var shuSmall=$(".shu-small");
          var wdtq=$(".wdtq");
          for(var i=0;i<shuSmall.length;i++){
               shuSmall[i].index=i;
               shuSmall[i].onmouseover=function(){
                  wdtq[this.index].style.display="block";
                  animate(wdtq[this.index],{right:25},300,Tween.Linear);
               }
               shuSmall[i].onmouseout=function(){
                  wdtq[this.index].style.display="none";
                  animate(wdtq[this.index],{right:65},300,Tween.Linear);
               }


          }


           //轮播banner
           var imgBox=$(".imgbox")[0];//放所有图片的盒子
           var oImg=$(".lb-pic");//要轮播的五张图片

           var Circle=$(".circle");
           var contentC=$(".content-c")[0];//大背景

           var arrColor=["#B90AF9","#66cfad","#dbdbdb","#fff701","#dbdbdb"];//要轮播的五个颜色
           for(var i=0;i<Circle.length;i++){//遍历小下标
           	   Circle[i].index=i;
               oImg[i].index=i;
           	   Circle[i].onmouseover=function(){
           	   	   clearInterval(t);
           	   	   for(var j=0;j<Circle.length;j++){
                       oImg[j].style.zIndex=2;
           	   	       Circle[j].style.background="#000";
           	   	   }
           	   	   oImg[this.index].style.zIndex=3;
           	       Circle[this.index].style.background="#c40000";
           	       contentC.style.background=arrColor[this.index];

           	   }
               
           	   Circle[i].onmouseout=function(){
           	   	   t=setInterval(move,2000);
           	   	   num=this.index+1;
           	   }	   
           }
           var t=setInterval(move,2000);
           var num=1;
           function move(){
           	   if(num==5){
           	   	 num=0;
           	   }
               for(var j=0;j<Circle.length;j++){
                       oImg[j].style.zIndex=2;
           	   	       Circle[j].style.background="#000";
           	   	   }
           	   	oImg[num].style.zIndex=3;
           	    Circle[num].style.background="#c40000";
           	    contentC.style.background=arrColor[num];
           	    num++;
           }


           var xs=$(".xs");
           var bannerCenter=$(".banner-center");//点击左侧栏要轮播的图片
           var lis=$(".content-c-s-zi");//左侧li
           var youTu=$(".c-you-tu");
           var colorArr=["#6fdbdd","#d6ecdd","#344af6","#ffb701","#ff5581","#f63a3b","#e90540","#868b45","#2f8bde","#ff489b","#db3e45","#d6fcb6","#1f89ef","#dcdcdc","#d40c54"];
           for(var i=0;i<lis.length;i++){
            lis[i].index=i;
            lis[i].onmouseover=function(){
                 xs[this.index].style.display="block";

              if(this.index==0){
                    //clearInterval(t);

                    // contentC.style.background=arrColor[num-1];
                    // for(var j=0;j<bannerCenter.length;j++){
                    //   bannerCenter[j].style.zIndex=0;

                    // }
                   // t=setInterval(move,2000);
                   
              }else{
                  clearInterval(t);
                  
                  for(var j=0;j<bannerCenter.length;j++){
                      bannerCenter[j].style.zIndex=0;
                  }
                  bannerCenter[this.index-1].style.zIndex=10;
                  contentC.style.background=colorArr[this.index-1];
                  youTu[this.index].style.display="block";
                  

              }
              
            }
            if(i!=0){
                lis[i].onmouseout=function(){
                    
                    t=setInterval(move,2000);
                    for(var j=0;j<bannerCenter.length;j++){
                        bannerCenter[j].style.zIndex=0;
                        // youTu[j].style.display="none";
                       
                    }
                    for(var j=0;j<youTu.length;j++){
                        youTu[j].style.display="none";
                    }
                    for(var j=0;j<xs.length;j++){
                        xs[j].style.display="none";
                    }
                    contentC.style.background=arrColor[num-1];
                     youTu[0].style.display="block";      

              }
            }else{
                lis[i].onmouseout=function(){
                    xs[0].style.display="none";
                }
            }
            
        }



        //楼层左侧的小banner轮播
             var logoBox=$(".mid-logo-box");
             var leftPoint=$(".left");
             var rightPoint=$(".right");
               for(var i=0;i<logoBox.length;i++){
                  bannerLb(logoBox[i],leftPoint[i],rightPoint[i]); //bannerLb轮播函数
               }
             




          // ****************************************************************
          // 卡片式换一批
          var anniu=$(".content-d-l-zi");
          // var midBox=$(".e-mid-box")[0];
          var edBox=$(".ed-box");
          var huan=$(".update-zi")[0];

          for (var i = 0; i < edBox.length; i++) {//四个板块
             edBox[i].style.cssText="width:100%;height:100%;position:absolute;top:0;left:0;"//会覆盖样式
             edBox[0].style.zIndex=2;
           }; 

          var oneArr=[];
          var twoArr=[];
          var threeArr=[];
          var fourArr=[];

          for(var i=0;i<27;i++){//获得所有图片路径放到数组中

               oneArr.push("images/e-"+i+".jpg");
               twoArr.push("images/e-"+i+".jpg"); 
               threeArr.push("images/e-"+i+".jpg"); 
               fourArr.push("images/e-"+i+".jpg");  

          }

          function random(arrs){//arrs指的是oneArr||twoArr||threeArr||fourArr
               var newarr=[];//存放图的路径的数组


               var numArry=[];//存放不重复的数
               for(var i=0;i<300;i++){//重复300次
                     var num=parseInt(Math.random()*26); 
                     numArry.push(num);     
               }
               var noReaptarr=delRepeat(numArry);
               noReaptarr=noReaptarr.splice(0,24);//不重复的24个数
              
               for(var i = 0; i <noReaptarr.length; i++){
                    newarr.push(arrs[noReaptarr[i]]);//取出24张图的路径放到newarr数组中(保证不重复)
               }

               return newarr;
          }


           var imgarr=[oneArr,twoArr,threeArr,fourArr];
           function show(index){
               var arr=random(imgarr[index]);//取出的24 个图片路径
               for(var i = 23; i >= 0; i--){//创建24个div标签,放入图片
                   var oDiv=document.createElement("div");
                   oDiv.className="xingbox";//定义一个类名
                   oDiv.style.cssText="position:relative;width:132px;height:81px;float:left;background:#fff;margin-left:2px;margin-bottom:2px;"
                   edBox[index].appendChild(oDiv);
                   var img=document.createElement("img");//创建24个img标签
                   img.style.cssText="width:90px;position:absolute;top:18px;left:21px;"
                   img.src=arr[i];
                   oDiv.appendChild(img);
                   var heart=document.createElement("div");
                   heart.className="heart";
                   heart.style.cssText="display:none;width:20px;height:20px;position:absolute;top:4px;right:4px;z-index:4;background:url(images/heart.png);"
                   oDiv.appendChild(heart);

               }
               var xingbox=$(".xingbox");
               var heart=$(".heart");
               for(var i = 0; i < xingbox.length; i++){
                   
                   xingbox[i].index=i;
                   xingbox[i].onmouseover=function(){
                       heart[this.index].style.display="block";

                   }
                   xingbox[i].onmouseout=function(){
                       heart[this.index].style.display="none";

                   }

               }
               


           }


           //开始显示的效果
           show(0);

           anniu[0].style.borderBottom="2px solid #000";
           anniu[0].style.color="#000";



           index=0;//如果直接点击换一批时，保证第一个点击事件对象也可以换
           for(var i = 0; i < anniu.length; i++){
               anniu[i].index=i;
               anniu[i].flag=true;
               anniu[0].flag=false;
               anniu[i].onclick=function(){
                  index=this.index//全局变量，存放当前点击的事件对象

                  for(var j = 0; j < edBox.length; j++){
                      edBox[j].style.zIndex=1;
                      anniu[j].style.borderBottom="0";
                      anniu[j].style.color="#666";

                  }
                  edBox[this.index].style.zIndex=2;
                  anniu[this.index].style.borderBottom="2px solid #000";
                  anniu[this.index].style.color="#000";
                  if(this.flag){
                    show(this.index);
                    this.flag=false;
                  }
                  
                  
               }
           }


           huan.onclick=function(){
              edBox[index].innerHTML="";//清空盒子里的所有内容
              show(index);
           }


     
    }



