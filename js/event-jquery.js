// Menu
const bars = $(".fa-bars");
const times = $(".fa-times");
const toggleMenu = $(".toggle-menu");
const main = $("body.main");
const collapseMenu = $(".toggle-list-text");

bars.click(() => {
  toggleMenu.addClass("show");
  main.addClass("overflow");
});

times.click(() => {
  toggleMenu.removeClass("show");
  main.removeClass("overflow");
  collapseMenu.removeClass("show");
});

const menus = $(".toggle-menu-dropdown");
const downs = $(".fa-angle-down");

menus.click(function () {
  collapseMenu.not($(this).find(".toggle-list-text")).removeClass("show");
  downs.not($(this).find(".fa-angle-down")).addClass("show");
  $(this).find(".toggle-list-text").toggleClass("show");
  $(this).find(".fa-angle-down").toggleClass("show");
});

// Form
const validateForm = (e) => {
  e.preventDefault();
  const f_name = $("[name='f-name']").val();
  const f_email = $("[name='f-email']").val();
  const f_password = $("[name='f-password']").val();

  const fName = $("#validate-name");
  const fEmail = $("#validate-email");
  const fPassword = $("#validate-password");

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (f_name === "") {
    fName.text("Name must be filled out");
    return false;
  }

  if (f_email === "") {
    fEmail.text("Email must be filled out");
    fName.text("");
    return false;
  } else {
    if (!f_email.match(mailFormat)) {
      fEmail.text("Email address is not valid");
      fName.text("");
      return false;
    }
  }

  if (f_password === "") {
    fPassword.text("Password must be filled out");
    fName.text("");
    fEmail.text("");
    return false;
  } else {
    if (f_password.length <= 8) {
      fPassword.text("Password length is greater 8 characters");
      fName.text("");
      fEmail.text("");
      return false;
    }
  }
  fPassword.text("");

  $("[name='form-download']").trigger("reset");
  console.log(f_name, f_email, f_password);
  // return false;
};

// Slide
const carousel = () => {
  const arrowLeft = $(".slick-prev");
  const arrowRight = $(".slick-next");

  const slickTrack = $(".wrapperCustomer");
  const slickSlice = $(".contentCustomer");
  const slickDots = $(".slick-dots li");

  const btn = $(".slick-dots button");

  const slickList = $(".slick-list");

  let eleIsClicked = 0;

  let count = 1;
  let time = 4000;
  let stateTranslateOfSlickTrack = true;
  let v_interval = "";

  // Arrow left
  arrowLeft.click((e) => {
    if (stateTranslateOfSlickTrack) {
      run_clearInterval();
      commonFuncBothArrows(true, false, e);
      run_setInterval();
    }
  });

  // Arrow right
  arrowRight.click((e) => {
    if (stateTranslateOfSlickTrack) {
      run_clearInterval();
      commonFuncBothArrows(false, true, e);
      run_setInterval();
    }
  });

  function commonFuncBothArrows(arrowL, arrowR, e) {
    e.preventDefault();
    stateTranslateOfSlickTrack = false;
    if (arrowL) {
      if (count <= 0) {
        return;
      }
    } else {
      if (arrowR) {
        if (count >= slickSlice.length - 1) {
          return;
        }
      }
    }
    slickDots.eq(count - 1).removeClass("slick-active");
    slickTrack.css("transition", "transform 0.5s ease-in-out");
    count = arrowL ? --count : ++count;
    slickTrack.css(
      "transform",
      `translateX(${-slickSlice[0].clientWidth * count}px)`
    );
    eleIsClicked = count - 1;
    switch (count) {
      case 0:
        slickDots.eq(slickDots.length - 1).addClass("slick-active");
        break;
      case slickSlice.length - 1:
        slickDots.eq(0).addClass("slick-active");
        break;
      default:
        slickDots.eq(count - 1).addClass("slick-active");
        break;
    }
  }

  btn.click(function () {
    if (stateTranslateOfSlickTrack) {
      run_clearInterval();
      slickTrack.css("transition", `transform 0.5s ease-in-out`);
      count = Number($(this).text());
      slickDots.eq(eleIsClicked).removeClass("slick-active");
      slickDots.eq(count - 1).addClass("slick-active");
      slickTrack.css(
        "transform",
        `translateX(${-slickSlice[0].clientWidth * count}px)`
      );
      eleIsClicked = count - 1;
      run_setInterval();
    }
  });

  const run_setInterval = () => {
    v_interval = setInterval(() => {
      slickDots.eq(count - 1).removeClass("slick-active");
      slickTrack.css("transition", "transform 0.5s ease-in-out");
      slickTrack.css(
        "transform",
        `translateX(${-slickSlice[0].clientWidth * ++count}px)`
      );
      eleIsClicked = count - 1;
      if (count === slickSlice.length - 1) {
        slickDots.eq(0).addClass("slick-active");
      } else {
        slickDots.eq(count - 1).addClass("slick-active");
      }
    }, time);
  };

  run_setInterval();

  const run_clearInterval = () => {
    clearInterval(v_interval);
  };

  slickTrack.on("transitionend", () => {
    stateTranslateOfSlickTrack = true;
    let nameClassSlickSlide = slickSlice.eq(count).attr("id");
    if (
      nameClassSlickSlide === "lastClone" ||
      nameClassSlickSlide === "firstClone"
    ) {
      slickTrack.css("transition", "none");
      count =
        nameClassSlickSlide === "lastClone"
          ? slickSlice.length - 2
          : nameClassSlickSlide === "firstClone"
          ? 1
          : count;
      eleIsClicked = count - 1;
      slickTrack.css(
        "transform",
        `translateX(-${slickSlice[0].clientWidth * count}px)`
      );
    }
  });

  slickList.mousemove(() => {
    run_clearInterval();
  });
  slickList.mouseout(() => {
    run_setInterval();
  });
};

carousel();

// Text
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const showText = async () => {
  const word = $("#resource-text");
  const cursor = $("#cursor");
  const strings = ["designers.", "developers.", "founders."];
  while (true) {
    for (let i = 0; i < strings.length; i++) {
      let str = strings[i];
      for (let j = 0; j < str.length; j++) {
        word.text(word.text() + str[j]);
        await delay(50);
      }

      for (let i = 0; i < 2; i++) {
        await delay(300);
        cursor.css("opacity", "0");
        cursor.css("transition", "all 0.3s");
        await delay(300);
        cursor.css("opacity", "1");
        cursor.css("transition", "all 0.3s");
        await delay(300);
      }

      for (let k = str.length - 1; k >= 1; k--) {
        let m = word.text().substr(0, k - 1);
        word.text(m);

        await delay(50);
      }
    }
  }
};

showText();

const check = async () => {
  const checkBox = $("#toggle");
  const number = $("#number");
  if (checkBox.is(":checked") === true) {
    for (let i = 29; i <= 49; i++) {
      number.text(i);
      await delay(40);
    }
  } else {
    for (let i = 49; i >= 29; i--) {
      number.text(i);
      await delay(40);
    }
  }
};
