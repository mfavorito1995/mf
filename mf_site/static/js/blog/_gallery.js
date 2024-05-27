// NOTES EOD 5_17
// Set up the method to remove active/reverse from all other buttons if another button clicked
// Need to make it so only one active at a time

// SortHolder class
  // sorters attribute is an array or dict style object with Sorter objects
  // each sorter has same functions but with field as parameter
    // sort, reverse, etc all by field
    // They also have a property style bool to indicate if selected - perhaps its not bool, maybe it's just the "state"
  // Has method to check if any Sorter is not "inactive"
    // Does this need to know which Sorter is not "inactive"

  // When any Sorter is clicked, SorterHolder checks if any others are active or reversed
    // If so, set to "inactive", carry on with new click (or can the setting to incative happen after/concurrently)

// 

import { Gallery }  from './cells.js';
import { Sorter } from './Sorter.js';
import { SorterHolder } from './SorterHolder.js';
import { Filter, FilterCollection, ValueFilter } from './Filter.js';

document.addEventListener("DOMContentLoaded", (event) => {

  // FOR ALL BUTTONS
    // when clicked, order desc - status is clicked
    // if clicked/active, the second click reverse order- status is reverse
    // third click removes the sort, reset to default (newest -> oldest)


    console.log('we are here')
    
    var cellContainer = document.getElementById('cell-container');
    var GalleryObj = new Gallery(cellContainer);

    var dateBtn = document.getElementById('date-btn')
    var titleBtn = document.getElementById('title-btn')  

    // SORTER HOLDER SET UP
    // Sorters are button element, field name, optional default dir (default = 'desc')
    var DateSorter = new Sorter(dateBtn, 'publish_date')
    var TitleSorter = new Sorter(titleBtn, 'title')

    // SorterHolder takes an array (may change) of Sorters and an index that is the default
    // Eventually we will load and sort on the default.
    var SorterHolderObj = new SorterHolder(GalleryObj, [DateSorter, TitleSorter], 0)

    // Create Date Filter
    var dateFilterBtn = document.getElementById("date-filter-btn");
    
    // Create Category Filter
    var categoryFilterBtn = document.getElementById("category-filter-btn");
    var categoryFilter = new ValueFilter(categoryFilterBtn, 'category', categories) // categories loaded in html from view

    // Create the FilterCollection - add the previously created Filters
    var filterOptionSection = document.getElementById("filter-option-section");
    var filterCollection = new FilterCollection(filterOptionSection, categoryFilter, categoryFilter)

  });

