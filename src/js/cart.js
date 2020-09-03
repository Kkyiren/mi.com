import $ from "./library/jquery.js";
import { cookie } from "./library/cookie.js";

(function() {
    let shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop);

        let idlist = shop.map(elm => elm.id).join();

        $.ajax({
            type: "get",
            url: "../../interface/cart.php",
            data: {
                idlist: idlist
            },
            dataType: "json",
            success: function(res) {
                let temp = '';
                res.forEach((elm, i) => {
                    let img = JSON.parse(elm.images);
                    let num = res[i].quantity;
                    // console.log(res[i].quantity);
                    // console.log(res);
                    let arr = shop.filter(val => val.id == elm.id);
                    temp += `<div class="shoplist">
                        <input type="checkbox">
                        <div class="proimg">
                            <img src="${img[0].src}" alt="">
                        </div>
                        <p>${elm.title}</p>
                        <p class="single">${arr[0].price}</p>
                        <p>
                            <a href="javascript:;" class="minus">-</a>
                            <input type="text" value=1 max="${num}" class="number">
                            <a href="javascript:;" class="plus">+</a>
                        </p>
                        <p class="singletotal">${arr[0].price}元</p>
                        <p><span class="closedown">&times;</span></p>
                    </div>`;
                });

                $('.productlist').append(temp);
                $('.closedown').one('click', function() {
                    $(this).parents('.shoplist').attr('display', 'none');
                });
                // console.log(parseFloat($('.number').val()));
                $('.minus').on('click', function() {
                    let valu = parseFloat($(this).siblings('.number').val());
                    // if (typeof(valu) != 'Number') {
                    //     valu = 1;
                    //     $(this).siblings('.number').val(valu);
                    //     $(this).parent().siblings('.singletotal').html(Number($(this).parent().siblings('.single').html()) * (valu) + '元');
                    //     return;
                    // }
                    if (valu <= 1) {
                        valu = 1
                        $(this).siblings('.number').val(valu);
                        $(this).parent().siblings('.singletotal').html(Number($(this).parent().siblings('.single').html()) * valu + '元');
                        return;
                    }
                    // console.log(valu);
                    $(this).siblings('.number').val(valu - 1);
                    $(this).parent().siblings('.singletotal').html(Number($(this).parent().siblings('.single').html()) * (valu - 1) + '元');
                });
                $('.plus').on('click', function() {
                    let valu = parseFloat($(this).siblings('.number').val());
                    let max = parseFloat($(this).siblings('.number').attr('max'));
                    // console.log(max);
                    // if (typeof(valu) != 'Number') {
                    //     valu = 1;
                    //     $(this).siblings('.number').val(valu);
                    //     $(this).parent().siblings('.singletotal').html(Number($(this).parent().siblings('.single').html()) * (valu) + '元');
                    //     return;
                    // }
                    if (valu >= max) {
                        valu = max - 1;
                        $(this).siblings('.number').val(valu + 1);
                        $(this).parent().siblings('.singletotal').html(Number($(this).parent().siblings('.single').html()) * (valu + 1) + '元');
                        return;
                    }
                    $(this).siblings('.number').val(valu + 1);
                    $(this).parent().siblings('.singletotal').html(Number($(this).parent().siblings('.single').html()) * (valu + 1) + '元');
                });

                $('.closedown').on('click', function() {
                    let index = $('.shoplist').index($(this).parents('.shoplist'));
                    shop.splice(index - 1, 1);
                    cookie.set("shop", JSON.stringify(shop));
                    $(this).parents().remove('.shoplist');
                });

                $('#all').on('click', function() {
                    // console.log($(this).prop("checked", true));
                    $('input[type="checkbox"]').each(function(i, elm) {
                        $(elm).prop("checked", $('#all').prop('checked'));
                        // console.log($(elm));
                        console.log($(elm));
                    });
                    // console.log($('input[type="checkbox"]').prop('checked'))
                });
                $('input[type="checkbox"]').on('click', function() {
                    let quan = 0;
                    let total = $('input[type="checkbox"]').not('#all').length;
                    let totalprice = 0;
                    $('input[type="checkbox"]').not('#all').each(function(i, elm) {
                        if (!$(elm).prop("checked")) {
                            $('#all').prop('checked', false);
                        } else {
                            quan++;
                            totalprice += parseFloat($(elm).siblings('.singletotal').html());
                        }
                        // console.log(quan, total, totalprice);
                        $('.totalnum').html(total);
                        $('.num').html(quan);
                        $('.totalprice').html(totalprice);
                    });

                })
            }
        });
    }
})()