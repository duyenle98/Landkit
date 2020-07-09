// Menu

const showToggleMenu = () => {
  const menu = document.getElementById("toggle-menu");
  menu.classList.add("show");
  const main = document.getElementById("main");
  main.classList.add("overflow");
};

const hiddenToggleMenu = () => {
  const menu = document.getElementById("toggle-menu");
  menu.classList.remove("show");
  const main = document.getElementById("main");
  main.classList.remove("overflow");

  const elements = document.getElementsByClassName("toggle-list-text");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("show");
  }
};

const showSubMenu = () => {
  const menus = document.getElementsByClassName("toggle-menu-dropdown");
  const elements = document.getElementsByClassName("toggle-list-text");
  const downs = document.getElementsByClassName("fa-angle-down");

  for (let i = 0; i < menus.length; i++) {
    menus[i].addEventListener("click", () => {
      const subMenu = this.getElementsByClassName("toggle-list-text")[0];
      const down = this.getElementsByClassName("fa-angle-down")[0];
      for (let j = 0; j < elements.length; j++) {
        if (elements[j] !== subMenu) {
          elements[j].classList.remove("show");
        }
      }
      for (let k = 0; k < downs.length; k++) {
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
const validateForm = (e) => {
  e.preventDefault();
  const f_name = document.forms["form-download"]["f-name"].value;
  const f_email = document.forms["form-download"]["f-email"].value;
  const f_password = document.forms["form-download"]["f-password"].value;

  const fName = document.getElementById("validate-name");
  const fEmail = document.getElementById("validate-email");
  const fPassword = document.getElementById("validate-password");

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
  // return false;
};

// Slide

const carousel = () => {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      const arrowLeft = document.querySelector(".slick-prev");
      const arrowRight = document.querySelector(".slick-next");

      const slickTrack = document.querySelector(".wrapperCustomer");
      const slickSlice = document.querySelectorAll(".contentCustomer");
      const slickDots = document.querySelectorAll(".slick-dots li");

      const btn = document.querySelectorAll(".slick-dots button");

      const slickList = document.querySelector(".slick-list");

      let eleIsClicked = 0;

      let count = 1;
      let time = 4000;
      let stateTranslateOfSlickTrack = true;
      let v_interval = "";

      // Arrow left
      arrowLeft.addEventListener("click", (e) => {
        if (stateTranslateOfSlickTrack) {
          run_clearInterval();
          commonFuncBothArrows(true, false, e);
          run_setInterval();
        }
      });

      // Arrow right
      arrowRight.addEventListener("click", (e) => {
        if (stateTranslateOfSlickTrack) {
          run_clearInterval();
          commonFuncBothArrows(false, true, e);
          run_setInterval();
        }
      });

      const commonFuncBothArrows = (arrowL, arrowR, e) => {
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
      };

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

      const run_setInterval = () => {
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
      };

      run_setInterval();

      const run_clearInterval = () => {
        clearInterval(v_interval);
      };

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

      slickList.addEventListener("mousemove", () => {
        run_clearInterval();
      });
      slickList.addEventListener("mouseout", () => {
        run_setInterval();
      });
    },
    false
  );
};

carousel();

// Text

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const showText = async () => {
  const text = document.getElementById("resource-text");
  const cursor = document.getElementById("cursor");
  const strings = ["designers.", "developers.", "founders."];
  while (true) {
    for (let i = 0; i < strings.length; i++) {
      let str = strings[i];
      for (let j = 0; j < str.length; j++) {
        text.innerHTML += str[j];
        await delay(50);
      }

      for (let i = 0; i < 2; i++) {
        await delay(300);
        cursor.style.opacity = "0";
        cursor.style.transition = "all 0.3s";
        await delay(300);
        cursor.style.opacity = "1";
        cursor.style.transition = "all 0.3s";
        await delay(300);
      }

      for (let k = str.length - 1; k >= 1; k--) {
        let m = text.innerHTML.substr(0, k - 1);
        text.innerHTML = m;

        await delay(50);
      }
    }
  }
};

showText();

const check = async () => {
  const checkBox = document.getElementById("toggle");
  const number = document.getElementById("number");
  if (checkBox.checked == true) {
    for (let i = 29; i <= 49; i++) {
      number.innerHTML = i;
      await delay(40);
    }
  } else {
    for (let i = 49; i >= 29; i--) {
      number.innerHTML = i;
      await delay(40);
    }
  }
};
