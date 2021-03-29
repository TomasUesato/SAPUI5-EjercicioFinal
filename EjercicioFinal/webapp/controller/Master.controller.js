sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "EjercicioFinal/EjercicioFinal/util/Constants",
        "EjercicioFinal/EjercicioFinal/util/Services",
        "sap/ui/core/Fragment",
        "EjercicioFinal/EjercicioFinal/util/Formatter",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Constants, Services, Fragment, Formatter, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("EjercicioFinal.EjercicioFinal.controller.Master", {
            Formatter: Formatter,
			onInit: function () {
                this.loadModelProducts();
                // this.loadProductStock();

            },
            
            loadModelProducts: async function() {
                let oComponent = this.getOwnerComponent();
                let oResponse = await Services.getProducts();
                let oData = oResponse[0];

                let oModelProductos = new JSONModel();
                oModelProductos.setData(oData);
                oComponent.setModel(oModelProductos, Constants.routes.MODELS.Products);


                // let oStock = oModelProductos.getProperty("/value/0/UnitsInStock");

                // var oProductsLength = oModelProductos.getProperty("/value/").length;
                // let oModelLength = new JSONModel();
                // oModelLength.setData(oProductsLength);
                // oComponent.setModel(oModelLength, Constants.routes.MODELS.ProductsLength)
                
                // var parametroStock;
                // var oStockUnitario;
                // var oStockTotal;
                // for (var i = 0; i < oProductsLength; i++) {
                //     parametroStock = "/value/"+i+"/UnitsInStock";
                //     oStockUnitario = oModelProductos.getProperty(parametroStock);
                //     oStockTotal += oStockUnitario;
                
            },

            onSearch: function(oEvent) {
                                       
                let oList = this.byId(Constants.ids.ProductList);
                let oBinding = oList.getBinding("items");

                let aFilters = [];
                let sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    let oFilterProdName = new Filter("ProductName", FilterOperator.Contains, sQuery);
                    aFilters.push(oFilterProdName);
                    }
                
                oBinding.filter(aFilters, "Application");

            },

            onItemPress: async function(oEvent) {

                let oItem = oEvent.getSource().getSelectedItem().getBindingContext(Constants.routes.MODELS.Products);
                let oModel = this.getOwnerComponent().getModel(Constants.routes.MODELS.Products);
                let oItemSeleccionado = oModel.getProperty(oItem.getPath());
                let oIdSeleccionado = oItemSeleccionado.ProductID;

                let oComponent = this.getOwnerComponent();

                let oResponse = await Services.getSelectedProduct(oIdSeleccionado);                
                let oSelectedProduct = oResponse[0];
                let oModelSelectedProduct = new JSONModel();
                oModelSelectedProduct.setData(oSelectedProduct);
                
                let oResponseCategory = await Services.getProductCategory(oIdSeleccionado);                
                let oCategoryItemSelected = oResponseCategory[0];
                let oModelItemSelectedCategory = new JSONModel();
                oModelItemSelectedCategory.setData(oCategoryItemSelected);

                let oResponseSupplier = await Services.getProductSupplier(oIdSeleccionado);
                let oSupplierItemSelected = oResponseSupplier[0];
                let oModelItemSelectedSupplier = new JSONModel();
                oModelItemSelectedSupplier.setData(oSupplierItemSelected);
               

                oComponent.setModel(oModelItemSelectedCategory, Constants.routes.MODELS.ItemCategory);
                oComponent.setModel(oModelItemSelectedSupplier, Constants.routes.MODELS.ItemSupplier);
                oComponent.setModel(oModelSelectedProduct, Constants.routes.MODELS.SelectedProduct);

                this.getOwnerComponent().getRouter().navTo(Constants.routes.Detail);
            },

            loadProductStock: function() {
                let oModel = this.getOwnerComponent().getModel(Constants.routes.MODELS.Products);
            }

		});
	});
