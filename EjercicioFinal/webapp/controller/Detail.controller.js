sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "EjercicioFinal/EjercicioFinal/util/Formatter",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "sap/ui/core/Fragment",
        "EjercicioFinal/EjercicioFinal/util/Constants"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, Formatter, MessageBox, MessageToast, Fragment, Constants) {
		"use strict";

		return Controller.extend("EjercicioFinal.EjercicioFinal.controller.Detail", {
            Formatter: Formatter,
			onInit: function () {

            },
            onPressDelete: function () {
                MessageBox.warning("Are you sure you want to delete?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                });
		    },
            
            onPressCopy: function() {
                MessageToast.show("Copied to Clipboard");
            },

            onPressEdit: function() {
            
                const oView = this.getView()
                if (!this._oFragment) {
                    Fragment.load({
                        id: oView.getId(),
                        name: Constants.FRAGMENTS.Display,
                        controller: this
                    }).then(function (oDialog) {
                        this._oFragment = oDialog;
                        this.getView().addDependent(this._oFragment);
                        this._oFragment.open();
                    }.bind(this));
                    return;
                    }
                this._oFragment.open();
            },

            onCloseDialog: function() {
                this.byId(Constants.ids.FRAGMENTS.Display).close();
            },
		
		});
	});