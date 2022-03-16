function kommunicatResponse(command, user) {
  const handler = {
    command,
    user,
    response: "",
    firstWd() {
      return this.command.split(" ")[0];
    },
    updateCommand() {
      this.command = this.command.replace(this.firstWd(), "").replace(/^ /, "");
    },
  };

  switch (handler.firstWd().toLowerCase()) {
    case "":
      purrpose(handler);
      break;
    case "kommunicat":
      purrpose(handler);
      break;
    case "purpose":
      purrpose(handler);
      break;
    case "purrpose":
      purrpose(handler);
      break;

    case "help":
      help(handler);
      break;

    case "whoami":
      whoami(handler);
      break;

    case "hi":
      greet(handler);
      break;
    case "hello":
      greet(handler);
      break;
    case "hey":
      greet(handler);
      break;

    case "echo":
      echo(handler);
      break;
    case "repeat":
      echo(handler);
      break;
    case "whisper":
      whisper(handler);
      break;
    case "shout":
      shout(handler);
      break;

    case "execute":
      execute(handler);
      break;
    case "do":
      execute(handler);
      break;

    case "dice":
      dice(handler);
      break;

    default:
      handler.response = `Sorry, I don't know what you mean by '${handler.firstWd()}' :( <br> <br>
        For a list of commands I can execute just ask me for @! help`;
      handler.command = "";
      break;
  }

  if (handler.command != "")
    handler.response += `<br><br>(Ignored unexpected expression '${handler.command}')`;

  addMessage(handler.response, { name: "!Kommunicat", pos: "bot" });
}

function purrpose(handler) {
  handler.response = `Hi! <br>
  I'm Kommunicat, IVPs chatroom-bot 😸 <br> <br>
  I'm here to accept and process your inputs - Just lead with @! and I'll listen! <br> <br>    
  For a list of commands I can execute just ask me for @! help <br> <br>
  Much love, <br>
  Kommunicat 🧡🧡`;
  handler.updateCommand();
}

function help(handler) {
  handler.updateCommand();
  handler.response = `Alright, here's everything that I can do:<br><br>
  Call '<span style="color:#fa0">echo</span>' or '<span style="color:#fa0">repeat</span>' and I will repeat everything after the command.<br>
  Call '<span style="color:#fa0">whisper</span>' for me to repeat in loer case, '<span style="color:#fa0">shout</span>' for upper case!<br>
  <span style="color:#fff8">
    @! echo <span style="font-style:italic; color: #f80a">content to be repeated</span><br>
    @! repeat <span style="font-style:italic; color: #f80a">content to be repeated</span><br>
    @! whisper <span style="font-style:italic; color: #f80a">content to be whispered</span><br>
    @! shout <span style="font-style:italic; color: #f80a">content to be shouted</span>
  </span><br><br>
  Call '<span style="color:#fa0">whoami</span>' and I'll read out your user informations!<br>
  Optionally, follow with a property name and I'll read out that property, if it is defined for your user account.<br>
  <span style="color:#fff8">
    @! whoami<br>
    @! whoami <span style="font-style:italic; color: #f80a">property</span>
  </span><br><br>
  Call '<span style="color:#fa0">execute</span>' or '<span style="color:#fa0">do</span>' followed by an integer and another command
  and I'll execute the preceading command an according number of times<br>
  <span style="color:#fff8">
    @! execute <span style="font-style:italic; color: #08fa">integer</span> <span style="font-style:italic; color: #f80a">command to be executed</span><br>
    @! do <span style="font-style:italic; color: #08fa">integer</span> <span style="font-style:italic; color: #f80a">command to be executed</span>
  </span><br><br>
  Call '<span style="color:#fa0">dice</span>' for me to throw a dice. Follow with a number to specify how many faces it should have!<br>
  <span style="color:#fff8">
    @! dice<br>
    @! dice <span style="font-style:italic; color: #08fa">number</span>
  </span><br><br>
  Call '<span style="color:#fa0">chess</span>' to use my in-built chess system! Follow with:
  <ul style="margin: .25em 0px">
    <li>'<span style="color:#fa0">init</span>' to start a new game.</li>
    <li>'<span style="color:#fa0">mode</span>' to choose whether the game is played by specific users or openly</li>
    <li>'<span style="color:#fa0">invite</span>' to ivite another user to an existing game</li>
    <li>The name of a field on the board in standard chess notation, for example '<span style="color:#f80">A1</span>', to show legal moves for the chess piece at this location</li>
    <li>Two names of fields on the board in standard chess notation in a row to move a chess piece from the first location to the secon, if possible</li>
  </ul>
  <span style="color:#fff8">
    @! chess init<br>
    @! chess mode ??<br>
    @! chess invite <span style="font-style:italic; color:#f80a">username</span>
  </span><br><br>
  `;
}

function whoami(handler) {
  handler.updateCommand();
  if (handler.user.name == undefined) {
    handler.response = `You're an anonymous user`;
    return;
  }
  if (handler.firstWd() == "") {
    handler.response = `You're  ${handler.user.name}!<br><br>${JSON.stringify(
      handler.user
    )}`;
    return;
  }
  console.log(handler.user[handler.firstWd()]);
  if (handler.user[handler.firstWd()] == undefined) {
    handler.response = `'${handler.firstWd()}' is not defined for your user account!`;
    handler.updateCommand();
    return;
  }
  handler.response = handler.user[handler.firstWd()];
  handler.updateCommand();
}

function greet(handler) {
  handler.updateCommand();

  handler.user.name == undefined
    ? (handler.response = `Hi! 🧡`)
    : (handler.response = `Hi, ${handler.user.name}! 🧡`);
}

function echo(handler) {
  handler.updateCommand();
  handler.response = handler.command;
  handler.command = "";
}
function whisper(handler) {
  handler.updateCommand();
  handler.response = handler.command.toLowerCase();
  handler.command = "";
}
function shout(handler) {
  handler.updateCommand();
  handler.response = handler.command.toUpperCase();
  handler.command = "";
}

function execute(handler) {
  handler.updateCommand();
  if (handler.firstWd() == "") {
    handler.response = `After execute, specify the number of times I should execute a command followed by that command!`;
    return;
  }
  if (parseInt(handler.firstWd()) + "" === handler.firstWd()) {
    const repeat = parseInt(handler.firstWd());
    handler.updateCommand();
    console.log(handler.command, handler.user);
    for (let i = 0; i < repeat; i++) {
      kommunicatResponse(handler.command, handler.user);
    }
    handler.response = "Done!";
    handler.command = "";
    return;
  }
  handler.response = `I don't know what you mean by ${handler.firstWd()}<br><br>
  After do or execute, specify the number of times I should execute a command followed by that command!`;
  handler.command = "";
}

function dice(handler) {
  handler.updateCommand();
  if (handler.firstWd() == "") {
    handler.response = Math.ceil(Math.random() * 6);
    return;
  }
  if (parseFloat(handler.firstWd()) + "" === handler.firstWd()) {
    handler.response = Math.ceil(Math.random() * parseFloat(handler.firstWd()));
    handler.updateCommand();
    return;
  }
  handler.response = `I don't know what you mean by '${handler.firstWd()}'<br>After dice, you can enter a number to specify what dice I should roll`;
  handler.command = "";
}

// ----

addMessage("Dieser Bereich wird künftig der offizielle Chatroom der IVP", {
  name: "!Kommunicat",
  pos: "bot",
});
addMessage("Er befindet sich derzeit noch in der Entwicklungs- und Testphase", {
  name: "!Kommunicat",
  pos: "bot",
});
