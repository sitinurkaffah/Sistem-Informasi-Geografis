// Initialize the map
var map = L.map('map').setView([-2.5489, 118.0149], 5); // Centered on Indonesia

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch data from local JSON file
fetch('forest_fire_data.json')
    .then(response => response.json())
    .then(data => {
        data.fires.forEach(function(fire) {
            var marker = L.circleMarker([fire.lat, fire.lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 8
            }).addTo(map);
            marker.bindPopup(
                `<b>${fire.province}</b><br>` +
                `Kabupaten/Kota: ${fire.city}<br>` +
                `Kecamatan: ${fire.district}<br>` +
                `Desa: ${fire.village}<br>` +
                `Tanggal: ${fire.date}<br>` +
                `Waktu: ${fire.time}<br>` +
                `Satelit: ${fire.satellite}<br>` +
                `Confidence: ${fire.confidence}`
            );
        });
    })
    .catch(error => console.error('Error:', error));
