sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "EjercicioFinal/EjercicioFinal/util/Constants",
        "EjercicioFinal/EjercicioFinal/util/Services",
        "sap/ui/core/Fragment",
        "EjercicioFinal/EjercicioFinal/util/Formatter",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/Device",
        "sap/ui/model/Sorter",
        "sap/m/library"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Constants, Services, Fragment, Formatter, Filter, FilterOperator, Device, Sorter, mLibrary) {
		"use strict";

		return Controller.extend("EjercicioFinal.EjercicioFinal.controller.Master", {
            Formatter: Formatter,
			onInit: function () {
                this.loadModelProducts();

                this._mViewSettingsDialogs = {};

            },
            
            loadModelProducts: async function() {
                let oComponent = this.getOwnerComponent();
                let oResponse = await Services.getProducts();
                let oData = oResponse[0];

                let oModelProductos = new JSONModel();
                oModelProductos.setData(oData);
                oComponent.setModel(oModelProductos, Constants.MODELS.Products);


                var oProductsLength = oModelProductos.getProperty("/value/").length;
                let oModelLength = new JSONModel();
                oModelLength.setData(oProductsLength);
                oComponent.setModel(oModelLength, Constants.MODELS.ProductsLength)
                
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

                let oProductsLength = oBinding.getLength();
                let oModelLength = new JSONModel();
                oModelLength.setData(oProductsLength);
                this.getOwnerComponent().setModel(oModelLength, Constants.MODELS.ProductsLength);

            },

            onItemPress: async function(oEvent) {

                let oItem = oEvent.getSource().getSelectedItem().getBindingContext(Constants.MODELS.Products);
                let oModel = this.getOwnerComponent().getModel(Constants.MODELS.Products);
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
               

                oComponent.setModel(oModelItemSelectedCategory, Constants.MODELS.ItemCategory);
                oComponent.setModel(oModelItemSelectedSupplier, Constants.MODELS.ItemSupplier);
                oComponent.setModel(oModelSelectedProduct, Constants.MODELS.SelectedProduct);

                this.getOwnerComponent().getRouter().navTo(Constants.routes.Detail);
            },

            onSort: function () {      
                this.createViewSettingsDialog(Constants.FRAGMENTS.SortDialog).open();                   
            },

            createViewSettingsDialog: function (sDialogFragmentName) {
                var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
                if (!oDialog) {
                    oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
                    this.getView().addDependent(oDialog);
                    this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

                    oDialog.setFilterSearchOperator(mLibrary.StringFilterOperator.Contains);

                if (sDialogFragmentName === "EjercicioFinal.EjercicioFinal.Fragments.FilterDialog") {
                    var oModelJSON = this.getOwnerComponent().getModel(Constants.MODELS.Products);
                    var modelOriginal = oModelJSON.getProperty("/value");

                    var jsonProductID = JSON.parse(JSON.stringify(modelOriginal, ["ProductID"]));
                    var jsonProductName = JSON.parse(JSON.stringify(modelOriginal, ["ProductName"]));
                    var jsonUnitsOnOrder = JSON.parse(JSON.stringify(modelOriginal, ["UnitsOnOrder"]));
                    var jsonUnitPrice = JSON.parse(JSON.stringify(modelOriginal, ["UnitPrice"]));

                    oDialog.setModel(oModelJSON);

                    //check for duplicates in filter items
                    jsonProductID = jsonProductID.filter(function(currentObject) {
                        if(currentObject.ProductID in jsonProductID) {
                            return false;
                        } else {
                            jsonProductID[currentObject.ProductID] = true;
                            return true;
                        }
                    });
                    jsonProductName = jsonProductName.filter(function(currentObject) {
                        if(currentObject.ProductName in jsonProductName) {
                            return false;
                        } else {
                            jsonProductName[currentObject.ProductName] = true;
                            return true;
                        }
                    });
                    jsonUnitsOnOrder = jsonUnitsOnOrder.filter(function(currentObject) {
                        if(currentObject.UnitsOnOrder in jsonUnitsOnOrder) {
                            return false;
                        } else {
                            jsonUnitsOnOrder[currentObject.UnitsOnOrder] = true;
                            return true;
                        }
                    });
                    jsonUnitPrice = jsonUnitPrice.filter(function(currentObject) {
                        if(currentObject.UnitPrice in jsonUnitPrice) {
                            return false;
                        } else {
                            jsonUnitPrice[currentObject.UnitPrice] = true;
                            return true;
                        }
                    });

                    //create items arrays and iterate
                    var ProductIDFilter = [];
                    for (var i = 0; i < jsonProductID.length; i++) {
                        ProductIDFilter.push(
                            new sap.m.ViewSettingsItem({
                                text: jsonProductID[i].ProductID,
                                key: "ProductID"
                            })
                        );
                    }
                    var ProductNameFilter = [];
                    for (var i = 0; i < jsonProductName.length; i++) {
                        ProductNameFilter.push(
                            new sap.m.ViewSettingsItem({
                                text: jsonProductName[i].ProductName,
                                key: "ProductName"
                            })
                        );
                    }
                    var UnitsOnOrderFilter = [];
                    for (var i = 0; i < jsonUnitsOnOrder.length; i++) {
                        UnitsOnOrderFilter.push(
                            new sap.m.ViewSettingsItem({
                                text: jsonUnitsOnOrder[i].UnitsOnOrder,
                                key: "UnitsOnOrder"
                            })
                        );
                    }
                    var UnitPriceFilter = [];
                    for (var i = 0; i < jsonUnitPrice.length; i++) {
                        UnitPriceFilter.push(
                            new sap.m.ViewSettingsItem({
                                text: jsonUnitPrice[i].UnitPrice,
                                key: "UnitPrice"
                            })
                        );
                    }
    
                oDialog.destroyFilterItems();
                oDialog.addFilterItem(new sap.m.ViewSettingsFilterItem({
                    key: "ProductID",
                    text: "Product ID",
                    items: ProductIDFilter
                }));
                oDialog.addFilterItem(new sap.m.ViewSettingsFilterItem({
                    key: "ProductName",
                    text: "Product Name",
                    items: ProductNameFilter
                }));
                oDialog.addFilterItem(new sap.m.ViewSettingsFilterItem({
                    key: "UnitsOnOrder",
                    text: "Units On Order",
                    items: UnitsOnOrderFilter
                }));
                oDialog.addFilterItem(new sap.m.ViewSettingsFilterItem({
                    key: "UnitPrice",
                    text: "Unit Price",
                    items: UnitPriceFilter
                }));

                }
                }        
                
                if (Device.system.desktop) {
                    oDialog.addStyleClass("sapUiSizeCompact");
                }

                
                return oDialog;
            },

            onSortDialogConfirm: function (oEvent) {
                var oList = this.byId(Constants.ids.ProductList),
                    mParams = oEvent.getParameters(),
                    oBinding = oList.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];
                sPath = mParams.sortItem.getKey();
                bDescending = mParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));
                oBinding.sort(aSorters);
            },

            onFilter: function() {
                this.createViewSettingsDialog(Constants.FRAGMENTS.FilterDialog).open();
            },

            onFilterDialogConfirm: function(oEvent) {
                var oList = this.byId(Constants.ids.ProductList),
                    mParams = oEvent.getParameters(),
                    oBinding = oList.getBinding("items"),
                    aFilters = [];
                mParams.filterItems.forEach(function(oItem) {
                    var sPath = oItem.getKey(),
                        sOperator = FilterOperator.EQ,
                        sValue1 = oItem.getText();
                    var oFilter = new Filter(sPath, sOperator, sValue1);
                    aFilters.push(oFilter);
                    
                });
                oBinding.filter(aFilters);

                let oProductsLength = oBinding.getLength();
                let oModelLength = new JSONModel();
                oModelLength.setData(oProductsLength);
                this.getOwnerComponent().setModel(oModelLength, Constants.MODELS.ProductsLength);
            }

		});
	});
