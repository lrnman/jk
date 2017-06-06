/**
 * Created by Jerry on 2017/6/1.
 */
$(function () {
    $('.content .head .text a').tooltip();
    $('#personalassets .fa-question-circle').tooltip();
    $('#coupon .detail').tooltip();
    $('#smart_manage .fa-question-circle').tooltip();

    if (localStorage.getItem('eye-status') == 'true') {
        $('.open-eye').show();
        $('.close-eye').hide();
    } else {
        $('.close-eye').show();
        $('.open-eye').hide();
    }

    $('.eye').on('click', function () {
        if ($(this).data('control') == 'open') {
            $('.open-eye').show();
            $('.close-eye').hide();
        } else {
            $('.close-eye').show();
            $('.open-eye').hide();
        }
        localStorage.setItem('eye-status', $(this).data('control') == 'open');
    });
});