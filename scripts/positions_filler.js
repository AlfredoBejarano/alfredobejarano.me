var positions = undefined

function getJobPositions() {
    var request = new XMLHttpRequest();
    request.open("GET", "./scripts/positions.json", false);
    request.send(null);
    return JSON.parse(request.responseText)
}

function renderPositions() {
	var positions = getJobPositions()
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