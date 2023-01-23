// gets a new object (the architecture allows us to not have to use the 'new' keyword here)
var g = G$("John", "doe");

// use our chainable methods
g.greet().setLang("es").greet(true).log();

// lets use our objects on the click of the login button
$("#login").click(function () {
  // create a new 'Greetr' object (lets pretend we know the name from the login)
  var loginGrtr = G$("John", "Doe");

  // hides the login div
  $("#logindiv").hide();

  // fire off an HTML greeting. passing the '#greeting' as the selector and the choesen languagej, and log the welcome as well
  loginGrtr.setLang($("#lang").val()).HTMLGreeting("#greeting", true).log();
});

