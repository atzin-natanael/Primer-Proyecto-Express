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
/*!*******************************!*\
  !*** ./src/js/mostrarMapa.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
(function(){
    const lat = document.querySelector('#lat').textContent
    const lng = document.querySelector('#lng').textContent
    const calle = document.querySelector('#calle').textContent
    const titulo = document.querySelector('#titulo').textContent

    const mapa = L.map('mapa').setView([lat, lng], 16)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //PIN
    L.marker([lat,lng])
        .addTo(mapa)
        .bindPopup(`${titulo}`)
}
)()
/******/ })()
;
//# sourceMappingURL=mostrarMapa.js.map