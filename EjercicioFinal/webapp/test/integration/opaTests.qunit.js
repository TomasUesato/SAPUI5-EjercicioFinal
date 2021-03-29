/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"EjercicioFinal/EjercicioFinal/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
