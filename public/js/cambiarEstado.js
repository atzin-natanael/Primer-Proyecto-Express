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
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
(function(){
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado')
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    cambiarEstadoBotones.forEach(boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad)
    })

    async function cambiarEstadoPropiedad(e){
        const {propiedadId: id} = e.target.dataset
        try {
            const url = `/propiedades/${id}`
            const respuesta = await fetch(url, {
                method: 'PUT',
                headers:{
                    'CSRF-Token': token
                }
            })
            const {resultado} = await respuesta.json()
            if(resultado){
                if(e.target.classList.contains('bg-yellow-100')){
                    e.target.classList.add('bg-green-100', 'text-green-800')   
                    e.target.classList.remove('bg-yellow-100', 'text-yellow-800')
                    e.target.textContent = 'Publicado'
                }else{
                    e.target.classList.add('bg-yellow-100', 'text-yellow-800')
                    e.target.classList.remove('bg-green-100', 'text-green-800')   
                    e.target.textContent = 'No Publicado'

                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
)()
/******/ })()
;
//# sourceMappingURL=cambiarEstado.js.map