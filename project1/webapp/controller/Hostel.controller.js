sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.com.project1.controller.Hostel", {

        onInit: function () {
            this._loadFilteredData("KLB01");
        },

        _loadFilteredData: function (sCompanyCode) {
            var oView = this.getView();
            var sUrl = "https://rest.kalpavrikshatechnologies.com/HM_Rooms";
            var sFilteredUrl = sUrl + "?CompanyCode=" + encodeURIComponent(sCompanyCode);

            $.ajax({
                url: sFilteredUrl,
                type: "GET",
                contentType: "application/json",

                headers: {
                    name: "$2a$12$LC.eHGIEwcbEWhpi9gEA.umh8Psgnlva2aGfFlZLuMtPFjrMDwSui",
                    password: "$2a$12$By8zKifvRcfxTbabZJ5ssOsheOLdAxA2p6/pdaNvv1xy1aHucPm0u"
                },
                success: function (response) {
                    console.log("Service call success", response);
                    const allRooms = response?.commentData || [];

                    // Use all rooms without filtering by Status
                    const singleRoom = allRooms.find(room => room.BedTypes === "Single");
                    const doubleRoom = allRooms.find(room => room.BedTypes === "Double");
                    const fourRoom = allRooms.find(room => room.BedTypes === "Four");

                    const oVisibilityModel = new JSONModel({
                        singleVisible: !!singleRoom,
                        doubleVisible: !!doubleRoom,
                        fourVisible: !!fourRoom,
                        singleDesc: singleRoom ? singleRoom.description : "",
                        doubleDesc: doubleRoom ? doubleRoom.description : "",
                        fourDesc: fourRoom ? fourRoom.description : ""
                    });
                    oView.setModel(oVisibilityModel, "VisibilityModel");

                    const oRoomsModel = new JSONModel({ Rooms: allRooms });
                    oView.setModel(oRoomsModel, "RoomModel");

                }.bind(this),
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
        },
        onpressLogin: function () {
            if (!this._oSignDialog) {
                this._oSignDialog = sap.ui.xmlfragment("sap.ui.com.project1.fragment.SignInSignup", this);
                this.getView().addDependent(this._oSignDialog);
            }
            this._oSignDialog.open();
            return;
        },
        onDialogClose:function(){
            this._oSignDialog.close()  },

            _onFieldclear:function(){
                var ofield 
            },
        onSwitchToSignIn: function () {   
            var oSignInPanel = sap.ui.getCore().byId("signInPanel");
            var oSignUpPanel = sap.ui.getCore().byId("signUpPanel");
            oSignInPanel.setVisible(true);
            oSignUpPanel.setVisible(false);
        },

        onSwitchToSignUp: function () {
            var oSignInPanel = sap.ui.getCore().byId("signInPanel");
            var oSignUpPanel = sap.ui.getCore().byId("signUpPanel");
            oSignInPanel.setVisible(false);
            oSignUpPanel.setVisible(true);
        },
       onSignUp: function() {
    var oDialog = this._oSignDialog;  // Assumes you stored the fragment dialog in this._oAuthDialog

    // Fetch user input values by ID with fragment's scoping: Fragment.byId(fragmentId, controlId)
    var sFullName = sap.ui.getCore().byId("signUpName").getValue();
    var sEmail = sap.ui.getCore().byId("signUpEmail").getValue();
    var sPhone = sap.ui.getCore().byId("signUpPhone").getValue();
    var sPassword = sap.ui.getCore().byId("signUpPassword").getValue();
    var sConfirmPass = sap.ui.getCore().byId("signUpConfirmPassword").getValue();

    // Basic validation example
    if (!sFullName || !sEmail || !sPassword || !sConfirmPass ) {
        sap.m.MessageToast.show("Please enter all required fields correctly.");
        return;
    }

    var oPayload = {
        UserName: sFullName,
        EmailID: sEmail,
        MobileNo: sPhone,
        Password: sPassword
    };

    $.ajax({
        url: "https://rest.kalpavrikshatechnologies.com/HM_Login", 
        method: "POST",
        contentType: "application/json",
         headers: {
          name: "$2a$12$LC.eHGIEwcbEWhpi9gEA.umh8Psgnlva2aGfFlZLuMtPFjrMDwSui",
          password: "$2a$12$By8zKifvRcfxTbabZJ5ssOsheOLdAxA2p6/pdaNvv1xy1aHucPm0u"
         },
        data: JSON.stringify(oPayload),
        success: function(response) {
            sap.m.MessageToast.show("Sign Up successful!");
            oDialog.close(); 
        },
        error: function(xhr, status, error) {
            sap.m.MessageToast.show("Error in Sign Up: " + error);
        }
    });
}



    });
});
