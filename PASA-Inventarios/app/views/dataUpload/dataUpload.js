var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var utilsModule = require("utils/utils");
var socialShare = require("nativescript-social-share");
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var statusBarUtil = require("../../shared/utils/status-bar-util");
var navigation = require("../../shared/navigation");
var pageModule = require("ui/page");

var viewModel1 = new Observable();

var viewModel2 = new Observable();

var page;
var drawerElement;
var groceryListElement;
var mainContentElement;
var txtequipo;
var txtalmacen;
var txtcantidad;



var view = require("ui/core/view");
var textFieldModule = require("ui/text-field");
var barcodescanner = require("nativescript-barcodescanner");
var textField;

var stackLayout;
exports.stackLoaded = function (args) {
    stackLayout = args.object
}


function btn(args) {
    var sender = args.object;
    var parent = sender.parent;
    if (parent) {
        txtcantidad = view.getViewById(parent, "txtcantidad").text;
        var text = "";
        var i;
        for (i = 0; i < txtcantidad ; i++) {
            textField = new textFieldModule.TextField();
            textField.id = "txt" + i;
            stackLayout.addChild(textField);
        }
    }
    var lbl = view.getViewById(parent, "txt0");
    lbl.focus();
}
exports.btn = btn;

function btn_(args) {
    //stackLayout.removeChild(textField);
}

exports.btn_ = btn_;


var pageData = new Observable({
	isShowingRecent: false
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    statusBarUtil.configure();
    drawerElement = page.getViewById("drawer");
    mainContentElement = page.getViewById("main-content");
    txtequipo = page.getViewById("txtTipoEquipo");
    txtalmacen = page.getViewById("txtAlmacen");
    txtcantidad = page.getViewById("txtcantidad");

    var pagee1 = args.object;
    viewModel1.set("items0", ["--- Selecciona ---", "Equipo Uno", "Equipo dos", "Equipo tres", "Equipo cuatro"]);
    viewModel1.set("items1", ["--- Selecciona ---", "Almacen Uno", "Almacen dos", "Almacen tres", "Almacen cuatro"]);
    viewModel1.set("test", "Test for parent binding!");
    pagee1.bindingContext = viewModel1;


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



function buttonTap(args) {
    barcodescanner.scan(
 {
     formats: "QR_CODE,EAN_13,PDF_417,UPC_A,EAN_8",   // formatos que solo aceptara se le puede cambiar a mas o a menos
     cancelLabel: "Stop scanning", // para iOS ,  'Close'
     message: "Coloque un codigo de barras en el interior del rectangulo del visor para escanear", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
     preferFrontCamera: false,     // Android only, default false
     showFlipCameraButton: true,   // Android only, default false (on iOS it's always available)
     orientation: "landscape"      // Android only, orientación entre "portrait" or "landscape"
 }).then
 (
     function (result) {
         var a = 0;
         var view = require("ui/core/view");
         //alert("Formato: " + result.format);
         // alert("Codigo:   " + result.text);
         var sender = args.object;
         var parent = sender.parent;
         if (parent) {
             for (i = 0; i < txtcantidad ; i++) {
                 var lbl = view.getViewById(parent, "txt" + i).text;
                 var lbl1 = view.getViewById(parent, "txt" + i);
                 if (lbl == "") {
                     lbl1.text = result.text
                     a = i + 1;
                     var lbl2 = view.getViewById(parent, "txt1");
                     lbl2.focus();
                     break;
                 }
             }
             lbl1.focus();
         }

     },
     function (error) {
         alert("No se escaneo : " + error);
     }
 )
    barcodescanner.available().then
    (
        function (avail) {
            // alert("¿Disponible? " + avail);
        }
    );
    barcodescanner.hasCameraPermission().then(
          function (granted) {
              // alert("Has Camera Permission? " + result);
          }
      );
    barcodescanner.requestCameraPermission().then(
        function () {
            // alert("Camera permission requested");
        }
    );
}
exports.buttonTap = buttonTap;