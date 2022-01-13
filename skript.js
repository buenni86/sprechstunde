import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";


var currentPopup = undefined;
var isCoWebSiteOpened =  false;
var urlFeedback = "https://forms.office.com/Pages/ResponsePage.aspx?id=nC2noeZJbU-a9lqvoRg7_f26WHDvlOFNi_8Y43fECOdUMDVDTUpUUDRONkxHMzdLQ09WRlQxUUZSMS4u";
var urlInfo = "https://db-planet.deutschebahn.com/pages/telefonie/apps/content/workadventure";
var urlMusik = "https://www.youtube-nocookie.com/embed/gXrDnYZzsKQ?autoplay=1";
var urlCafe = "https://www.chefkoch.de/rezepte/1092131215242366/Eiskaffee-Latte-macchiato.html";

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

var zoneFeedback = "feedback";
var zoneInfo = "info";
var zoneMusik = "musik";
var zoneCafe = "cafe";


WA.room.onEnterZone(zoneFeedback, () => {
   currentPopup =  WA.ui.openPopup("popUpFeedback","Hier kannst du Feedback abgeben.",[
        {
            label: "OK",
            callback: (popup => {
                WA.nav.openCoWebSite(urlFeedback);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneFeedback, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})

WA.room.onEnterZone(zoneInfo, () => {
   currentPopup =  WA.ui.openPopup("popUpInfo","Willkommen im öffentlichen Besprächungsraum Team EVS, möchtest du mehr Informationen zu WorkAdventure erfahren?",[
        {
            label: "Her damit!",
			callback: (popup => {
                WA.nav.openTab(urlInfo);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneInfo, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})


WA.room.onEnterZone(zoneMusik, () => {
   currentPopup =  WA.ui.openPopup("popUpMusik","Ein wenig Musik gefällig?",[
        {
            label: "Her damit!",
			callback: (popup => {
                WA.nav.openCoWebSite(urlMusik, false, "autoplay; encrypted-media");
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneMusik, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})

WA.room.onEnterZone(zoneCafe, () => {
   currentPopup =  WA.ui.openPopup("popUpCafe","Leider,\ndo it yourself",[
        {
            label: "Empfehlung",
            callback: (popup => {
                WA.nav.openTab(urlCafe);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneCafe, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})