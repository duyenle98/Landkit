// Menu

const showToggleMenu = () => {
  var menu = document.getElementById("toggle-menu");
  menu.classList.add("show");
  var main = document.getElementById("main");
  main.classList.add("overflow");
};

const hiddenToggleMenu = () => {
  var menu = document.getElementById("toggle-menu");
  menu.classList.remove("show");
  var main = document.getElementById("main");
  main.classList.remove("overflow");

  var elements = document.getElementsByClassName("toggle-list-text");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("show");
  }
};

const showSubMenu = () => {
  var menus = document.getElementsByClassName("toggle-menu-dropdown");
  var elements = document.getElementsByClassName("toggle-list-text");
  var downs = document.getElementsByClassName("fa-angle-down");

  for (var i = 0; i < menus.length; i++) {
    menus[i].addEventListener("click", function () {
      var subMenu = this.getElementsByClassName("toggle-list-text")[0];
      var down = this.getElementsByClassName("fa-angle-down")[0];
      for (var j = 0; j < elements.length; j++) {
        if (elements[j] !== subMenu) {
          elements[j].classList.remove("show");
        }
      }
      for (var k = 0; k < downs.length; k++) {
        downs[k].style.transform = "rotate(0deg)";
        downs[k].style.textAlign = "right";
      }
      if (subMenu.className.indexOf("show") !== -1) {
        subMenu.classList.remove("show");
        down.style.transform = "rotate(0deg)";
        down.style.textAlign = "right";
      } else {
        subMenu.classList.add("show");
        down.style.transform = "rotate(180deg)";
        down.style.textAlign = "left";
      }
    });
  }
};

showSubMenu();

// Form
const validateForm = () => {
  var f_name = document.forms["form-download"]["f-name"].value;
  var f_email = document.forms["form-download"]["f-email"].value;
  var f_password = document.forms["form-download"]["f-password"].value;

  var fName = document.getElementById("validate-name");
  var fEmail = document.getElementById("validate-email");
  var fPassword = document.getElementById("validate-password");

  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (f_name === "") {
    fName.innerHTML = "Name must be filled out";
    return false;
  }

  if (f_email === "") {
    fEmail.innerHTML = "Email must be filled out";
    fName.innerHTML = "";
    return false;
  } else {
    if (!f_email.match(mailFormat)) {
      fEmail.innerHTML = "Email address is not valid";
      fName.innerHTML = "";
      return false;
    }
  }

  if (f_password === "") {
    fPassword.innerHTML = "Password must be filled out";
    fName.innerHTML = "";
    fEmail.innerHTML = "";
    return false;
  } else {
    if (f_password.length <= 8) {
      fPassword.innerHTML = "Password length is greater 8 characters";
      fName.innerHTML = "";
      fEmail.innerHTML = "";
      return false;
    }
  }
  fPassword.innerHTML = "";

  document.forms["form-download"].reset();
  console.log(f_name, f_email, f_password);
  return false;
};

// Slide

document.addEventListener(
  "DOMContentLoaded",
  function () {
    var arrowLeft = document.querySelector(".slick-prev");
    var arrowRight = document.querySelector(".slick-next");

    var slickTrack = document.querySelector(".wrapperCustomer");
    var slickSlice = document.querySelectorAll(".contentCustomer");
    var slickDots = document.querySelectorAll(".slick-dots li");

    var btn = document.querySelectorAll(".slick-dots button");
    var eleIsClicked = 0;

    var count = 1;
    var time = 4000;
    var stateTab = true;
    var stateTranslateOfSlickTrack = true;
    var v_interval = "";

    // Arrow left
    arrowLeft.addEventListener("click", function (e) {
      if (stateTranslateOfSlickTrack) {
        run_clearInterval();
        commonFuncBothArrows(true, false, e);
        run_setInterval();
      }
    });

    // Arrow right
    arrowRight.addEventListener("click", function (e) {
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
      slickDots[count - 1].classList.remove("slick-active");
      slickTrack.style.transition = `transform 0.5s ease-in-out`;
      count = arrowL ? --count : ++count;
      slickTrack.style.transform = `translateX(${
        -slickSlice[0].clientWidth * count
      }px)`;
      eleIsClicked = count - 1;
      switch (count) {
        case 0:
          slickDots[slickDots.length - 1].classList.add("slick-active");
          break;
        case slickSlice.length - 1:
          slickDots[0].classList.add("slick-active");
          break;
        default:
          slickDots[count - 1].classList.add("slick-active");
          break;
      }
    }

    btn.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (stateTranslateOfSlickTrack) {
          run_clearInterval();
          slickTrack.style.transition = `transform 0.5s ease-in-out`;
          count = Number(elem.textContent);
          slickDots[eleIsClicked].classList.remove("slick-active");
          slickDots[count - 1].classList.add("slick-active");
          slickTrack.style.transform = `translateX(${
            -slickSlice[0].clientWidth * count
          }px)`;
          eleIsClicked = count - 1;
          run_setInterval();
        }
      });
    });

    run_setInterval();
    function run_setInterval() {
      v_interval = setInterval(() => {
        slickDots[count - 1].classList.remove("slick-active");
        slickTrack.style.transition = "transform 0.5s ease-in-out";
        slickTrack.style.transform = `translateX(${
          -slickSlice[0].clientWidth * ++count
        }px)`;
        eleIsClicked = count - 1;
        if (count === slickSlice.length - 1) {
          slickDots[0].classList.add("slick-active");
        } else {
          slickDots[count - 1].classList.add("slick-active");
        }
      }, time);
    }

    function run_clearInterval() {
      clearInterval(v_interval);
    }

    slickTrack.addEventListener("transitionend", () => {
      stateTranslateOfSlickTrack = true;
      let nameClassSlickSlide = slickSlice[count].id;
      if (
        nameClassSlickSlide === "lastClone" ||
        nameClassSlickSlide === "firstClone"
      ) {
        slickTrack.style.transition = `none`;
        count =
          nameClassSlickSlide === "lastClone"
            ? slickSlice.length - 2
            : nameClassSlickSlide === "firstClone"
            ? 1
            : count;
        eleIsClicked = count - 1;
        slickTrack.style.transform = `translateX(-${
          slickSlice[0].clientWidth * count
        }px)`;
      }
    });
  },
  false
);

// Text
async function showText() {
  var text = document.getElementById("resource-text");
  var strings = ["designers.", "developers.", "founders."];
  while (true) {
    for (var i = 0; i < strings.length; i++) {
      var str = strings[i];
      for (var j = 0; j < str.length; j++) {
        text.innerHTML += str[j];
        await delay(50);
      }

      await delay(1000);

      for (var k = str.length - 1; k >= 1; k--) {
        var m = text.innerHTML.substr(0, k - 1);
        text.innerHTML = m;

        await delay(50);
      }
    }
  }
}

showText();

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
