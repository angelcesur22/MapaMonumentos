document.addEventListener("DOMContentLoaded", async () => {
    const map = L.map('map').setView([36.7213028, -4.4216366], 13);

    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const customIcon = L.icon({
        iconUrl: '/images/studio.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const response = await fetch('/data/da_cultura_ocio_monumentos-4326.geojson');
    const data = await response.json();

    
    const monumentList = document.getElementById('monument-list');

    data.features.forEach(feature => {
        const { geometry, properties } = feature;
        const [lon, lat] = geometry.coordinates;

        const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
        marker.bindPopup(`<strong>${properties.NOMBRE}</strong>`);

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = properties.NOMBRE || 'Sin nombre';

       
        marker.on('click', () => {
            map.setView([lat, lon], 17);
            Swal.fire({
                title: properties.NOMBRE,
                text: properties.DESCRIPCION || 'No hay descripción disponible',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        });

      
        listItem.addEventListener('click', () => {
            map.setView([lat, lon], 17);
            Swal.fire({
                title: properties.NOMBRE,
                text: properties.DESCRIPCION || 'No hay descripción disponible',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        });

        monumentList.appendChild(listItem);
    });
});