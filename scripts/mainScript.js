function openDir(btn) {
  const docChildren = btn.parentElement.children;

  switch (btn.getAttribute("open")) {
    case "false":
      for (let i = 0; i < docChildren.length; i++) {
        if (
          docChildren[i].getAttribute("href").replace(/\/[^\/]+$/, "") ==
          btn.getAttribute("href")
        )
          docChildren[i].classList.remove("hide");
      }

      btn.setAttribute("open", "true");
      btn.children[0].setAttribute("src", "./img/prev/openFolderPrev.svg");
      break;

    case "true":
      for (let i = 0; i < docChildren.length; i++) {
        if (
          docChildren[i]
            .getAttribute("href")
            .includes(btn.getAttribute("href") + "/")
        ) {
          docChildren[i].classList.add("hide");

          if (docChildren[i].getAttribute("open") == "true") {
            docChildren[i].setAttribute("open", "false");
            docChildren[i].children[0].setAttribute(
              "src",
              "./img/prev/closedFolderPrev.svg"
            );
          }
        }
      }

      btn.setAttribute("open", "false");
      btn.children[0].setAttribute("src", "./img/prev/closedFolderPrev.svg");
      break;
  }
}

function updateContentsCurrent() {
  const contents = document.getElementById("contents").children[0];
  for (let i = 0; i < contents.children.length; i++) {
    const section = document.querySelector(
      "a" + contents.children[i].children[0].getAttribute("href")
    );
    if (section == null) {
      contents.children[i].classList.add("corrupt");
      continue;
    }
    const checkRect = section.parentElement.getBoundingClientRect();
    if (
      checkRect.y < window.innerHeight / 3 &&
      checkRect.y + checkRect.height >= window.innerHeight / 3
    ) {
      contents.children[i].classList.add("current");
      continue;
    }
    contents.children[i].classList.remove("current");
  }
}

function conditionalSmoothToggle(element, time, minwidth) {
  if (window.innerWidth > minwidth) return;

  if (element.classList.contains("condHide")) {
    element.classList.remove("condHide");
    setTimeout(() => {
      element.classList.remove("condOffscreen");
    }, 0);
    return;
  }

  element.classList.add("condOffscreen");
  setTimeout(() => {
    element.classList.add("condHide");
  }, time);
}

function conditionalClearFocus(event) {
  if (
    event.target.matches(".keepFocus") ||
    event.target.matches(".keepFocus *")
  )
    return;

  const actives = document.querySelectorAll(".focusActive");
  for (let i = 0; i < actives.length; i++) {
    actives[i].click();
  }
}

function switchTheme() {
  const stlink = document.getElementById("themeStyleLink");
  console.log(stlink.getAttribute("href").match(/theme\w+/)[0]);
  switch (stlink.getAttribute("href").match(/theme\w+/)[0]) {
    case "themeLight":
      stlink.setAttribute("href", "css/themeDark.css?v=" + new Date().getTime);
      console.log(stlink);
      break;
    case "themeDark":
      stlink.setAttribute("href", "css/themeLight.css?v=" + new Date().getTime);
      console.log(stlink);
      break;
  }
}

window.onscroll = updateContentsCurrent;
window.onclick = conditionalClearFocus;
updateContentsCurrent();
