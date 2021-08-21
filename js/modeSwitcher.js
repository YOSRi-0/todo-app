const ModeSwitcher = document.querySelector(".theme-picker");
let darkMode = false;
const switchModeHandler = () => {
  switchMode();
  darkMode = !darkMode;
  console.log(darkMode);
};
const switchMode = () => {
  BackgroundChanger();
  ItemsBackgroundChanger();
  BorderChanger();
  TextColorChanger();
  ItemTextColorChanger();
  ChangeSwitchIcon();
};
const BackgroundChanger = () => {
  const contentEl = document.querySelector(".content");
  if (darkMode) {
    contentEl.classList.remove("dark-bg");
  } else {
    contentEl.classList.add("dark-bg");
  }
};
const ItemsBackgroundChanger = () => {
  const BackgroundEls = [];
  BackgroundEls.push(document.querySelector(".todo__add-item"));
  const todoItems = document.querySelectorAll(".todo__item");
  BackgroundEls.push(...todoItems);
  BackgroundEls.push(document.querySelector(".todo__info"));
  BackgroundEls.push(document.querySelector(".todo__filters"));
  BackgroundEls.push(document.querySelector(".todo__input"));
  if (darkMode) {
    BackgroundEls.forEach((el) => {
      el.classList.remove("dark-bg-items");
    });
  } else {
    BackgroundEls.forEach((el) => {
      el.classList.add("dark-bg-items");
    });
  }
};
const BorderChanger = () => {
  const BorderEls = [];
  const checkboxEls = document.querySelectorAll(".checkbox");
  const todoItems = document.querySelectorAll(".todo__item");
  BorderEls.push(...checkboxEls);
  BorderEls.push(...todoItems);
  if (darkMode) {
    BorderEls.forEach((el) => {
      console.log(el);
      el.classList.remove("dark-border");
    });
  } else {
    BorderEls.forEach((el) => el.classList.add("dark-border"));
  }
};
const TextColorChanger = () => {
  const todoInputEl = document.querySelector(".todo__input");
  const itemsLeftCounterEl = document.querySelector(".items-left");
  const clearCompletedEl = document.querySelector(".btn-cc");
  const filterButtons = document.querySelectorAll(".btn-filter");
  const TextEls = [];
  TextEls.push(
    todoInputEl,
    itemsLeftCounterEl,
    clearCompletedEl,
    ...filterButtons
  );
  if (darkMode) {
    TextEls.forEach((el) => {
      el.classList.remove("dark-mode-text-clr");
    });
  } else {
    TextEls.forEach((el) => el.classList.add("dark-mode-text-clr"));
  }
};
const ItemTextColorChanger = () => {
  const itemTextEls = document.querySelectorAll(".todo__item-text");
  if (darkMode === true) {
    itemTextEls.forEach((el) => {
      el.classList.remove("dark-mode-item-text-clr");
    });
  } else {
    itemTextEls.forEach((el) => el.classList.add("dark-mode-item-text-clr"));
  }
};
const ChangeSwitchIcon = () => {
  const switchIconEl = document.querySelector(".theme-picker");
  if (!darkMode) {
    switchIconEl.src = "./img/icon-sun.svg";
    switchIconEl.classList.remove("light-mode");
    switchIconEl.classList.add("dark-mode");
    return;
  }
  switchIconEl.src = "./img/icon-moon.svg";
  switchIconEl.classList.add("light-mode");
  switchIconEl.classList.remove("dark-mode");
};
ModeSwitcher.addEventListener("click", switchModeHandler);
/* -------------------------- light mode -------------------- */
