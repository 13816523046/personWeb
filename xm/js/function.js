 
       //1. 解决IE不兼容document.getElementsByClassName问题
        //classname:子容器的类名，类名要加引号
        //father:父容器的类名赋值给的变量名
        function getClass(classname,father){
        	var obj=father||document;//只要有一个为真,就为真，如果obj存在，就赋值给声明的obj，如果不存在，就document赋值给声明的obj（声明的obj表示从哪个对象里获取。）
        	if(obj.getElementsByClassName){//如果为真表示现代浏览器。
               return obj.getElementsByClassName(classname);
        	}else{//为假时表示是IE8
        		var alls=obj.getElementsByTagName("*");//获取所有的标签名
        		var arr=[];//存放所有class名为classname的div；
        		for(var i=0;i<alls.length;i++){
        		//遍历所有的标签的class名判断是否与传进来的参数相同
        			if(checkClass(alls[i].className,classname)){
                         arr.push(alls[i]);
        			}
        		}
        		return arr;
        	}

        }
        
        //2.检测一个元素里是否有我们想要的类名
        function checkClass(str,classname){
             var newArr=str.split(" ");//将元素的类名（字符串）以空格分割成数组
             for(var i=0;i<newArr.length;i++){//遍历这个数组，拿数组中的每一个值与classname比较
             	if(newArr[i]==classname){//如果相同表示找到了
             		return true;
             	}
             }
             return false;
             //如果等这个数组遍历完后，还没有找到相同的类名，则这个函数返回假。
        }


// ***************************************************************


         // 3.获取纯文本的兼容函数
         // obj表示从哪个对象里获取纯文本
         // val表示要设置的文本
        function getText(obj,val){
         		if(val==undefined){//如果没有要设置的文本
         			if(obj.textContent){//W3C浏览器 
               	     return obj.textContent;
                    }else{//IE浏览器
               	    return obj.innerText;
                    }
         		}else{
         			if(obj.textContent||obj.textContent==""){//也可以给空的对象设置的文本
         				obj.textContent=val;
         			}else{
         				obj.innerText=val;
         			}

         		}
               
         	}
            
// ***************************************************************

            //4.获取外部与行内样式的属性的兼容函数
            //FF window.getComputedStyle(obj,null).width
            //IE obj.currentStyle["width"]
            //obj从哪个对象中获取样式
            //style获取哪个属性
         	function getStyle(obj,style){
		       	   if(getComputedStyle(obj,null)){
		              return getComputedStyle(obj,null)[style];
		       	   }else{
		       	   	  return obj.currentStyle[style];
		       	   }
            }
            
// ***************************************************************           
          //5.获取元素名$(".classname")  $("#idname")  $("div") 

          function $(selector,father){
                    var obj=father||document;
                    if(typeof selector=="string"){
                        //判断selector是否是字符串
                        // (正则)/^\s*|\s*$/g是用来找出字符串前后的空格用""(空)来代替了。
                        //例如"  div " 检测完以后为"div". 
                        //找出以后的结果覆盖原来的selector.
                        selector=selector.replace(/^\s*|\s*$/g,"");
                        if(selector.charAt(0)=="."){//类名
                            return getClass(selector.slice(1),obj);
                        }else if(selector.charAt(0)=="#"){//ID
                            return obj.getElementById(selector.slice(1));

                        }else if(/^[a-z|1-10]{1,10}$/g.test(selector)){
                        //判断传入的参数是否符合标签名的规范
                           return obj.getElementsByTagName(selector);
                        }
                    }else if(typeof selector=="function"){
                        window.onload=function(){
                            selector();//js页面中没有window.onload=function()时也可以调用
                        }
                    }
                }
