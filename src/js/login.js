import $ from "./library/jquery.js";
import { cookie } from "./library/cookie.js";

(function() {
    // let username = cookie.get('username');
    // let password = cookie.get('password');

    // if (username && password) {
    //     $(username).html(username);
    //     $(password).html(password);
    // }


    $('#login').on('click', function() {
        let username = $('#username').val();
        let password = $('#password').val();
        $.ajax({
            type: "get",
            url: "../../interface/login.php",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    cookie.set("isLogined", 'true');
                    cookie.set("username", username);
                    location.href = "./index.html";
                } else {
                    cookie.set("isLogined", 'false');
                    alert('账号或密码错误');
                    location.href = "./login.html";
                }
            }
        });
    })
})()