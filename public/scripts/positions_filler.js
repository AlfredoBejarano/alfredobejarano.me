import { getReference } from './rtdb.js'
import { logPageEvent } from "./analytics.js"

// Helper to convert Hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 61, g: 220, b: 132 };
}

// Helper to brighten colors for contrast
function lightenColor(rgb, percent) {
    const l = (val) => Math.min(255, Math.floor(val + (255 - val) * (percent / 100)));
    const r = l(rgb.r), g = l(rgb.g), b = l(rgb.b);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function updateTheme(hexColor) {
    const root = document.documentElement;
    const rgb = hexToRgb(hexColor);
    
    // Calculate brightness (HSP model)
    const brightness = Math.sqrt(
        0.299 * (rgb.r * rgb.r) +
        0.587 * (rgb.g * rgb.g) +
        0.114 * (rgb.b * rgb.b)
    );

    // If color is too dark for text (brightness < 150), lighten it for the primary color
    const contrastPrimary = brightness < 150 ? lightenColor(rgb, 45) : hexColor;

    root.style.setProperty('--md-sys-color-primary', contrastPrimary);
    root.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    
    // Background is always very dark (10% of brand color)
    const bgR = Math.floor(rgb.r * 0.1);
    const bgG = Math.floor(rgb.g * 0.1);
    const bgB = Math.floor(rgb.b * 0.1);
    root.style.setProperty('--md-sys-color-background', `rgb(${bgR}, ${bgG}, ${bgB})`);
}

function resetTheme() {
    const root = document.documentElement;
    root.style.setProperty('--md-sys-color-primary', '#3DDC84');
    root.style.setProperty('--primary-rgb', '61, 220, 132');
    root.style.setProperty('--md-sys-color-background', '#121314');
}

function renderPositions(positions) {
    const experiencesContainer = document.getElementById("experiences");
    experiencesContainer.replaceChildren();

    positions.forEach((pos) => {
        const card = document.createElement("div");
        card.className = "job-position surface";
        
        card.onclick = (event) => {
            event.stopPropagation();
            const currentlyActive = card.classList.contains('active');
            
            document.querySelectorAll('.job-position').forEach(c => c.classList.remove('active'));

            if (!currentlyActive) {
                card.classList.add('active');
                updateTheme(pos.color || '#3DDC84');
            } else {
                resetTheme();
            }
            
            logPageEvent("position_click", { company: pos.company, expanded: !currentlyActive });
        };

        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.alignItems = "center";

        const logo = document.createElement("img");
        logo.src = pos.icon;
        logo.className = "companyLogo";
        header.appendChild(logo);

        const textGroup = document.createElement("div");
        textGroup.innerHTML = `
            <div class="textPrimary">${pos.company}</div>
            <div class="textSecondary">${pos.position}</div>
            <div class="textTertiary">${pos.duration}</div>
        `;
        header.appendChild(textGroup);
        card.appendChild(header);

        const details = document.createElement("div");
        details.className = "details-container";

        const list = document.createElement("ul");
        list.className = "details-list";
        pos.points.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p;
            list.appendChild(li);
        });
        details.appendChild(list);

        const chips = document.createElement("div");
        chips.className = "skill-chips";
        pos.skills.slice(0, 8).forEach(s => {
            const chip = document.createElement("span");
            chip.className = "skill-chip";
            chip.textContent = s;
            chips.appendChild(chip);
        });
        details.appendChild(chips);

        card.appendChild(details);
        experiencesContainer.appendChild(card);
    });
}

function getPositions() {
    getReference("/", (result) => renderPositions(result));
}

getPositions();