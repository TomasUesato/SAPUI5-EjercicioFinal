sap.ui.define([], function() {
    "user strict";
    return {

        entity : {
            Products : "/V3/Northwind/Northwind.svc/Products"
        },

        ids: {
            FRAGMENTS: {
                Display: "idDisplay",              
            },
            ProductList: "idProductList",
        },
        MODELS: {
                Products: "modelProducts",
                SelectedProduct: "modelSelectedProduct",
                ItemCategory: "modelCategory",
                ItemSupplier: "modelSupplier",
                ProductsLength: "modelProductsLength"
        },

        routes: {
            Detail: "RouteDetail",
            FRAGMENTS: {
                Display: "EjercicioFinal.EjercicioFinal.Fragments.Display"
            },          
        }
    };
}, true);