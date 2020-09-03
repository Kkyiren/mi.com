import $ from './library/jquery.js';
import './library/jquery.lazyload.js';
import { cookie } from './library/cookie.js';

$("img.lazy").lazyload({
    placeholder: "../img/placeholder-40.png", //用图片提前占位
    // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
    effect: "fadeIn", // 载入使用何种效果
    // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
    // threshold: 200, // 提前开始加载
    // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
    // event: 'click',  // 事件触发时才加载
    // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
    // container: $("#container"),  // 对某容器中的图片实现效果
    // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
    // failurelimit : 10 // 图片排序混乱时
    // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
});

(function() {
    $('#secondery>.sec').hover(function() {
        let i = $('#secondery>.sec').index(this)
        $('#secondery>.submenu>.menubody').each(function(index, elm) {
            if (index == i) {
                $('#secondery>.submenu>.menubody').addClass('hide');
                $(this).removeClass('hide');
            }
        });
    });

    if (cookie.get('isLogined') == 'true') {
        $('#users').html() = cookie.get('username');
        $('#nav-logined').removeClass('hide');
        $('#nav-right').addClass('hide');
    } else {
        $('#nav-logined').addClass('hide');
        $('#nav-right').removeClass('hide');
    }

    $.ajax({
        type: "get",
        url: "../../interface/index.php",
        dataType: "json",
        success: function(res) {
            let temp = '';
            res.forEach((elm, i) => {
                let img = JSON.parse(elm.images);
                // console.log(elm);
                temp += `<div class="phoneshort">
                <a href="./product.html?id=${elm.id}">
                    <img src="${img[0].src}" alt="">
                    <h3>${elm.title}</h3>
                    <p>${elm.sectitle}</p>
                    <p>
                        <span>${elm.price}元起</span>
                    </p>
                </a>
            </div>`
            });
            $('#actload').append(temp);
        }
    });

    let arrplace = ['手机', '电视', '家电', '手表', '耳机', '小米10', '空调', '洗衣机', '冰箱', '液晶小黑板20英寸'];
    let arrindex = 0;
    setInterval(function() {
        $('#placeholder').attr('placeholder', arrplace[arrindex]);
        arrindex++;
    }, 3000)


    let index = 0;
    let k = 1;
    let time = null;

    function auto() {
        $('#sliderbody>a').eq(index).fadeIn('slow');
        $('#sliderbody>a').eq(index).siblings().not('div').not('span').fadeOut('slow');
        $('#sliderindex>li').removeClass('bgc');
        $('#sliderindex>li').eq(k).addClass('bgc');
    }
    time = setInterval(function() {
        if (index > 4) index = 0;
        if (k > 4) k = 0
        auto();
        index++;
        k++;
    }, 3000);

    $('#sliderindex>li').on('click', function() {
        k = $('.sliderindex>li').index(this);
        index = k - 1;
        auto();
    });

    $('#sliderbody').hover(function() {
            clearInterval(time);
        },

        function() {
            time = setInterval(function() {
                if (index > 4) index = 0;
                if (k > 4) k = 0
                auto();
                index++;
                k++;
            }, 3000);
        }
    );

    $('.next').on('click', function() {
        index += 1;
        if (index > 4) index = 0;
        k = index + 1;
        if (k > 4) k = 0
        auto();
        console.log(index, k);
    });
    $('.pre').on('click', function() {
        index -= 1;
        if (index < 0) index = 4;
        k = index + 1;
        if (k > 4) k = 0
        auto();
        console.log(index, k);
    });
})()