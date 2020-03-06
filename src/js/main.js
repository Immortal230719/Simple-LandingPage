$(document).ready(function() {
  //! navFixed fadeIn

  let windowWidth = window.innerWidth;

  $(window).scroll(function() {
    if ($(this).scrollTop() > 150 && windowWidth > 576) {
      $("nav_fixed").hide();
      $(".nav_fixed").fadeIn();
    } else {
      $(".nav_fixed").fadeOut();
    }
  });

  //! slider

  $("#slider").slick({
    infinite: true,
    slidesToShow: 1,
    arrows: true,
    variableWidth: true,
    slidesToScroll: 1,
    dotsClass: "my-dots",
    dots: true,
    speed: 1000,
    centerMode: true,
    prevArrow: '<button type="button" class="slick-prev"><</button>',
    nextArrow: '<button type="button" class="slick-next">></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false
        }
      }
    ]
  });

  //! pageUp button

  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $(".page-up").fadeIn();
    } else {
      $(".page-up").fadeOut();
    }
  });

  $("#page-up").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});
