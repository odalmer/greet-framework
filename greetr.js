(function (global, $) {
  // 'new' an object
  var Greetr = function (firstName, lastname, language) {
    return new Greetr.init(firstName, lastname, language);
  };
  //hidden within the scope of the  IIFE and never directly accessible
  var supportedLangs = ["en", "es"];

  // informal greetings
  var greetings = {
    en: "Hello",
    es: "hola",
  };
  //formal greetings
  var formalGreetings = {
    en: "greetings",
    es: "saludos",
  };

  //logger messages
  var logMessages = {
    en: "Logged in",
    es: "Secion iniciada",
  };

  // prototpye holds methods (to save memory space)
  Greetr.prototype = {
    // 'this' refers to the calling objects at execution time
    fullName: function () {
      return this.firstName + " " + this.lastname;
    },

    validate: function () {
      // check that is a valid language
      // referencesa the externally inaccesible 'supportedLangs' within the closure
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "invalid language";
      }
    },

    // retrieve messages from object by referring to properties using [] syntax
    greeting: function () {
      return greetings[this.language] + " " + this.firstName;
    },

    formalGreeting: function () {
      return formalGreetings[this.language] + ", " + this.fullName();
    },

    // chainable methods return their own containing object
    greet: function (formal) {
      var msg;
      //if undefined or null it will be coerced to false
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      //this refers to the calling object at execution time
      //mekes the method chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }
      // make chainable
      return this;
    },

    setLang: function (lang) {
      // set the language
      this.language = lang;
      // validate
      this.validate();
      // make chainable
      return this;
    },

    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }
      if (!selector) {
        throw "missing jquery selector";
      }

      // determine the message
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // inject the message in the chosen place in the DOM
      $(selector).html(msg);

      // make chainable
      return this;
    },
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function (firstName, lastname, language) {
    var self = this;
    self.firstName = firstName || "No firstName added";
    self.lastname = lastname || "No lastname added";
    self.language = language || "en";

    self.validate();
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
