import { analytics } from "./firebase.js"
import { logEvent } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

export function logPageVisit(pageName) {
	logEvent(analytics, 'page_visited', {
		name: pageName
	})
}

export function logPageEvent(eventName, eventValue) {
	logEvent(analytics, eventName, {
		name: eventValue
	})
}