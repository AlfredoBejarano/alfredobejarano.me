import { getReference } from './rtdb.js'
import { logPageVisit } from "./analytics.js"
import { logPageEvent } from "./analytics.js"

var positions = {}

function getPositions() {
	getReference("/", function(result) {		
		renderPositions(result)		
	})
}

function renderPositions(positions) {
	var experiencesContainer = document.getElementById("experiences")

	positions.forEach(function (position) {
		var container = document.createElement("div")
		container.className = "job-position surface"

		var companyIcon = document.createElement("img")
		companyIcon.src = position.icon
		companyIcon.className = "companyLogo"
		container.appendChild(companyIcon)

		appendTextItem(container, position.company, "textPrimary")
		container.appendChild(document.createElement("br"))
		appendTextItem(container, position.position, "textSecondary")
		container.appendChild(document.createElement("br"))
		appendTextItem(container, position.duration, "textTertiary")

		experiencesContainer.appendChild(container)
		experiencesContainer.appendChild(document.createElement("br"))
	})
}


function appendTextItem(container, text, clazz) {
	var textItem = document.createElement("span")
	textItem.className = clazz
	textItem.appendChild(document.createTextNode(text))
	container.appendChild(textItem)
}

getPositions()