var register = () => {
  var urname = document.getElementById("username").value;
  var urmail = document.getElementById("email").value;
  var passwd = document.getElementById("password").value;
  var passwd2 = document.getElementById("confirmpass").value;

  if (passwd == passwd2) {
    loginAction(urname, urmail, passwd);
  } else {
    alert("Different Password!");
  }
}

var login = () => {
  var urmail = document.getElementById("email").value;
  var passwd = document.getElementById("password").value;

  loginAction("", urmail, passwd);
}

var sendpost = () => {
  var content = document.getElementById("text").value;
  var file = document.getElementById("box").value;

  submitPost(content, file);
}
