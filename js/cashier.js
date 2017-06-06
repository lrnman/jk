/**
 * Created by Jerry on 2017/5/31.
 */
$(function () {
    $(':radio').on('click', function () {
        $(this).parents('.payment-instrument').addClass('active').siblings().removeClass('active');
    })
});