import { Gallery }  from './cells.js';

document.addEventListener("DOMContentLoaded", (event) => {

    console.log('we are here')
    
    var cellContainer = document.getElementById('cell-container');
    var GalleryObj = new Gallery(cellContainer);

    var clearBtn = document.getElementById('clear-btn')
    clearBtn.addEventListener('click', function () {
      GalleryObj.clearAll();
    })

    var resetBtn = document.getElementById('reset-btn')
    resetBtn.addEventListener('click', function () {
      GalleryObj.reset();
    })

  });

