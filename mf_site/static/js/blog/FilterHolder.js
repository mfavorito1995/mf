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


    constructor(optionSectionElement, clearFilterButtonElement, ...filters) {

        this.optionSectionElement = optionSectionElement;
        this.clearFilterButtonElement = clearFilterButtonElement;

        this.filters = filters // is this the right way to add an uncertain amount of filters
        this.filterParams = {};

        this.setup();

    }


    setup() {

        // Initialize the button visibility
        this.updateButtonVisibility();

        // Set up click event on clear button
        this.clearFilterButtonElement.addEventListener('click', () => this.clearAll());

        // Iterate over filters and set this as the filterHolder
        this.filters.forEach((filter) => {
        
            filter.setFilterHolder(this)

        });
        

    }

    anyFilterActive() {

        /**
         * 
         * Function to check if any filter has status 'active'
         * 
         */

        return this.filters.some(filter => filter.status === 'active');
    }

    updateButtonVisibility() {

        /**
         * 
         * Function used to update button visibility
         * 
         */

        if (this.anyFilterActive()) {
            this.clearFilterButtonElement.style.display = 'block';
        } else {
            this.clearFilterButtonElement.style.display = 'none';
        }
    }

    // Function to check if an object is empty - we will use this on filterparams
    isEmpty(obj) {

        return Object.keys(obj).length === 0;

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


    update() {

        /**
         * 
         * Function used to trigger updates for clear button and gallery posts
         * 
         */

        this.updateButtonVisibility();
        this.galleryObj.update();

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

        this.update();

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

            // if that removal causes there to be no more selected options for that filter, delete the property
            if (this.filterParams[field].length === 0) {
                console.log("delete?")
                delete this.filterParams[field];
            }

        }

        this.update();

    }

    deactivatefilters() {

        this.filters.forEach((f) => {

            f.deactivate();

        })

    }

    clearAll() {

        /**
         * 
         * This is the reset function - triggered by clear button click
         * Removes all filters and resets filterParams
         * 
         */

        this.deactivatefilters();
        this.filterParams = {};
        this.update();

    }

}