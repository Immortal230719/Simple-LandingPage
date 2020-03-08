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

  $("#phone").mask("8 (999) 999-99-99");

  /*==================================================================
  [ Validate ]*/
  var input = $(".validate-input .input100");
  var checkArr = [];
  var nameValid = false;
  var phoneValid = false;

  $("#popup-form").on("submit", function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) === false) {
        showValidate(input[i]);
        check = false;
      }
    }
  });

  $("#name").on("change", nameHandler);
  $("#phone").on("change", phoneHandler);

  function phoneHandler() {
    if (validate($("#phone")) === false) {
      phoneValid = false;
    } else {
      phoneValid = true;
    }

    enableBtn(phoneValid, nameValid);
  }

  function nameHandler() {
    if (validate($("#name")) === false) {
      nameValid = false;
    } else {
      nameValid = true;
    }

    enableBtn(phoneValid, nameValid);
  }

  $(".validate-form .input100").each(function() {
    $(this).focus(function() {
      hideValidate(this);
      $(this)
        .parent()
        .removeClass("true-validate");
    });
  });

  function validate(input) {
    if ($(input).attr("name") === "phone") {
      var value = $(input)
        .val()
        .includes("_");
      if (value) {
        return false;
      }
    }
    if (
      $(input)
        .val()
        .trim() == ""
    ) {
      return false;
    }

    return true;
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

  function enableBtn(name, phone) {
    setTimeout(function() {
      if (name && phone) {
        $("#contact-submit-btn").attr("disabled", false);
      } else {
        $("#contact-submit-btn").attr("disabled", true);
      }
    }, 0);
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
    $("#popup")
      .fadeIn(300)
      .css("display", "flex");
  });

  $("#header-mail").on("click", function() {
    $("#popup")
      .fadeIn(300)
      .css("display", "flex");
  });

  $("#nav-mail").on("click", function() {
    $("#popup")
      .fadeIn(300)
      .css("display", "flex");
  });

  $("#promo-btn").on("click", function() {
    $("#popup")
      .fadeIn(300)
      .css("display", "flex");
  });

  $("#footer-btn").on("click", function() {
    $("#popup")
      .fadeIn(300)
      .css("display", "flex");
  });

  $("#products-btn").on("click", function() {
    $("#popup")
      .fadeIn(300)
      .css("display", "flex");
  });

  //!submit

  $("#popup-form").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: $(this).serialize()
    })
      .done(function() {
        $(this)
          .find("input")
          .val("");

        $("#popup").fadeOut();
      })
      .fail(function() {
        $(this)
          .find("input")
          .val("");

        $("#popup").fadeOut();
      });
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
