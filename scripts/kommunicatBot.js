const botSignature = { name: "!Kommunicat", pos: "bot" };

function kommunicatResponse(input, user) {
  let response = "";
  let splitsUsed = 0;
  const splitInput = input.split(" ");

  switch (splitInput[0].toLowerCase()) {
    case "":
      response += purrpose();
      splitsUsed++;
      break;
    case " ":
      response += purrpose();
      splitsUsed++;
      break;
    case "purpose":
      response += purrpose();
      splitsUsed++;
      break;
    case "purrpose":
      response += purrpose();
      splitsUsed++;
      break;
    case "kommunicat":
      response += "That's me! 😸🧡";
      splitsUsed++;
      break;

    case "hi":
      response += greet(user);
      splitsUsed++;
      break;
    case "hey":
      response += greet(user);
      splitsUsed++;
      break;
    case "hello":
      response += greet(user);
      splitsUsed++;
      break;
    case "high-five":
      response += "✋🏾✨";
      splitsUsed++;
      break;
    case "highfive":
      response += "✋🏾✨";
      splitsUsed++;
      break;
    case "ping":
      response += "pong";
      splitsUsed++;
      break;

    case "whoami":
      response += whoami(user);
      splitsUsed++;
      break;

    case "echo":
      response += input.replace(/^echo /i, "");
      splitsUsed += splitInput.length;
      break;
    case "repeat":
      response += input.replace(/^repeat /i, "");
      splitsUsed += splitInput.length;
      break;
    case "whisper":
      response += input.replace(/^whisper /i, "").toLowerCase();
      splitsUsed += splitInput.length;
      break;
    case "shout":
      response += input.replace(/^shout /i, "").toUpperCase();
      splitsUsed += splitInput.length;
      break;

    case "set":
      variables[splitInput[1]] = splitInput[2];
      response += `${splitInput[1]} set to ${splitInput[2]}`;
      splitsUsed += 2;
      break;
    case "read":
      response += `${splitInput[1]} is equal to ${variables[splitInput[1]]}`;
      splitsUsed++;
      break;

    case "dice":
      response += dice(splitInput[1]);
      splitsUsed += 2;
      break;

    case "time":
      response += JSON.stringify(new Date());
      splitsUsed++;
      break;

    case "chess":
      input != "chess" && input != "chess "
        ? (response += chess(input.replace(/^chess /i, ""), user))
        : (response += chess("", user));
      splitsUsed++;
      break;

    default:
      response += `Sorry, I don't know what you mean by '${splitInput[0]}' :( <br> <br>
            For a list of commands I can execute just ask me for @! help`;
      splitsUsed += splitInput.length;
  }

  if (splitsUsed < splitInput.length)
    response += `<br><br>(Ignored unexpected expression '${input.slice(
      input.indexOf(splitInput[splitsUsed])
    )}')`;

  addMessage(response, botSignature);
}

function purrpose() {
  return `Hi! <br>
    I'm Kommunicat, IVPs chatroom-bot 😸 <br> <br>
    I'm here to accept and process your inputs - Just lead with @! and I'll listen! <br> <br>    
    For a list of commands I can execute just ask me for @! help <br> <br>
    Much love, <br>
    Kommunicat 🧡🧡`;
}

function greet(user) {
  if (user == undefined) {
    return "Hi! 🧡";
  }
  return `Hi, ${user.name}! 🧡`;
}

function whoami(user) {
  if (user == undefined) {
    return "You're an anonymous user!";
  }
  return `You're ${user.name}! <br> <br> ${JSON.stringify(user)}`;
}

function dice(num) {
  if (num == undefined) {
    return Math.ceil(Math.random() * 6);
  }
  if (parseFloat(num) == num) {
    return Math.ceil(Math.random() * parseFloat(num));
  }
  return "If you want to tell me what dice to throw, tell me how many faces it should have! <br> For example: @!dice 6";
}

function chess(str, user) {
  console.log(str);
  switch (str.split(" ")[0]) {
    case "init":
      const setUp = [
        "8♖♘♗♕♔♗♘♖",
        "7♙♙♙♙♙♙♙♙",
        "6        ",
        "5        ",
        "4        ",
        "3        ",
        "2♟♟♟♟♟♟♟♟",
        "1♜♞♝♛♚♝♞♜",
        " ABCDEFGH",
      ];
      return drawGame(setUp);
    case "help":
      return `After @! chess, you can use:
          <ul>
           <li>"init" to start a new game</li>
           <li>"mode" to choose whether the game is played by specific users or openly</li>
           <li>"invite" to ivite another user to an existing game</li>
           <li>The name of a field on the board in standard chess notation, for example "A1", to show legal moves for the chess piece at this location</li>
           <li>Two names of fields on the board in standard chess notation in a row to move a chess piece from the first location to the secon, if possible</li>
           `;
    case "":
      return `After @! chess, you can use:
          <ul>
           <li>"init" to start a new game</li>
           <li>"mode" to choose whether the game is played by specific users or openly</li>
           <li>"invite" to ivite another user to an existing game</li>
           <li>The name of a field on the board in standard chess notation, for example "A1", to show legal moves for the chess piece at this location</li>
           <li>Two names of fields on the board in standard chess notation in a row to move a chess piece from the first location to the secon, if possible</li>
           `;
    default:
      return `I don't know, what you mean by '${str}' :( <br><br>
            After @! chess, you can use:
            <ul>
            <li>"init" to start a new game</li>
            <li>"mode" to choose whether the game is played by specific users or openly</li>
            <li>"invite" to ivite another user to an existing game</li>
            <li>The name of a field on the board in standard chess notation, for example "A1", to show legal moves for the chess piece at this location</li>
            <li>Two names of fields on the board in standard chess notation in a row to move a chess piece from the first location to the secon, if possible</li>`;
  }

  function drawGame(arrangement) {
    const holder = document.createElement("div");
    const board = holder.appendChild(document.createElement("table"));

    board.style.margin = "1rem";
    board.style.borderCollapse = "collapse";

    for (let i = 0; i <= 8; i++) {
      const row = board.appendChild(document.createElement("tr"));
      for (let j = 0; j <= 8; j++) {
        const field = row.appendChild(document.createElement("td"));
        (i + j) % 2
          ? (field.style.backgroundColor = "#333")
          : (field.style.backgroundColor = "#222426");
        if (i == 8 || j == 0) field.style.backgroundColor = "inherit";

        if (j > 0 && i == 0) field.style.borderTop = "solid 2px #fff";
        if (j > 0 && i == 7) field.style.borderBottom = "solid 2px #fff";
        if (j == 1 && i < 8) field.style.borderLeft = "solid 2px #fff";
        if (j == 8 && i < 8) field.style.borderRight = "solid 2px #fff";

        field.style.height = "3rem";
        field.style.width = "3rem";
        field.style.padding = "0px";
        field.style.textAlign = "center";
        if (i != 8 && j != 0) {
          field.style.fontSize = "2rem";
          field.style.color = "#fff";
          field.style.fontWeight = "thin";
        }
        field.appendChild(document.createTextNode(arrangement[i][j]));
      }
    }

    let msg = holder.innerHTML;

    if (user) {
      msg += `<br><br>Players:${user.name} `;
    } else {
      msg += "<br><br>Open Round";
    }
    return msg;
  }
}

const variables = { pi: 3.141592653, e: 2.71828182845 };

const chessGame = [];

// -----

addMessage(
  "Dieser Bereich wird künftig der offizielle Chatroom der IVP",
  botSignature
);
addMessage(
  "Er befindet sich derzeit noch in der Entwicklungs- und Testphase",
  botSignature
);
