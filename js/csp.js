$(".keySkco1").css('width',173);
$(".keySkco2").css('width',173);
$(".keySkco3").css('width',163);
$(".keySkco4").css('width',213);
$(".keySkco5").css('width',193);
$(".keySkco6").css('width',153);
$(".mydream").css("opacity",1);
//var d=document.body.scrollHeight;
//$(window).scroll(function() {
//	if ($(this).scrollTop() >= d*.1 &&$(this).scrollTop()<d*.3) {
//		console.log('1');
//	}
//});



// 获取浏览器可见区域高度
var window_height= document.documentElement.clientHeight;
// 用户手动修改浏览器可见区域高度时修改变量
window.onresize=function () {
    window_height=document.documentElement.clientHeight;
};
// 获取所需效果元素
var My_dream=document.getElementsByClassName('dream');
// 鼠标滚轮滚动执行方法
window.onscroll = function(){
    // 获取鼠标滚轮滚动距离
    var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
 
    // 循环类dream
    for (var k=0;k<My_dream.length;k++){
        if (_scrollTop>= getOffsetTop(My_dream[k]) - window_height && _scrollTop<= getOffsetTop(My_dream[k]) ){
            My_dream[k].style.animationName=My_dream[k].dataset.animate.split(',')[0];
            My_dream[k].style.animationDuration=My_dream[k].dataset.animate.split(',')[1];
            My_dream[k].style.animationTimingFunction=My_dream[k].dataset.animate.split(',')[2];
        }
    }
};
 
// 判断元素父集是否有已定位元素
function getOffsetTop(ele) {
    var rtn = ele.offsetTop;
    var o = ele.offsetParent;
    while(o!=null)
    {
        rtn += o.offsetTop;
        o = o.offsetParent;
    }
    return rtn;
}
 
// 滚动条等于0时执行第一屏效果
function my_animation() {
    var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 效果方法
    for (var k=0;k<My_dream.length;k++){
        if (_scrollTop>= getOffsetTop(My_dream[k]) - window_height && _scrollTop<= getOffsetTop(My_dream[k]) ){
            My_dream[k].style.animationName=My_dream[k].dataset.animate.split(',')[0];
            My_dream[k].style.animationDuration=My_dream[k].dataset.animate.split(',')[1];
            My_dream[k].style.animationTimingFunction=My_dream[k].dataset.animate.split(',')[2];
        }
    }
}
my_animation();


/**************************start* 懒加载方法(当元素进入在界面中显示触发回调函数)*************************************/

/**
 * 按数组格式传入
 * @param LazyLoadData 要传入的数据  doc:元素节点；state:是否需要懒加载 false需要懒加载 callback: 回调函数
 *传入格式:
 *  [{"doc":".header","state": false,"callback": function(){alert(1)}},
     {"doc":".yb_louceng_1","state": false,"callback":function(){alert(2)}}]
 * @return
 */
function arrayLazyLoad(LazyLoadData){
    
    var yb_getScrollTop        =    getScrollTop(),        //滚动条在Y轴上的滚动距离
         yb_getWindowHeight    =    getWindowHeight(),   //浏览器窗口高度
         yb_chufa_zuixiao_y    =    yb_getScrollTop,   //触发的最小y值
         yb_chufa_zuida_y    =    yb_getScrollTop+yb_getWindowHeight;    //触发的最大y值
       
    //循环判断
    for(var i=0;i<LazyLoadData.length;i++){
        
        var yb_doc_start = $(LazyLoadData[i]["doc"]).offset.top,
            yb_doc_end = yb_doc_start + $(LazyLoadData[i]["doc"]).height();
       
        var yb_panduan_a    =    yb_chufa_zuixiao_y>=yb_doc_start && yb_chufa_zuixiao_y<=yb_doc_end,
            yb_panduan_b    =    yb_chufa_zuida_y>=yb_doc_start && yb_chufa_zuida_y<=yb_doc_end,
            yb_panduan_c    =    yb_chufa_zuixiao_y<=yb_doc_start && yb_chufa_zuida_y>=yb_doc_end;
            
        if((yb_panduan_a || yb_panduan_b || yb_panduan_c) && LazyLoadData[i]["state"]==false){
            LazyLoadData[i]["state"]    =    true;
            console.log("正在加载第"+i+"个楼层");
            if(typeof callback === "function"){
                LazyLoadData[i]["callback"]();
            }
        }
        
    }   
}

/**
 * 单个元素传入;
 * @param objId     元素ID
 * @param callback    回调函数
 * @return
 */
function lazyLoad(objId,callback){
    //检测callback参数是否为函数
    if(typeof callback === "function"){
        
        //生成滚轮监听触发事件
        var onScroll = function(){
            
            var $obj = $("#"+objId);
            
            var objTop = $obj.offset().top;
            var objBot = objTop + $obj.height();
            
            var scrollTop = getScrollTop();
            var scrollBot = scrollTop + getWindowHeight();
            
            //判断元素是否在用户视野内,如果是则触发回调函数,移除监听防止回调函数重复触发
            if(objTop <= scrollBot && objBot >= scrollTop){
                $(window).off("scroll", onScroll);
                callback();
            }
            
        }
        
        //开启滚轮监听
        $(window).on("scroll", onScroll);
        $(window).scroll();
        
    }
    
}
/**************************end** 懒加载方法(当元素进入在界面中显示触发回调函数)*************************************/

//滚动条在Y轴上的滚动距离
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}

//浏览器视口的高度
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}

// 懒加载页面内容
var LazyLoadData  =[
    {"doc":".header","state": false,"callback": function(){console.log(1)}},
    {"doc":".yb_louceng_1","state": false,"callback":function(){console.log(2)}},
    {"doc":".yb_louceng_2","state": false,"callback" : function(){console.log(3)}},
    {"doc":".yb_louceng_3","state": false,"callback" : function(){console.log(4)}},
    {"doc":".yb_louceng_4","state": false,"callback" : function(){console.log(5)}}
];
arrayLazyLoad(LazyLoadData);
$(window).scroll(function(){
    arrayLazyLoad(LazyLoadData);
});