/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"EjercicioFinal/EjercicioFinal/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
