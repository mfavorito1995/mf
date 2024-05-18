import { Gallery }  from './cells.js';

document.addEventListener("DOMContentLoaded", (event) => {

  // FOR ALL BUTTONS
    // when clicked, order desc - status is clicked
    // if clicked/active, the second click reverse order- status is reverse
    // third click removes the sort, reset to default (newest -> oldest)


    console.log('we are here')
    
    var cellContainer = document.getElementById('cell-container');
    var GalleryObj = new Gallery(cellContainer);

    var dateBtn = document.getElementById('date-btn')
    dateBtn.addEventListener('click', function () {

      console.log("ADD METHOD TO CLEAR CLASSES FROM OTHER BUTTONS")

      if (dateBtn.classList.contains('active')) {
        dateBtn.classList.remove('active')
        dateBtn.classList.add('reverse')
        GalleryObj.reverse('date');
      } else if (dateBtn.classList.contains('reverse')) {
        console.log('reverse -> inactive')
        dateBtn.classList.remove('reverse')
        dateBtn.classList.add('active')
        GalleryObj.reset();
      } else {
        dateBtn.classList.remove('inactive')
        dateBtn.classList.add('active')
        GalleryObj.reset();  

      }

    })

    var titleBtn = document.getElementById('title-btn')
    titleBtn.addEventListener('click', function () {

      console.log("ADD METHOD TO CLEAR CLASSES FROM OTHER BUTTONS")

      if (titleBtn.classList.contains('active')) {
        console.log('active -> reverse')
        titleBtn.classList.remove('active')
        titleBtn.classList.add('reverse')
        GalleryObj.reverse('title');
      } else if (titleBtn.classList.contains('reverse')) {
        console.log('reverse -> inactive')
        titleBtn.classList.remove('reverse')
        titleBtn.classList.add('inactive')
        titleBtn.value = 'inactive'
        GalleryObj.reset();
      } else {
        console.log('inactive -> active')
        titleBtn.classList.remove('inactive')
        titleBtn.classList.add('active')
        titleBtn.classList.append = 'active'
        GalleryObj.order('title');
      }

    })

    // var reverseBtn = document.getElementById('oldest-newest-btn')
    // reverseBtn.addEventListener('click', function () {
    //   GalleryObj.reverse();
    // })
  });

