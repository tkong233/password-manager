(function (window, console, Encryptr, undefined) {
  "use strict";
  console       = console || {};
  console.log   = console.log || function() {};
  var Backbone  = window.Backbone,
    _         = window._,
    $         = window.Zepto;

  var SignupView = Backbone.View.extend({
    className: "signup hidden",
    events: {
      "submit form": "form_submitHandler",
      "click .signupButton": "signupButton_clickHandler",
      "click a.backToLogin": "backToLogin_clickHandler",
      "change #show-passphrase": "showPassphrase_changeHandler"
    },
    initialize: function() {
      _.bindAll(this,
          "input_focusHandler",
          "input_blurHandler",
          "form_submitHandler",
          "signupButton_clickHandler",
          "backToLogin_clickHandler",
          "showPassphrase_changeHandler");
      $(document).on("focus", ".signup input", this.input_focusHandler);
      $(document).on("blur", ".signup input", this.input_blurHandler);
    },
    render: function() {
      this.$el.html(window.tmpl["signupView"]({}));
      $(".app").append(this.el);
      if ($.os.nodeWebkit) this.$("input[type=checkbox]").css({
        "height": "15px"
      });
      return this;
    },
    input_focusHandler: function(event) {
      $(event.target).closest("div.login-input").addClass("focused");
    },
    input_blurHandler: function(event) {
      $(event.target).closest("div.login-input").removeClass("focused");
    },
    showPassphrase_changeHandler: function(event) {
      var $newpassphrase = this.$("#newpassphrase");
      var newType = (($newpassphrase.attr("type") === "password") ? "text" : "password");
      $newpassphrase.attr("type", newType);
    },
    form_submitHandler: function(event) {
      var _this = this;

      var sanitizeSignupErr = function(err) {
        // @TODO this might need some more nuance
        if (err === 'You forgot to enter both your username and passphrase') {
          return err;
        }
        if (err === 'Your username can only contain letters or numbers.') {
          return err;
        }
        return 'Username unavailable, please try something different';
      };

      event.preventDefault();

      $(".blocker").show();

      var username = $("#newusername").val().trim();
      var passphrase = $("#newpassphrase").val();

      $("input").blur();

      window.crypton.generateAccount(username, passphrase, function(err, account) {
        if (err) {
          window.app.dialogAlertView.show({
            title: "Couldn't sign you up",
            subtitle: sanitizeSignupErr(err)
          }, function(){});
          $(".blocker").hide();
          return;
        }
        // Now log in...
        window.crypton.authorize(username, passphrase, function(err, session) {
          if (err) {
            window.app.dialogAlertView.show({
              title: "Couldn't sign you in",
              subtitle: err
            }, function() {});
            $(".blocker").hide();
            return;
          }
          window.app.settings = _.extend(window.app.settings, {username: username});
          window.localStorage.setItem("settings", JSON.stringify(window.app.settings));
          window.app.session = session;
          window.app.accountModel = new window.app.AccountModel({
            username: username,
            passphrase: passphrase,
            session: session
          });
          Backbone.Session = session;
          window.app.session.create("_encryptrIndex", function(err, entries){
            if (err) {
              window.app.dialogAlertView.show({
                title: "Error",
                subtitle: err
              }, function() {});
              $(".blocker").hide();
              return;
            }
            // Set up MainView
            window.app.mainView = new window.app.MainView().render();
            // Push a ListView
            var entriesCollection = window.app.entriesCollection = new window.app.EntriesCollection();
            window.app.navigator.pushView(
              window.app.EntriesView,
              { collection: entriesCollection },
              window.app.noEffect
            );
            window.app.entriesView = window.app.navigator.viewsStack[0].instance;
            $(".blocker").hide();
            window.app.loginView.dismiss();
            _this.dismiss();
          });
        });
      });
    },
    signupButton_clickHandler: function(event) {
      event.preventDefault();
      this.form_submitHandler(event);
    },
    backToLogin_clickHandler: function(event) {
      // window.app.loginView.show();
      window.app.loginView.enable();
      this.dismiss();
    },
    dismiss: function() {
      var _this = this;
      if (!_this.$el.hasClass("dismissed")) {
        _this.$("input").attr("disabled", true);
        _this.$el.animate({"translate3d": "0,100%,0"},
          200,
          "ease-in-out",
          function() {
            _this.$el.addClass("dismissed");
          });
        // Clear username and password values
        this.$("input").val("");
      }
    },
    show: function() {
      var _this = this;
      if (_this.$el.hasClass("dismissed")) {
        _this.$("input").removeAttr("disabled");
        _this.$el.removeClass("dismissed");
        _this.$el.animate(
          {"translate3d":"0,0,0"},
          250,
          "ease-in-out"
        );
      }
    }
  });

  Encryptr.prototype.SignupView = SignupView;

})(this, this.console, this.Encryptr);
