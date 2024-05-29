export class Filter {

    /**
     * 
     * Class used to filter blog posts.
     * 
     * While all Filters will ultimately "filter" the blogs, they each have different methods or actions
     * There are dropdown or set option style filters
     *      - category
     * And there is a date range filter
     *      - 
     * 
     * Starting with Category and Date
     * Then binaries "has music" and "has location"
     * 
     * v1 is only one filter at a time
     * v2 is multiple filters
     *
     * 
     */

    constructor(buttonElement, filterText, field) {

        this.buttonElement = buttonElement;
        this.filterText = filterText;
        this.field = field;
        this.status = 'inactive';
        this.activeFilterVals = [];
        
    }

    setFilterHolder(filterHolderObj) {

        /**
         * 
         * Simple method to set the FilterHolder obj.
         * Called by FilterHolder when that object is created - ...filter is a param of FilterHolder
         * 
         */

        this.filterHolderObj = filterHolderObj;

    }

    handleClick() {

        /**
         * 
         * Critical function that handles selection/unselection of a filter
         * If the filter is not active, this activates it
         *      1. displays the filter options
         *      2. sets status to active
         * 
         */

        if ( this.status === 'inactive' ) {

            this.createFilter();
            this.filterHolderObj.optionSectionElement.style.display = 'block';
            this.status = 'active';

        }

        else if ( this.status === 'active' ) {
            
            this.hideFilter();
            this.status = 'inactive';

        }

        this.filterHolderObj.update();
        this.buttonElement.classList = `filter-btn ${this.status}`;

        // if inactive

            // create and reveal options
            
            // add active to classlist

        // if active

            // unselect all child option elements

            // after all unselected query db with remaining 

            // replace active with inactive

    }

    createFilter() {

    }

    hideFilter() {

    }

    addFilter(value) {

        /**
         * 
         * Critical method that passes a value from the clicked option to this and then to the filterHolder
         * Called when an option is clicked and "inactive"
         * 
         */

        console.log('addFilter', value)
        this.activeFilterVals.push(value)
        this.filterHolderObj.addFilterParam(this.field, value)

    }

    removeFilter(value) {

        /**
         * 
         * Critical method that removes the value from the clicked option from this and the filterHolder
         * Called when an option is clicked and "active"
         * 
         */

        console.log('removeFilter', value)
        this.activeFilterVals = this.activeFilterVals.filter(x => x !== value);
        this.filterHolderObj.removeFilterParam(this.field, value)

    }

    deactivate() {

        this.hideFilter();
        this.activeFilterVals = [];
        this.status = 'inactive';
        this.buttonElement.classList = `filter-btn ${this.status}`;

    }

}

export class ValueFilter extends Filter {

    // multiple options can be selected! These work as an or
    // all options can be cleared with a click - reset/clear button

    /**
     * 
     * @param {*} buttonElement 
     * @param {*} filterText
     * @param {*} field 
     * @param {*} optionsArray 
     */

    constructor(buttonElement, filterText, field, optionsArray) {
        super(buttonElement, filterText, field);
        this.optionsArray = optionsArray;
        this.optionObjects = [];

        this.setup();
    }

    setup() {

        this.buttonElement.addEventListener('click', (event) => this.handleClick(event));


        this.optionsArray.forEach((option) => {

            // create the option element
            var optionElement = this.createOption(option)

            // Create the option object - create the event listener in the constructor/setup
            var optionObj = new DropdownOption(option, optionElement, this);
            this.optionObjects.push(optionObj);

        });

    }

    createFilter() {

        super.createFilter();

        if ( this.filterSection === undefined ) {

            var filterSection = document.createElement('ul')
            filterSection.classList = 'horizontal-list-start'
    
            // Create the "header" so the user knows what this is
            var heraderLi = document.createElement('li')
            heraderLi.textContent = this.filterText;
            console.log(this.filterText)
            filterSection.appendChild(heraderLi);
    
            this.optionObjects.forEach((oe) => {
    
                filterSection.appendChild(oe.element)
    
            })
    
            this.filterHolderObj.optionSectionElement.appendChild(filterSection);
            
            this.filterSection = filterSection;

        }
    
        else {

            this.filterSection.style.display = 'flex';

        }


    }

    hideFilter() {

        super.hideFilter();

        if ( this.filterSection !== undefined ) {

            this.filterSection.style.display = 'none';

        }

    }

    createOption(option) {

        /**
         * 
         * Method called on instantiation that creates the option element
         * Not displayed unless the Filter element has been clicked and is active
         * Until then, the parent element (belonging to the Filter) is hidden
         * 
         */

        // create html element
        var btnElement = document.createElement('button');
        btnElement.classList = 'filter-btn';
        btnElement.textContent = option;

        return btnElement;

    }

    deactivate() {

        super.deactivate();
        this.optionObjects.forEach((o) => {

            o.deactivate();
            
        })

    }


}

class DropdownOption {

    /**
     * 
     * Object that represents an "option" for a value filter
     * Any of these objects can be selected adn posts are filtered if they match this.value and this.filterObj.field
     * 
     * Example - this.value = "Admin" and this.filterObj.field = "category" - when clicked, posts with "Admin" category are displayed.
     * 
     * @param {*} option 
     * @param {*} optionElement 
     * @param {*} filterObj 
     */

    constructor(option, optionElement, filterObj) {
        this.value = option;
        this.element = optionElement;
        this.filterObj = filterObj;
        this.status = 'inactive';

        this.setup();

    }

    setup() {

        this.element.addEventListener('click', (event) => this.handleClick(event));

    }

    addFilterToFilter() {

        /**
         * 
         * Pass the value to filter function
         * 
         */
        console.log('addFilterToFilter', this.value)
        this.filterObj.addFilter(this.value);

    }

    removeFilterFromFilter() {

        /**
         * 
         * Remove the value from filter function
         * 
         */
        console.log('removeFilterFromFilter', this.value)
        this.filterObj.removeFilter(this.value);

    }

    async handleClick() {

        /**
         * 
         * Function that handles click events on the option
         * If status is inactive, set to active and add the filter
         * If status is acive, set to inactive and remove the filter
         * 
         * These filter values are passed up the chain to the FilterHolder and finally Gallery
         * 
         */

        console.log("CLICK")

        if ( this.status === 'inactive' ) {
            
            this.addFilterToFilter();
            this.status = 'active';
    
        } else if ( this.status === 'active') {
            
            this.removeFilterFromFilter();
            this.status = 'inactive';

        }

        this.element.classList = `filter-btn ${this.status}`;

    }

    deactivate() {

        this.status = 'inactive';
        this.element.classList = `filter-btn ${this.status}`;

    }

}
