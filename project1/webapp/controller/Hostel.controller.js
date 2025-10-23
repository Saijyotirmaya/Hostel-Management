sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.com.project1.controller.Hostel", {

        onInit: function () {
            this._loadFilteredData();
        },

        _loadFilteredData: function () {
            var oView = this.getView();
            var sUrl = "https://rest.kalpavrikshatechnologies.com/HM_Rooms";

            $.ajax({
                url: sUrl,
                type: "GET",
                contentType: "application/json",

                headers: {
                    name: "$2a$12$LC.eHGIEwcbEWhpi9gEA.umh8Psgnlva2aGfFlZLuMtPFjrMDwSui",
                    password: "$2a$12$By8zKifvRcfxTbabZJ5ssOsheOLdAxA2p6/pdaNvv1xy1aHucPm0u"
                },
                success: function (response) {
                    console.log("Service call success", response);
                    const allRooms = response?.data || [];
                    const activeRooms = allRooms.filter((room) => room.Status === "true");
                    const oModel = new sap.ui.model.json.JSONModel({ Rooms: activeRooms });
                    oView.setModel(oModel, "RoomModel");
                    sap.m.MessageToast.show("Rooms loaded successfully");
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error:", status, error);
                    sap.m.MessageToast.show("Error fetching data: " + error);
                }
            });
        }
        ,

        onTabSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            const sKey = oItem.getKey();
            this.byId("pageContainer").to(this.byId(sKey));

            var page = this.byId(sKey);
            if (page && page.scrollTo) page.scrollTo(0, 0);
        },

        onpressBookrooms: function () {
            var oTabHeader = this.byId("mainTabHeader");
            oTabHeader.setSelectedKey("idRooms");
            this.byId("pageContainer").to(this.byId("idRooms"));

            var page = this.byId("idRooms");
            if (page && page.scrollTo) page.scrollTo(0, 0);
        }
    });
});
