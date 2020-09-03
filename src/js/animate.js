import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';
(function() {
    if (cookie.get('isLogined')) {
        $('nav-logined').removeClass('hide');
        $('nav-right').addClass('hide');
    } else {
        $('nav-logined').addClass('hide');
        $('nav-right').removeClass('hide');
    }
    $('#choice>li').on('click', function() {
        $(this).siblings().removeClass('choice');
        $(this).toggleClass('choice');
    });
    $('.service>ul>li').on('click', function() {
        $(this).siblings().removeClass('serchoice');
        $(this).toggleClass('serchoice');
    });


    $('li').on('click', function() {
        let arr = [];
        let obj = {};
        let m = 0;
        let con = parseFloat($('#settlement>ul>li:first-of-type>span').html());
        console.log($('.choice').text());
        if ($('.serchoice').length) {

            $('.serchoice').each(function(index, elm) {
                let key = $(elm).children('div').children('h3').html().split('<')[0];
                arr.push(key);
                obj[key] = $(elm).val();
                $('#settlement>ul>li:not(:first)').text('');
                $('#settlement>ul>li').remove('li:empty');
            });
            let set = new Set(arr);
            for (let i of set) {
                $('#settlement>ul').append(`
                        <li>${i}
                            <span>${obj[i]}元</span>
                        </li>            
                `);
                m += obj[i];
            }

        }
        $('#settlement>ul>li>div').html('Redmi K30 至尊纪念版 ' + $('.choice').text());
        $('.totalprice').html(`总计:${m+con}元`);
    });

    let index = 0;
    let k = 1;
    let time = null;

    function auto() {
        $('#showpro>img').eq(index).fadeIn('slow');
        $('#showpro>img').eq(index).siblings().not('div').not('span').fadeOut('slow');
        $('#imgindex>span').removeClass('active');
        $('#imgindex>span').eq(k).addClass('active');
    }
    time = setInterval(function() {
        if (index > 4) index = 0;
        if (k > 4) k = 0
        auto();
        index++;
        k++;
    }, 3000);

    $('#imgindex>span').on('click', function() {
        k = $('#imgindex>span').index(this);
        index = k - 1;
        auto();
    });

    $('#showpro').hover(function() {
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

    $('.right').on('click', function() {
        index += 1;
        if (index > 4) index = 0;
        k = index + 1;
        if (k > 4) k = 0
        auto();
        console.log(index, k);
    });
    $('.left').on('click', function() {
        index -= 1;
        if (index < 0) index = 4;
        k = index + 1;
        if (k > 4) k = 0
        auto();
        console.log(index, k);
    });


    $('#close').one('click', function() {
        $('.loginremaind').css('display', 'none');
    })
})()