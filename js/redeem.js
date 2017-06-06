/**
 * Created by Jerry on 2017/6/2.
 */
$(function () {
    $('.option').on('click', function () {
        $('.option').removeClass('selected');
        $(this).addClass('selected');
    });
});