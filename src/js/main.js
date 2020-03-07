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

  //! masked input

  $("input[name=phone]").mask("8 (999) 999-99-99");

  /*==================================================================
  [ Validate after type ]*/
  $(".validate-input .input100").each(function() {
    $(this).on("blur", function() {
      if (validate(this) == false) {
        showValidate(this);
      } else {
        $(this)
          .parent()
          .addClass("true-validate");
      }
    });
  });

  /*==================================================================
  [ Validate ]*/
  var input = $(".validate-input .input100");
  var checkArr = [];

  $("#popup-form").on("submit", function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) === false) {
        showValidate(input[i]);
        check = false;
      }
    }
  });

  $("#popup-form input").on("blur", function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) === false) {
        check = false;
      }
      checkArr.push(check);
    }
    console.log(checkArr);

    if (enableBtn(checkArr)) {
      $("#contact-submit-btn").attr("disabled", false);
    } else {
      $("#contact-submit-btn").attr("disabled", true);
    }

    checkArr = [];
  });

  $(".validate-form .input100").each(function() {
    $(this).focus(function() {
      hideValidate(this);
      $(this)
        .parent()
        .removeClass("true-validate");
    });
  });

  function validate(input) {
    var valid = true;

    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return (valid = false);
      }
    }
    if ($(input).attr("name") === "phone") {
      if (
        $(input)
          .val()
          .trim()
          .match(/[0-9]/) === null &&
        $(input).val().length !== 11
      ) {
        return (valid = false);
      }
    }
    if (
      $(input)
        .val()
        .trim() == ""
    ) {
      return (valid = false);
    }

    return valid;
  }
  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");

    $(thisAlert).append('<span class="btn-hide-validate">X</span>');
    $(".btn-hide-validate").each(function() {
      $(this).on("click", function() {
        hideValidate(this);
      });
    });
  }

  function enableBtn(checkArr) {
    var res = checkArr.every(function(el) {
      return el === true;
    });

    return res;
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass("alert-validate");
    $(thisAlert)
      .find(".btn-hide-validate")
      .remove();
  }

  /*==================================================================
  [ Show / hide contact ]*/
  $(".btn-hide-contact100").on("click", function() {
    $("#popup").fadeOut(300);
  });

  $("#popup").on("click", function(e) {
    if (e.target.className === "container-contact100") {
      $("#popup").fadeOut(300);
    }
    return;
  });

  $(".popup-show").on("click", function() {
    $("#popup").fadeIn(300);
  });

  $("#header-mail").on("click", function() {
    $("#popup").fadeIn(300);
  });

  $("#nav-mail").on("click", function() {
    $("#popup").fadeIn(300);
  });

  $("#promo-btn").on("click", function() {
    $("#popup").fadeIn(300);
  });

  $("#products-btn").on("click", function() {
    $("#popup").fadeIn(300);
  });

  //! pageUp button

  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $("#page-up").fadeIn();
    } else {
      $("#page-up").fadeOut();
    }
  });

  $("#page-up").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});
