const form = document.querySelector("#input");
const textIn = document.querySelector("#input #textIn");
const history = document.querySelector("#history");
let shift = false;

function addUser(name = "", pos = "user", isSelf = false) {
  const usrData = { name, pos, isSelf };
  const newUser = document
    .querySelector("#userInput *")
    .appendChild(document.createElement("option"));
  newUser.value = JSON.stringify(usrData);
  newUser.appendChild(document.createTextNode(name));
}

form.onsubmit = () => {
  if (textIn.innerHTML == "") return false;
  addMessage(
    textIn.innerHTML,
    JSON.parse(document.querySelector("#userInput *").value)
  );
  textIn.innerHTML = "";
  return false;
};
textIn.addEventListener("keydown", (e) => {
  if (e.key == "Shift") shift = true;
  if (!shift && e.key == "Enter") {
    e.preventDefault();
    form.onsubmit();
  }
  setTimeout(() => {
    const nonoOpen = /<div.*?>/g;
    const nonoClose = /<\/div>/g;
    if (nonoOpen.test(textIn.innerHTML) || nonoClose.test(textIn.innerHTML)) {
      textIn.innerHTML = textIn.innerHTML.replace(nonoOpen, "<br>");
      textIn.innerHTML = textIn.innerHTML.replace(nonoClose, "");
    }
  }, 1);
});
textIn.addEventListener("keyup", (e) => {
  if (e.key == "Shift") shift = false;
});

function addMessage(text, user) {
  text = text.toString();
  const newMsg = document.createElement("div");
  newMsg.classList.add("message");

  const actions = document.createElement("div");
  const del = document.createElement("button");
  const answer = document.createElement("button");

  actions.classList.add("msgActions");
  del.innerHTML = "Delete";
  del.onclick = () => {
    const msgblock = newMsg.parentElement;
    msgblock.removeChild(newMsg);
    if (msgblock.children.length <= 0)
      msgblock.parentElement.removeChild(msgblock);
  };
  answer.innerHTML = "Answer";
  actions.appendChild(del);
  actions.appendChild(answer);
  newMsg.appendChild(actions);

  const content = document.createElement("div");
  content.innerHTML += text;
  content.classList.add("msgCont");
  newMsg.appendChild(content);

  const timestamp = document.createElement("div");
  const now = new Date();
  timestamp.appendChild(
    document.createTextNode(
      `${now.getHours().toString().padStart(2, 0)}:${now
        .getMinutes()
        .toString()
        .padStart(2, 0)}`
    )
  );
  timestamp.classList.add("msgTime");
  content.appendChild(timestamp);

  if (user) {
    switch (user.pos) {
      case "IVPmember":
        newMsg.classList.add("IVPmember");
        break;
      case "IVP":
        newMsg.classList.add("IVP");
        break;
      case "bot":
        newMsg.classList.add("bot");
        break;
    }
  }

  if (
    user &&
    history.lastChild &&
    history.lastChild.user &&
    history.lastChild.user.name == user.name
  ) {
    history.lastChild.appendChild(newMsg);
  } else {
    const newMsgBlock = document.createElement("div");
    newMsgBlock.classList.add("msgBlock");
    if (user) {
      newMsgBlock.user = user;
      if (user.isSelf) newMsgBlock.classList.add("self");
      const name = document.createElement("div");
      name.classList.add("userName");
      name.appendChild(document.createTextNode(user.name));
      content.insertBefore(name, content.firstChild);
    }
    newMsgBlock.appendChild(newMsg);
    history.appendChild(newMsgBlock);
  }
  history.scrollTop = history.scrollHeight;

  if (text.match(/^(<br>|&nbsp;|\s)*@!/)) {
    setTimeout(() => {
      kommunicatResponse(
        text
          .replace(/(&nbsp; ?|<.*?>|\s)+/g, " ")
          .replace(/^ ?@! ?/, "")
          .replace(/ $/, ""),
        user
      );
    }, 0);
  }
}

function callKommunicat(text, user) {}
