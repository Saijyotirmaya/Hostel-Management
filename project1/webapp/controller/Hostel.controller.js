sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
   
    function (Controller) {
        "use strict";

        return Controller.extend("sap.ui.com.project1.controller.Hostel", {
            onInit: function () {

            },
            onNavPress: function (oEvent) {
      const sText = oEvent.getSource().getText(); // e.g., "Home"
      const oView = this.getView();

      // Hide all sections first
      const sections = [
        "homeSection",
        "roomsSection",
        "facilitiesSection",
        "contactSection",
        "addDataSection"
      ];
      sections.forEach(id => oView.byId(id).setVisible(false));

      // Show the selected one
      switch (sText) {
        case "Home":
          oView.byId("homeSection").setVisible(true);
          break;
        case "Rooms":
          oView.byId("roomsSection").setVisible(true);
          break;
        case "Facilities":
          oView.byId("facilitiesSection").setVisible(true);
          break;
        case "Contact":
          oView.byId("contactSection").setVisible(true);
          break;
        case "Add data":
          oView.byId("addDataSection").setVisible(true);
          break;
      }
    },
        });
    });
