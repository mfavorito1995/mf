export class FilterHolder {

    /**
     * class to hold all the filters
     * 
     * Add and remove filter methods:
     *      1. update this.filterParams and
     *      2. call Gallery update method
     * 
     * @param  {*} optionSectionElement - HTML element where the options go 
     * @param  {...any} filters 
     * 
     */


    constructor(optionSectionElement, ...filters) {

        this.optionSectionElement = optionSectionElement;

        this.filters = filters // is this the right way to add an uncertain amount of filters
        this.filterParams = {};

        this.setup();

    }

    setup() {

        // Iterate over filters and set this as the filterHolder
        this.filters.forEach((filter) => {
        
            filter.setFilterHolder(this)

        });

    }

    setGalleryObj(galleryObj) {

        /**
         * 
         * Simple method to set the Gallery obj.
         * Called by Gallery when that object is created - FilterHolder is a param of Gallery
         * 
         */

        this.galleryObj = galleryObj

    }

    addFilterParam(field, value) {

        /**
         * 
         * Method that adds avalue to this.filterParams and calls galleryObj.update
         * This is called when a filter's option is clicked
         * It updates the gallery by filtering based on the selection
         * 
         * @param {string} field - field for the filter
         * @param {string} value - the value to add
         * 
         */

        console.log('addFilterParam', field, value)

        if (Object.hasOwn(this.filterParams, field)) {

            this.filterParams[field].push(value)

        } else {

            this.filterParams[field] = [value];

        }

        this.galleryObj.update();

    }

    removeFilterParam(field, value) {

        /**
         * 
         * Method that removes a value from this.filterParams and calls galleryObj.update
         * This is called when a filter's option is clicked
         * It updates the gallery by filtering based on the selection
         * 
         * @param {string} field - field for the filter
         * @param {string} value - the value to add
         * 
         */

        console.log('removeFilterParam', field, value)

        if (Object.hasOwn(this.filterParams, field)) {

            this.filterParams[field] = this.filterParams[field].filter(x => x !== value);

        } else {

        }

        this.galleryObj.update()

    }

}