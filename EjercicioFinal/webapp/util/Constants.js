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
        FRAGMENTS: {
                Display: "EjercicioFinal.EjercicioFinal.Fragments.Display",
                SortDialog: "EjercicioFinal.EjercicioFinal.Fragments.SortDialog",
                FilterDialog: "EjercicioFinal.EjercicioFinal.Fragments.FilterDialog"
            },          

        routes: {
            Detail: "RouteDetail",
        }
    };
}, true);