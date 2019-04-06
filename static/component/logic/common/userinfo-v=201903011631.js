define(function(require, exports, module) {
    var formatStr=function(uInfo){
        // 我的优惠券红点显示
        var couponsStr = '';
        if(uInfo.coupons != 0) {
            couponsStr = '<i id="js-usercard-coupon-icon"></i>'
        }
        var cardStr='<div class="card-inner">\
                        <div class="card-top clearfix">\
                            <a href="/u/index" class="l"><img src="'+uInfo.img+'" alt="'+uInfo.nickname+'"></a>\
                            <div class="card-top-right-box l">\
                                <a href="/u/index"><span class="name text-ellipsis">'+uInfo.nickname+'</span></a>\
                                <div class="meta">\
                                    <a href="/u/index/experience">经验<b id="js-user-mp">'+(uInfo.mp?uInfo.mp:0)+'</b></a>\
                                    <a href="/u/index/credit">积分<b id="js-user-credit">'+(uInfo.credit?uInfo.credit:0)+'</b></a>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="user-center-box">\
                            <ul class="clearfix">\
                                <li class="l"><a href="/u/index/courses" target="_blank"><span class="user-center-icon icon-tick"></span>我的课程</a></li>\
                                <li class="l">\
                                    <a href="//order.imooc.com/myorder" target="_blank"><span class="user-center-icon icon-receipt"></span>订单中心</a>\
                                    '+couponsStr+'\
                                </li>\
                                <li class="l"><a href="/mall/index" target="_blank"><span class="user-center-icon icon-score_shop"></span>积分商城</a></li>\
                                <li class="l"><a href="/user/setbindsns" target="_blank"><span class="user-center-icon icon-set"></span>个人设置</a></li>\
                            </ul>\
                        </div>';

        if(uInfo.last_learning && uInfo.last_learning != ''){
            cardStr+='<div class="card-history">\
                            <span class="history-item">\
                                <span class="tit text-ellipsis">'+uInfo.last_learning.course_name+'</span>\
                                <span class="media-name text-ellipsis">'+uInfo.last_learning.last_chapter_media+' '+uInfo.last_learning.media_name+'</span>\
                                <i class="icon-clock"></i>\
                                <a href="'+uInfo.last_learning.url+'" class="continue" title="'+uInfo.last_learning.course_name+'&#10;'+uInfo.last_learning.last_chapter_media+'  '+uInfo.last_learning.media_name+'">继续</a>\
                            </span>\
                    </div>'            
        }


        cardStr  +=     '<div class="card-sets clearfix"><a href="/passport/user/logout?referer=//www.imooc.com"class="l">安全退出</a></div>\
                    </div>'
        return cardStr;
    }

    var init=function(){

        if(isLogin){
            $.ajax({
                url: '/u/card ',
                type: 'get',
                dataType: 'jsonp',
                jsonp:'jsonpcallback',
            })
            .done(function(res) {
                if(res.result==0){
                    if(OP_CONFIG.userInfo){
                        OP_CONFIG.userInfo.nickname = res.data.nickname;
                        OP_CONFIG.userInfo.head = res.data.img;
                        $(".js-header-nickname").text(res.data.nickname);
                        $(".js-header-credit").text(res.data.credit);
                        if(res.data.user_type && res.data.user_type == 2){
                            $(".js-wd-type-teach").show();
                        }
                    }
                    $(".js-header-avator img").attr("src",res.data.img)
                    $('.g-user-card').html(formatStr(res.data)).show()
                    // 触发事件回调
                    $('#header-avator').trigger('userInfoLoaded', res.data);
                }
            })
        }
    }
    init()

});