/**
 *  NOTES 1:55 PM 5_28
 *  Gallery, holder, sorter reqrite almost complete!
 *    Everything moves through the gallery and its functions
 * 
 *  Remaining work
 *    ADD DOCSTRINGS FOR FUNCTIONS!
 *    Add post type to blogs
 *    Figure out how to keep images after sorting
 *      !!! - currently no images will appera because we call a sort upon gallery creation. 
 *    Add a reset/clear filters button
 *    Add a rest/clear sorts button
 *    Stylin'   
 * 
 *  */
// Re

// 

import { Gallery }  from './cells.js';
import { Sorter } from './Sorter.js';
import { SorterHolder } from './SorterHolder.js';
import { Filter, ValueFilter } from './Filter.js';
import { FilterHolder } from './FilterHolder.js';

document.addEventListener("DOMContentLoaded", (event) => {

  // FOR ALL BUTTONS
    // when clicked, order desc - status is clicked
    // if clicked/active, the second click reverse order- status is reverse
    // third click removes the sort, reset to default (newest -> oldest)


    console.log('we are here')

    var dateBtn = document.getElementById('date-btn')
    var titleBtn = document.getElementById('title-btn')  

    // SORTER HOLDER SET UP
    // Sorters are button element, field name, optional default dir (default = 'desc')
    var DateSorter = new Sorter(dateBtn, 'publish_date')
    var TitleSorter = new Sorter(titleBtn, 'title')

    // SorterHolder takes an array (may change) of Sorters and an index that is the default
    // Eventually we will load and sort on the default.
    var SorterHolderObj = new SorterHolder([DateSorter, TitleSorter], 0)

    // Create Post Type Filter
    var postTypeFilterBtn = document.getElementById("postType-filter-btn");
    var postTypeFilter = new ValueFilter(postTypeFilterBtn, 'Post Type', 'post_type', categories) // categories loaded in html from view
    
    // Create Category Filter
    var categoryFilterBtn = document.getElementById("category-filter-btn");
    var categoryFilter = new ValueFilter(categoryFilterBtn, 'Category', 'category', categories) // categories loaded in html from view

    // Create the FilterCollection - add the previously created Filters
    var filterOptionSection = document.getElementById("filter-option-section");
    var FilterHolderObj = new FilterHolder(filterOptionSection, categoryFilter, postTypeFilter)

    
    var cellContainer = document.getElementById('cell-container');
    var GalleryObj = new Gallery(cellContainer, SorterHolderObj, FilterHolderObj);

  });

