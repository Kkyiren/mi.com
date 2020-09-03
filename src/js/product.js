import { cookie } from './library/cookie.js';
import $ from './library/jquery.js';


(function() {
    let id = location.search.split('=')[1];

    $.ajax({
        type: "get",
        url: "../../interface/description.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(res) {

            $('#productdes').append(res.description);

            $(function() {
                if (cookie.get('isLogined') == 'true') {
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
                    $('.bigimg').children().remove();
                    $('.bigimg').append($('#showpro>img').eq(index).clone());
                    $('#showpro>img').eq(index).fadeIn('slow');
                    // $('.bigimg>img').attr('src', $('#showpro>img').eq(index).attr('src'));
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
                    // time = null;

                }, function() {
                    clearInterval(time);
                    time = setInterval(function() {
                        if (index > 4) index = 0;
                        if (k > 4) k = 0
                        auto();
                        index++;
                        k++;
                    }, 3000);
                });

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
            });
            $('#productdes').find('.tologin').on('click', function() {
                let price = parseFloat($('.totalprice').text().split(':')[1]);
                additem(res.id, price);
                location.href = "./cart.html";
            });

            function additem(id, price) {
                let shop = cookie.get('shop');

                let product = {
                    id: id,
                    price: price,
                }
                if (shop) {
                    shop = JSON.parse(shop);
                    if (!shop.some(elm => elm.id == id)) {
                        shop.push(product);
                    }
                } else {
                    shop = [];
                    shop.push(product);
                }
                cookie.set('shop', JSON.stringify(shop), 1)
            }

            $('#showpro').on('mouseover', function() {
                $('.movebox').removeClass('hide').addClass('show');
                $('.bigimg').removeClass('hide').addClass('show');

                // console.log($('#showpro').offset().top);
                $('#showpro').on('mousemove', function(ev) {
                    let top = ev.pageY - $('#showpro').offset().top - $('.movebox').height() / 2;
                    let left = ev.pageX - $('#showpro').offset().left - $('.movebox').width() / 2;
                    let ratio = $('.bigimg>img').width() / $('#showpro').width;

                    if (top <= 0) {
                        top = 0;
                    } else if (top >= $('#showpro').height() - $('.movebox').height()) {
                        top = $('#showpro').height() - $('.movebox').height();
                    }

                    if (left <= 0) {
                        left = 0;
                    } else if (left >= $('#showpro').width() - $('.movebox').width()) {
                        left = $('#showpro').width() - $('.movebox').width();
                    }

                    $('.movebox').css({
                        top: top + 'px',
                        left: left + 'px'
                    });

                    $('.bigimg>img').css({
                        top: ratio * -top + 'px',
                        left: ratio * -left + 'px'
                    });
                });
            });

            $('#showpro').on('mouseleave', function() {
                $('.movebox').removeClass('show').addClass('hide');
                $('.bigimg').removeClass('show').addClass('hide');
            });
        }
    });

})()