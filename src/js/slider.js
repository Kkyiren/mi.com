import $ from './library/jquery.js';
(function() {
    let elm = {};
    let index = 0;
    let sliderWidth = $('#sliderbody>a').width();

    function start() {
        setInterval(function() {
            index++;
            if (index == 6) {
                index = 0;
                $('#sliderbody').animate({
                    left: -sliderWidth * index,
                    // "z-index": 20
                }, 0);
            } else {
                $('#sliderbody').animate({
                    // "z-index": 20
                    left: -sliderWidth * index,
                }, 1000);
            }
        }, 2000);
    }
    start(); //.bind($('#sliderindex>li'));
    $('#sliderindex>li').on('click', function() {
        index = $('#sliderindex>li').index(this);
        // console.log(index);
        $(this).siblings().removeClass('bgc');
        $(this).addClass('bgc');
        $('#sliderbody').animate({
            // "z-index": 30
            left: -sliderWidth * (index + 1),
        }, 500);
    });
})()