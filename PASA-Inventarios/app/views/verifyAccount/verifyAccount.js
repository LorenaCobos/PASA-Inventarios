
/*Archivo que uso para redireccionarme*/
var navigation = require("../../shared/navigation");
var observable = require("data/observable");
var pageModule = require("ui/page");
var view = require("ui/core/view");

var dialogsModule = require("ui/dialogs");
var utilsModule = require("utils/utils");
var socialShare = require("nativescript-social-share");
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var statusBarUtil = require("../../shared/utils/status-bar-util");

var page;
var drawerElement;
var groceryListElement;
var mainContentElement;


var viewModel = new observable.Observable();


var pageData = new observable.Observable();


/*Se activa con el evento tap: tapVerify del button con id: submit-button*/
exports.tapVerify = function () {
    navigation.goToHome();
}

function tapFillLblItem(arg) {


    var sender = args.object;
    var parent = sender.parent;
    if (parent) {
        var lblDrop = view.getViewById(parent, idDropDown).text;
        var lblItem = view.getViewById(parent, idLblItem);
        alert(lblDrop);
        lblItem.text = lblDrop;

    }

}
exports.tapFillLblItem = tapFillLblItem;


function pageLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;
    statusBarUtil.configure();
    drawerElement = page.getViewById("drawer");
    mainContentElement = page.getViewById("main-content");


    var page = args.object;
    viewModel.set("items0", ["Selecciona la empresa", "Empresa Uno", "Empresa dos", "Empresa tres", "Empresa cuatro"]);
    viewModel.set("test", "Test for parent binding!");
    page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;



exports.menu = function () {
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

