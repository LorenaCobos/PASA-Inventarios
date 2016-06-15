var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	},
	goToPasswordPage: function() {
		frameModule.topmost().navigate("views/password/password");
	},
	goToPagebarre: function ()
	{
	    frameModule.topmost().navigate({
	        moduleName: "views/barcodescanner/barcodescanner",
	        clearHistory: true
	    });
	},
	signOut: function() {
		config.invalidateToken();
		frameModule.topmost().navigate({
			moduleName: "views/login/login",
			animated: false,
			clearHistory: true
		});
	}, goToVerifyAccount: function () {
	    frameModule.topmost().navigate({
	        moduleName: "views/verifyAccount/verifyAccount",
	        clearHistory: true
	    });
	},
	goToHome: function () {
	    frameModule.topmost().navigate({
	        moduleName: "views/home/home",
	        clearHistory: true
	    });
	},
	goToDataUpload: function () {
	    frameModule.topmost().navigate({
	        moduleName: "views/dataUpload/dataUpload",
	        clearHistory: true
	    });
	},
	startingPage: function ()
	{
	    return config.token ? "views/password/password" : "views/login/login";
	}
};
