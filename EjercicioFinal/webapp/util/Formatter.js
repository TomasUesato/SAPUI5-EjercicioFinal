sap.ui.define([
	
    ],	
    function () {
		"use strict";
		return  {
            

            formatPrice: function(fPrice) {
                fPrice = parseFloat(fPrice)

                return (fPrice).toFixed(2);
            },

            formatStock :  function (nStock) {
                nStock = parseFloat(nStock);

				if (nStock === 0) {
					return "Out of Stock";
				} else if (nStock < 15){
					return "Last Units";
				} else {
                    return "In Stock";
                }
				
		    },

            formatColorStock: function(nStock) {
                nStock = parseInt(nStock);
                
                if(nStock === 0) {
                    return "Error";
                } else if (nStock < 15){
					return "Warning";
				} else {
                    return "Success";
                }
                
            }
    }
}, true);