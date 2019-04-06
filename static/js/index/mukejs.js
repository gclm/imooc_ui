window.onload = function () {

    //页面加载
    // setInterval(function () {
    //     $(".loading").fadeOut();
    // },2000)

    //顶部搜索栏点击效果
    function sousuolan() {
        var searchbutton = document.getElementById("search-button");
        var qianduanrumen  = document.getElementById("qianduanrumen");
        var search = document.getElementById("search");
        var searcharea = document.getElementById("searcharea");
        searcharea.onclick = function () {
            search.style.borderBottom = "2px solid #F9A1A1";
            qianduanrumen.style.display = "none";
            searchbutton.style.background = "#F9A1A1";
            searchbutton.style.color = "#e4393c";
        }
        searcharea.onmouseout = function () {
            search.style.borderBottom = "1px solid #CCC";
            qianduanrumen.style.display = "block";
            searchbutton.style.background = "";
            searchbutton.style.color = "#93999F";
        }
    }
    sousuolan();

    //分类导航栏
    function daohang() {
        var ul = document.getElementById("Navigation");
        var lis = ul.getElementsByTagName("li");
        for(i=0;i<lis.length;i++) {
            lis[i].onmousemove = function () {
                this.className = "lihover";
            }
            lis[i].onmouseout = function () {
                this.className = "";
            }
        }
    }
    daohang();


    //顶部轮播图
    function toplunbo() {
        var next = document.getElementById("nex");
            pre = document.getElementById("pre");
            imgs = document.getElementById("lunbo-img").getElementsByTagName("img");
            imgss = document.getElementById("main-top-img").getElementsByTagName("img");
            dots = document.getElementById("lunbo-dots").getElementsByTagName("span");
            aaaaa = document.getElementById("lunbo-top");
            index = 0;
            lastindex = 0;
            var qqq;

            function auto() {
                qqq = setInterval(nexttt,2000);
            }
            auto();
            function stop() {
                clearInterval(qqq);
            }

                aaaaa.onmouseover = stop;
                aaaaa.onmouseout = auto;

            next.onclick =  nexttt;
                function nexttt() {
                changes(function () {
                    index++;
                    index %= imgs.length;
                });
            }
            pre.onclick = function () {
                changes(function () {
                    index--;
                    if(index < 0){index = imgs.length - 1;}
                })
            }

            for(var i = 0; i<dots.length;i++){
                dots[i].index = i;
                dots[i].onclick = function () {
                    var This = this.index;
                    changes(function () {
                        index = This;
                    })
                }
            }
            
            function changes(callback) {
                imgss[lastindex].className = "";
                imgs[lastindex].className = "";
                dots[lastindex].className = "";
                callback();
                imgss[index].className = "ononon";
                imgs[index].className = "imgon";
                dots[index].className = "active";
                lastindex = index;
            }

    }
    toplunbo();

    //回到顶部效果
    function fanhui() {
        var obtn = document.getElementById("fanhuitop");
        var timer = null;
        var istop = true;
        var clientHeight = document.documentElement.clientHeight;

        window.onscroll = function () {
            var ostop = document.documentElement.scrollTop || document.body.scrollTop;
            if(ostop >= clientHeight){
                obtn.style.display = "block";
            }else {
                obtn.style.display = "none";
            }
            if(!istop){
                clearInterval(timer);
            }
            istop = false
        }

        obtn .onclick = function () {
            timer = setInterval(function () {
                var ostop = document.documentElement.scrollTop || document.body.scrollTop;
                var ispeed = Math.floor(-ostop / 6);
                document.documentElement.scrollTop = document.body.scrollTop = ostop + ispeed;
                istop = true;
                if (ostop == 0){
                    clearInterval(timer);
                }
            },30)
        }
    }
    fanhui();


    //轮播图底部
    function lunbofoot() {
        var aa = document.getElementById("lunbo-foot").getElementsByTagName("a");
        for(i=0;i<aa.length;i++){
            aa[i].onmousemove = function () {
                this.className = "ahover";
            }
            aa[i].onmouseout = function () {
                this.className = "";
            }
        }
    }
    // lunbofoot();

    //瀑布流效果

    function pubuliu() {
        var dd = document.getElementById("main-4-container-dl").getElementsByTagName("dd");
        var ddW = dd[0].offsetWidth;
        var conW = document.getElementById("main-4-container").offsetWidth;
        var cols = Math.floor(conW/ddW);
        var hArr = [];
        for(var i=0;i<dd.length;i++){
            if(i<cols){
                hArr.push(dd[i].offsetHeight);

            }else {
                var minH = Math.min.apply(null,hArr);
                var index = getminHindex(hArr,minH);
                dd[i].style.position = "absolute";
                dd[i].style.top = minH+18+"px";
                dd[i].style.left = dd[index].offsetLeft+"px";
                hArr[index]+=dd[i].offsetHeight+18;
            }
        }
        function getminHindex(arr,val) {
            for(var j=0;j<arr.length;j++){
                if(arr[j]==val){
                    return j;
                }
            }
        }
    }
    // pubuliu();



//底部轮播图
    function dibulunbo() {
        var list = document.getElementById("main-5-container-main-list");
        var prev = document.getElementById("zuo");
        var next = document.getElementById("you");
        var buttons = document.getElementById("xia").getElementsByTagName("span");
        var index = 1;
        var timer;

        function showButton() {
            for(var i=0;i<buttons.length;i++){
                if(buttons[i].className == "activee"){
                    buttons[i].className = "";
                    break
                }
            }
            buttons[index-1].className = "activee"
        }

            function animate(offset) {
                var newLeft = parseInt(list.style.left) + offset;
                list.style.left =  parseInt(list.style.left) + offset +"px";
                if(newLeft > -1182){
                    list.style.left = -3546 + "px";
                }
                if(newLeft < -4724){
                    list.style.left = -1182 + "px";
                }
            }
            function play() {
                timer = setInterval(function () {
                    next.onclick();
                },2500)
            }
        play();
            function stop() {
                 clearInterval(timer);
          }

          list.onmouseover = stop;
          next.onmouseover = stop;
          prev.onmouseover = stop;
          list.onmouseout = play;



        next.onclick = function () {
            animate(-1182);
            if(index == 3){
                index = 1;
            }else {
                index += 1;
            }
            showButton();
        }
        prev.onclick = function () {
            animate(1182);
            if(index == 1){
                index = 3;
            }else {
                index -= 1;
            }
            showButton();
        }


        for(var i=0;i<buttons.length;i++){
            buttons[i].onclick = function () {
                if(this.className == "activee"){
                    return;
                }
                var myindex = parseInt(this.getAttribute("index"));
                var offset = -1182 *(myindex - index);
                animate(offset);
                index = myindex;
                showButton();
            }
        }
    }
    // dibulunbo();
}