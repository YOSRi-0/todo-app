const manageCheckbox = () => {
  const checkboxWrapperEls = document.querySelectorAll(".checkbox__wrapper");
  checkboxWrapperEls.forEach((el) => {
    const checkboxEl = el.querySelector(".checkbox");
    const checkboxIcon = el.querySelector(".checked-icon");
    const todoText = el.nextElementSibling;
    el.addEventListener("click", () => {
      toggleCheckbox(checkboxEl, checkboxIcon, todoText);
    });

    checkboxEl.addEventListener("change", () => {
      toggleCheckbox(checkboxEl, checkboxIcon, todoText);
    });
  });
};
const toggleCheckbox = (element1, element2, todoText) => {
  element1.checked = !element1.checked;
  element2.style.display = element1.checked ? "block" : "none";
  if (todoText.tagName === "P") {
    element1.checked
      ? todoText.classList.add("is-completed")
      : todoText.classList.remove("is-completed");
  }
};
window.addEventListener("load", manageCheckbox);
