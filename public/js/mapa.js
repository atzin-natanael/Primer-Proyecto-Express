/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
(function() {
    //Logical Or
    const lat = document.querySelector('#lat').value || 20.6368861
    const lng = document.querySelector('#lng').value || -103.4389198
    const mapa = L.map('mapa').setView([lat, lng ], 24)
    let marker
    //utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //PIN
    marker = new L.marker([lat, lng],{
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    //detectar el movimiento del pin
    marker.on('moveend', function(e){
        marker = e.target
        const posicion = marker.getLatLng()
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        //obtener calle e informacion
        geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){
            console.log(resultado)
            marker.bindPopup(resultado.address.LongLabel)

            //llenar parrafo
            document.querySelector('.calle').textContent = resultado?.address?.Address ?? ''
            document.querySelector('#calle').value = resultado?.address?.Address ?? ''
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? ''
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? ''


        })
    })


})()
/******/ })()
;
//# sourceMappingURL=mapa.js.map