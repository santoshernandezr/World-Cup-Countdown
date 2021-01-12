$('#clock-c').countdown("2022/11/21", function(event) {
    var $this = $(this).html(event.strftime(''
    + '<span class="h1 font-weight-bold">%D</span> Day%!d'
    + '<span class="h1 font-weight-bold">%H</span> Hr'
    + '<span class="h1 font-weight-bold">%M</span> Min'
    + '<span class="h1 font-weight-bold">%S</span> Sec'));
});