// **********************************************************************
          //6.兼容函数  获得元素节点和文本节点
          function getChilds(father,type){
               var type=type||"a";
               var allChild=father.childNodes;//找到所有的儿子
               var arr=[];
               for(var i=0;i<allChild.length;i++){
                   if(type=="a"){
                       if(allChild[i].nodeType==1){//获取所有元素节点
                           arr.push(allChild[i]);
                        }
                    }else if(type=="b"){
                        //文本节点的nodeValue为
                        //"   saxjs  "
                        //"          "
                        if(allChild[i].nodeType==1||allChild[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&allChild[i].nodeType!=8){
                              arr.push(allChild[i]);

                        }
                    }
                   
               }
               return arr;
            }

// **********************************************************************
            //7.获取第一个子节点

            function getFirst(father){
                return getChilds(father,"b")[0];
            }
// **********************************************************************
            //8.获取最后一个子节点

             function getLast(father){
                return getChilds(father,"b")[getChilds(father,"b").length-1];
            }
// **********************************************************************

            //9.获取指定的子节点
            function getNum(father,num){
                return getChilds(father,"b")[num];
            }
// **********************************************************************
           //10.获取下一个兄弟节点 
            //"   xsxc"
            //"注释节点"
            //"div"
            
            function getDown(obj){
                var down=obj.nextSibling;
                if(down==null){
                        return false;
                    }
                while(down.nodeType==3||down.nodeType==8){
                    down=down.nextSibling;
                    if(down==null){
                        return false;
                    }
                }
                 return down;
                
            }
// **********************************************************************
            //11.获取上一个兄弟节点
            function getUp(obj){
                var Up=obj.previousSibling;
                if(Up==null){
                        return false;
                    }
                while(Up.previousSibling==3||Up.previousSibling==8){
                    Up=Up.previousSibling;
                    if(Up==null){
                        return false;
                    }
                }
                return Up;
            }
// **********************************************************************
        //12.插入到某个对象之后
        //newobj追加的对象
        //obj在哪个对象之后
        //var obj=new Object();
       // obj.insertAfter=function(){
        //}//对象添加方法
        //Object.prototype.insertAfter=function(){

        //}//谁调用这个对象，父对象就谁

       //对象共有的方法一般是加在原型身上的。而原型只能给构造函数添加，所以共有的方法是添加到对象的构造函数的原型上的。
       //this：指的是最终调用这个方法的对象。而这个对象是通过构造函数new出来的对象。

        Object.prototype.insertAfter=function(newobj,obj){
            var down=getDown(obj);//获取obj的下一个兄弟节点
              if(down){//如果这个兄弟节点存在
                 this.insertBefore(newobj,down);//就把newobj插入到这个兄弟节点的前边（也就是obj对象的后边）
              }else{//如果这个兄弟节点不存在，表示obj就是最后一个节点了
                this.appendChild(newobj);//直接最加到父对象的最后面
              }
        }
         
// **********************************************************************
    //13.漂浮窗
    //obj(要漂浮的对象),close（关闭div）,sheepX（x方向移动距离）,sheepY（y方向移动距离）

         function floatWindow(obj,close,sheepX,sheepY){
                 var sheepX=sheepX||10;
                 var sheepY=sheepY||10;
                 var wwidth=document.documentElement.clientWidth;
                 var wheight=document.documentElement.clientHeight;
                 var swidth=obj.offsetWidth;
                 var sheight=obj.offsetHeight;
                 //window.onload; 文档加载完成事件
                 //window.onscroll  窗口滚动条事件
                 //window.onresize  窗口改变事件
                 window.onresize=function(){//窗口变化时，重新加载浏览器窗口大小
                      wwidth=document.documentElement.clientWidth;
                      wheight=document.documentElement.clientHeight;
                 }
                 close.onclick=function(){
                      box.style.display="none";
                 }
                 var t=setInterval(move,50);
                 function move(){
                     var selfleft=obj.offsetLeft;
                     var selftop=obj.offsetTop;
                     var newleft=selfleft+sheepX;
                     var newtop=selftop+sheepY;
                     if(newtop>=wheight-sheight){
                          sheepY*=-1;
                          newtop=wheight-sheight;
                     }
                     if(newleft>=wwidth-swidth){
                          sheepX*=-1;
                          newleft=wwidth-swidth;
                     }
                     if(newtop<=0){
                          sheepY*=-1;
                          newtop=0;
                     }
                     if(newleft<=0){
                          sheepX*=-1;
                          newleft=0;
                     }
                     obj.style.left=newleft+"px";
                     obj.style.top=newtop+"px";
                 }
                obj.onmouseover=function(){
                     clearInterval(t);
                } 
                obj.onmouseout=function(){
                     t=setInterval(move,50);
                }


            }
// **********************************************************************
//14.鼠标滚轮事件
//obj添加滚轮事件的对象   upfun向上滚时执行的事件处理函数，向下滚时执行的事件处理函数
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

                                       if (ev.preventDefault )
                                       ev.preventDefault();//阻止默认浏览器动作(W3C)
                                       else
                                       ev.returnValue = false;//阻止默认浏览器动作IE


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


// **********************************************************************

                //判断某个元素是否包含有另外一个元素
                 function contains (parent,child) {
                  if(parent.contains){
                     return parent.contains(child) && parent!=child;
                  }else{
                    return (parent.compareDocumentPosition(child)===20);
                  }
                 }
// **********************************************************************
                //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
                  function checkHover (e,target) {
                   if(getEvent(e).type=="mouseover"){
                      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
                    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
                   }else{
                    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
                    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
                    }
                  }
// **********************************************************************
                //15.鼠标移入移出事件
                /*
                  obj   要操作的对象
                  overfun   鼠标移入需要处理的函数
                  outfun     鼠标移除需要处理的函数
                */
                function hover (obj,overfun,outfun) {
                    if(overfun){
                      obj.onmouseover=function  (e) {
                        if(checkHover(e,obj)){
                           overfun.call(obj,[e]);
                        }
                      }
                    }
                    if(outfun){
                      obj.onmouseout=function  (e) {
                        if(checkHover(e,obj)){
                           outfun.call(obj,[e]);
                        }
                      }
                    }
                }
                 function getEvent (e) {
                      return e||window.event;
                 }


// **********************************************************************
//鼠标点击后可以随意拖动的盒子实现函数
           function movePosition(obj){
                      var bx=document.documentElement.clientWidth;
                      var by=document.documentElement.clientHeight;
                      var sw=obj.offsetWidth;
                      var sy=obj.offsetHeight;
                       // alert(sy);
                    obj.onmousedown=function(e){
                         var ev=e||window.event;
                         var ox=ev.layerX||ev.offsetX;
                         var oy=ev.layerY||ev.offsetY;
                         if (ev.preventDefault )
                                  ev.preventDefault();//阻止默认浏览器动作(W3C)
                          else
                                  ev.returnValue = false;//IE

                         //document.title=oy;
                         document.onmousemove=function(e){
                                var ev=e||window.event;
                                var cx=ev.clientX;
                                var cy=ev.clientY;
                                var newtop=cy-oy;
                                var newleft=cx-ox;
                                  if(newtop<=0){
                                     newtop=0;                                  
                                  }
                                  if(newleft<=0){
                                       newleft=0;
                                  }
                                  if(bx-newleft<=sw){
                                       newleft=bx-sw;                                      
                                  }
                                  if(by-newtop<=sy){
                                       newtop=by-sy;                                        
                                  }

                                  obj.style.top=newtop+"px";
                                  obj.style.left=newleft+"px";

                          }
                    }
                    
                    document.onmouseup=function(){
                       document.onmousemove=null;
         
                    }
              }


// **********************************************************************
//带左右箭头的轮播
             //objBox要移动的大盒子类名
             //左边箭头的类名
             //右边箭头的类名
             function bannerLb(objBox,leftP,rightP){
                     var t=setInterval(moveleft,2000);
                     function moveleft(){
                            animate(objBox,{left:-100},500,Tween.Linear,function(){
                               var firstLogos=getFirst(objBox);
                               objBox.appendChild(firstLogos);
                               objBox.style.left=0;
                            })

                      }    
                      function moveright(){
                               var lastLogos=getLast(objBox);
                               objBox.insertBefore(lastLogos,getFirst(objBox));
                               objBox.style.left="-100px";
                               animate(objBox,{left:0},500,Tween.Linear);
            
                       }
                       leftP.onmouseover=rightP.onmouseover=function(){
                             clearInterval(t);
                       }
                       leftP.onmouseout=rightP.onmouseout=function(){
                             t=setInterval(moveleft,2000);
                       }
                       leftP.onclick=function(){
                             moveleft();
                       }
                       rightP.onclick=function(){
                             moveright();
                       }

              }
// **********************************************************************
//16.解决事件添加的兼容问题
    function addEvent(obj,event,fun){
        if(obj.addEventListener){
            return obj.addEventListener(event,fun,false);//ff w3c
        }else{
            return obj.attachEvent("on"+event,fun);//ie
        }
    }
//删除事件
  function removeEvent(obj,event,fun){
         if(obj.addEventListener){
            return obj.removeEventListener(event,fun,false);//ff w3c
        }else{
            return obj.detachEvent("on"+event,fun);//ie
        }
  }   
  // **********************************************************************
// 17.
//阻止事件流的兼容函数
//obj 事件对象
    function stopEvent(obj){
          if(obj.stopPropagation){//处理兼容问题(阻止事件流)
                obj.stopPropagation();//FF
          }else{
                obj.cancelBubble=true;//IE
                }
    
    }
//18.阻止浏览器的默认行为的兼容函数
//obj指行为
    function stopClient(obj){
        if (obj.preventDefault )
              obj.preventDefault(); //阻止默认浏览器动作(W3C)
              else
              obj.returnValue = false;//IE中阻止函数器默认动作的方式  
    }


//清除数组中的重复值
function delRepeat(arr){
   var newArr=[];//定义一个空数组
   for(var i=0;i<arr.length;i++){//遍历数组
       var flag=true;//控制是否要放到新数组中 
       for(var j=i+1;j<arr.length;j++){
          if(arr[i]==arr[j]){
             flag=false;
             break;
          }
       }
       if(flag){
          newArr.push(arr[i]);
       }
       
}
  return newArr;
}



// ****************************************************************************
// 判断类型是否为数

// var arr=[1,2,3,4];
// var str="123";
// var obj={};
function isArray(arr){
     var flag=false;
     if(arr.push){
        flag=true;
     }
     return flag;
}

// **********************************************************************************
//获取具有定位属性的父元素 相对于body的left top值.  
            //offset(obj).left( 相对于body的 left)
            //offset(obj).top( 相对于body的 top)
            //obj事件源(发生在谁身上)
            //返回值为json

            function offset(obj){
               parent=obj.parentNode;//获取父节点
               var arr=[];
               var x=0;
               var y=0;
               while(parent.nodeName!=="BODY"){
                    var attr=getStyle(parent,"position");//attr为字符串，代表具有定位属性的父元素的定位情况
                    if(attr=="absolute"||attr=="fixed"||attr=="relative"){
                       arr.push(parent);
                    }
                    parent=parent.parentNode;
                    
               }
               for (var i = 0; i < arr.length; i++) {
                var top=arr[i].offsetTop;//自身到具有定位属性的父元素顶部的距离
                var borderT=parseInt(getStyle(arr[i],"borderTopWidth"));
                y+=top+borderT;

                var left=arr[i].offsetLeft;
                var borderL=parseInt(getStyle(arr[i],"borderLeftWidth"));
                x+=left+borderL;

               };
               return {left:x,top:y}//返回值为json

            }