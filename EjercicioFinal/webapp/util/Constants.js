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

        routes: {
            Detail: "RouteDetail",
            FRAGMENTS: {
                Display: "EjercicioFinal.EjercicioFinal.Fragments.Display"
            },
            MODELS: {
                Products: "modelProducts",
                SelectedProduct: "modelSelectedProduct",
                ItemCategory: "modelCategory",
                ItemSupplier: "modelSupplier",
                ProductsLength: "modelProductsLength"
            }
        }
    };
}, true);