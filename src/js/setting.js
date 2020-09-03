import $ from "./library/jquery.js";
import { cookie } from "./library/cookie.js";
import './library/jquery-md5.js';

(function() {
    let arr = location.search.split('=');
    let phone = arr[1].split('&')[0];
    let country = decodeURI(arr[2]);
    let reg = {
        "username": /^[A-z]\w{5,15}$/,
        "psw": /^.{6,16}$/,
    };
    $('#submit').prop('disabled', true);

    function check() {
        if ($('[data-pass=true]').length == 3) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', true);
        }
    }
    $('input:not([type="button"])').each(function(index, elm) {
        $(elm).on('input', function() {
            if ($(elm).attr('id') == 'cpsw') return;
            if (reg[$(elm).attr('id')].test($(elm).val())) {
                $('span[id="' + $(elm).attr('id') + 'check"]').html('通过验证');
                $(this).attr('data-pass', true);
            } else {
                $('span[id="' + $(elm).attr('id') + 'check"]').html('未通过验证');
                $(this).attr('data-pass', false);
            }
            check();
        });
    });
    $('#cpsw').on('input', function() {
        if ($(this).val() === $('#psw').val()) {
            $('#cpswcheck').html('通过验证');
            $(this).attr('data-pass', true);
        } else {
            $('#cpswcheck').html('两次输入的密码不同,请确认');
            $(this).attr('data-pass', false);
        }
        check();
    });
    $('#submit').on('click', function() {
        let username = $('#username').val();
        let password = $.md5($('#psw').val());

        $.ajax({
            type: "post",
            url: "../../interface/namereg.php",
            data: {
                username: username,
                password: password,
                phone: phone,
                country: country
            },
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    alert('注册成功，请登录');
                    cookie.set('username', username);
                    cookie.set('password', password);
                    location.href = "./login.html";
                } else {
                    alert('用户名已存在！');
                    location.href = "./setting.html";
                }
            }
        });
    });
})()