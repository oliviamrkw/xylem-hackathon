let map;
let markers = [];
const MAP_CENTER = {lat: -31.986111, lng: 29.147223};
const KIOSKS = [
    {name: "Kiosk 1", lat: -31.984774305587177, lng: 29.147631140808226, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_red_number-1.svg/800px-Eo_circle_red_number-1.svg.png"},
    {name: "Kiosk 2", lat: -31.988013876631122, lng: 29.143017741611576, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/1024px-Eo_circle_red_number-2.svg.png"},
    {name: "Kiosk 3", lat: -31.9815346200932, lng: 29.1470088680696, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Eo_circle_red_number-3.svg/512px-Eo_circle_red_number-3.svg.png?20200417174018"},
    {name: "Kiosk 4", lat: -31.98246285632128, lng: 29.140829059202005, icon: "https://cdn-icons-png.flaticon.com/512/8068/8068184.png"},
    {name: "Kiosk 5", lat: -31.97740294524088, lng: 29.141515704663835, icon: "https://cdn-icons-png.flaticon.com/512/8068/8068238.png"},
];

async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/get_water_data');
        const wells = await response.json();
        updateMarkers(wells);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: MAP_CENTER
    });

    const centerControlDiv = document.createElement("div");
    const centerControl = createCenterControl();
    centerControlDiv.appendChild(centerControl);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    fetchData();
    setKiosks();
    setInterval(fetchData, 5000);
}

function createCenterControl() {
    const controlButton = document.createElement("button");
    
    controlButton.classList.add('buttonStyle');
    controlButton.textContent = "Center Map";
    controlButton.title = "Click to recenter the map";
    controlButton.type = "button";
    controlButton.addEventListener("click", () => map.setCenter(MAP_CENTER));

    return controlButton;
}

function setKiosks() {
    KIOSKS.forEach(kiosk => {
        new google.maps.Marker({
            position: {lat: kiosk.lat, lng: kiosk.lng},
            map: map,
            icon: {url: kiosk.icon, scaledSize: new google.maps.Size(35, 35)},
            title: kiosk.name,
            label: {text: kiosk.name, color: "white", fontSize: "14px", fontWeight: "bold", className: "marker-label"}
        });
    });
}

function updateMarkers(wells) {
    const water_icon = {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Circle-icons-water.svg/2048px-Circle-icons-water.svg.png", 
        scaledSize: new google.maps.Size(30, 30),
        labelOrigin: new google.maps.Point(15, -10)
    };

    const infoContainer = document.getElementById("info-container");
    infoContainer.innerHTML = "";

    markers.forEach(marker => marker.setMap(null));
    markers = []; 

    wells.forEach(well => {
        const marker = new google.maps.Marker({
            position: {lat: well.lat, lng: well.lng},
            map: map,
            icon: water_icon,
            title: well.name,
            label: {text: well.name, color: "white", fontSize: "18px", fontWeight: "bold", className: "marker-label"}
        });

        const infoPanel = document.createElement("div");
        infoPanel.classList.add("info-window");
        infoPanel.innerHTML = `
            <h3>${well.name}</h3>
            <div>
                <strong>Availability: </strong>
                <span class="progress-text">${well.availability} litres</span>
                <div class="progress-container">
                    <div class="progress-bar-availability" style="width: ${well.availability / 10}%"></div>
                </div>
            </div>
            <div>
                <strong>Quality: </strong>
                <div class="progress-container">
                    <div class="progress-bar-quality" style="width: ${well.quality}%"></div>
                </div>
            </div>
        `;

        const qualityBar = infoPanel.querySelector(".progress-bar-quality");
        updateQuality(well.quality, qualityBar)
        infoContainer.appendChild(infoPanel);
        markers.push(marker);
    });
}

function updateQuality(quality, bar){
    if (quality < 33) {
        bar.style.backgroundColor = "#822727";
    } else if (quality < 67) {
        bar.style.backgroundColor = "#f0c648";
    } else {
        bar.style.backgroundColor = "#4CAF50";
    }
}
