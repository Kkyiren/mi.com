import $ from '../js/library/jquery.js';

(function() {
    $('#submit').prop('disabled', true);
    let flag = false;
    $('#phone').on('input', function() {
        let phone = /^1[3-9]\d{9}$/;
        if (phone.test($(this).val())) {
            flag = true;
            $('#warning').html('通过验证');
        } else {
            flag = false;
            $('#warning').html('未通过验证');
        }
        if (flag) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', true);
        }
    });
    $('#submit').on('click', function() {
        let phone = parseInt($('#phone').val());
        let country = $('#country').text();
        // console.log(phone);
        $.ajax({
            type: "get",
            url: "../../interface/register.php",
            data: {
                phone: phone
            },
            dataType: "json",
            success: function(res) {
                if (res.has) {
                    alert('手机号已注册，请登录');
                    location.href = "./login.html";
                } else {
                    location.href = "./setting.html?phone=" + phone + "&country=" + country;
                }
            }
        });
    })
})()