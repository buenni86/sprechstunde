/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

console.log('Script started successfully');
	
let currentPopup: any = undefined;
let isCoWebSiteOpened =  false;
let urlFeedback = "https://forms.office.com/Pages/ResponsePage.aspx?id=nC2noeZJbU-a9lqvoRg7_f26WHDvlOFNi_8Y43fECOdUMDVDTUpUUDRONkxHMzdLQ09WRlQxUUZSMS4u";
let urlInfo = "https://db-planet.deutschebahn.com/pages/telefonie/apps/content/workadventure";
let urlMusik = "https://www.youtube-nocookie.com/embed/36YnV9STBqc?autoplay=1";
let urlCafe = "https://www.chefkoch.de/rezepte/1092131215242366/Eiskaffee-Latte-macchiato.html";
let Mail = "mailto:DB.Systel.CommunicationServices.EVS@deutschebahn.com";
let zoneFeedback = "feedback";
let zoneInfo = "info";
let zoneInfoDoor = "infoDoor";
let zoneMusik = "musik";
let zoneCafe = "cafe";

WA.onInit().then(() => {
    console.log('Scripting API ready');

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

	WA.room.onEnterZone(zoneInfoDoor, () => {
	   currentPopup =  WA.ui.openPopup("popUpInfoDoor","Falls die Tür verschlossen ist, am besten einen Termin mit uns vereinbaren\n📧 Team EVS 📧",[
			{
				label: "E-Mail",
				className:"primary",
				callback: (popup => {
					WA.nav.openTab(Mail);
					isCoWebSiteOpened = true;
					closePopUp();
				})
			}]);
	})

	WA.room.onLeaveZone(zoneInfoDoor, () =>{
		closePopUp();
	})


	WA.room.onEnterZone(zoneMusik, () => {
	   currentPopup =  WA.ui.openPopup("popUpMusik","Ein wenig Musik gefällig?",[
			{
				label: "Her damit!",
				callback: (popup => {
					WA.nav.openCoWebSite(urlMusik, false, "autoplay; fullscreen; encrypted-media");
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
	
    const  buttons: ButtonDescriptor[] = [
        {
            label: 'Reset',
            className: 'error',
            callback: () => WA.state.votevarPositive = WA.state.votevarNegative = WA.state.votevarNeutral = 0,
        },
    ]

    WA.room.onEnterLayer('resetVote').subscribe(() => {
        currentPopup = WA.ui.openPopup("resetPopup","Do you want to reset the poll?", buttons);
    })
    WA.room.onLeaveLayer('resetVote').subscribe(closePopUp)
	
    // Voting zones
	WA.room.onEnterLayer('votepositive').subscribe(() => {
		(WA.state.votevarPositive as number) ++;
	})
	WA.room.onLeaveLayer('votepositive').subscribe(()  => {
		(WA.state.votevarPositive as number) --;
	})
	WA.room.onEnterLayer('votenegative').subscribe(()  => {
		(WA.state.votevarNegative as number) ++;
	})
	WA.room.onLeaveLayer('votenegative').subscribe(() => {
		(WA.state.votevarNegative as number) --;
	})
	WA.room.onEnterLayer('voteneutral').subscribe(() => {
		(WA.state.votevarNeutral as number) ++;
	})
	WA.room.onLeaveLayer('voteneutral').subscribe(() => {
		(WA.state.votevarNeutral as number) --;
	})
	
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}