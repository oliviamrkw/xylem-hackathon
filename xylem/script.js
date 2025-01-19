let map;
let markers = [];
const MAP_CENTER = { lat: -31.986111, lng: 29.147223 };

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
    setInterval(fetchData, 2000);
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
            position: { lat: well.lat, lng: well.lng },
            map: map,
            icon: water_icon,
            title: well.name,
            label: { text: well.name, color: "white", fontSize: "18px", fontWeight: "bold", className: "marker-label" }
        });

        const infoPanel = document.createElement("div");
        infoPanel.classList.add("info-window");
        infoPanel.innerHTML = `
            <h3>${well.name}</h3>
            <div>
                <strong>Availability: </strong>
                <div class="progress-container">
                    <div class="progress-bar-availability" style="width: ${well.availability}%"></div>
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