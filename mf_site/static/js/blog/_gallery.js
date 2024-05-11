import { Gallery }  from './cells.js';

document.addEventListener("DOMContentLoaded", (event) => {

    console.log('we are here')
    
    var cellContainer = document.getElementById('cell-container');
    var GalleryObj = new Gallery(cellContainer);

  });

// CURRENT SITUATION - script loading in HTML, but request/fetch not working - progress!