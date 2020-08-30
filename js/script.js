const initOwl = function () {
    films.show(function() {
        movies_container = $("#movies_container").owlCarousel({
            nav: true,
            navText: ["<i class='icon icon-left'></i>","<i class='icon icon-right'></i>"]
        });
    });
}
var movies_container = {};

$(document).ready(function() {
    initOwl();
    shedule.show();
});
