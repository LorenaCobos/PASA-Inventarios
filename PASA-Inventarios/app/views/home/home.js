var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var utilsModule = require("utils/utils");
var socialShare = require("nativescript-social-share");
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var statusBarUtil = require("../../shared/utils/status-bar-util");
var navigation = require("../../shared/navigation");



var page;
var drawerElement;
var groceryListElement;
var mainContentElement;

var pageData = new Observable({
	isShowingRecent: false
});

exports.loaded = function (args)
{
	page = args.object;
	page.bindingContext = pageData;
	statusBarUtil.configure();
	drawerElement = page.getViewById("drawer");
	mainContentElement = page.getViewById("main-content");
};


exports.menu = function() {
	drawerElement.toggleDrawerState();
};
exports.drawerOpening = function () {
	if (page.ios) {
		mainContentElement.animate({
			duration: 250,
			opacity: 0.5
		});
	}
};
exports.drawerClosing = function () {
	if (page.ios) {
		mainContentElement.animate({
			duration: 250,
			opacity: 1
		});
	}
};
exports.signOut = navigation.signOut;



/*Archivo que uso para redireccionarme*/
var navigation = require("../../shared/navigation");

/*Se activa con el evento tap: tapLogin del button con id: submit-button*/
exports.tapHome = function () {
    navigation.goToDataUpload();
}
