import { database } from "./firebase.js"
import { ref, onValue  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

export function getReference(referenceName, onValueCallback) {
	onValue(ref(database, referenceName), (snapshot) => {
		onValueCallback(snapshot.val())
	});
}