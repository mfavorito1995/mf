/**
 * 
 * STATUS EOD 5/26
 * 
 * Filter button UI working - display on and off on clicks
 * Have yet to actually filter anything
 * But we have the category data
 * 
 * Next step is to actually filter by a category B - )
 * 
 * 
 */


export class FilterCollection {

    /**
     * class to hold all the filters
     * 
     * Should be ablet to take an unknown number of options
     * Should be able to add/remove filters as needed
     * 
     * key methods
     *      - add Filters? Filters also need to be able to add a collection...
     *      - combined filter
     *          - collect all filters
     *      - remove all filters
     *          - remove one handled by the Filter, but this triggers the combined filter
     * 
     * @param  {...any} filters 
     * 
     */

    // class to hold all the filters
    // this should be able to take an uniknown number of filters
    // It should also be able to add and possibly remove filters as needed?
    // Key methods

    constructor(optionSectionElement, ...filters) {

        this.filters = filters // is this the right way to add an uncertain amount of filters
        this.optionSectionElement = optionSectionElement;

        this.setup();

    }

    setup() {

        this.filters.forEach((filter) => {

            console.log(filter);
            filter.setFilterCollection(this)

        });

    }

}

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
     * Open Questions
     *      - Where do the actions take place/do we need to provide a section to put the action in?
     *          - vision is that the action elements go under the filter options
     *          - each filter should have a section to place its option elements in
     *          - we can create these in HTML and hide OR create dynamically when filter is selected?
     *              - if dynamic we will need to provide the location - perhaps an empty section - where all go
     *                  - so HTML has a "filter option section" and we add the dynamically created "filter option element" to it when filter activated
     *                  - the options or other elements go in there
     * 
     */

    constructor(buttonElement, field) {

        this.buttonElement = buttonElement;
        this.field = field;
        this.status = 'inactive'
        
    }

    setFilterCollection(filterCollectionObj) {

        this.filterCollectionObj = filterCollectionObj;

    }

    handleClick() {

        if ( this.status === 'inactive' ) {

            this.createFilter();
            this.filterCollectionObj.optionSectionElement.style.display = 'block';
            this.status = 'active';

        }

        else if ( this.status === 'active' ) {
            
            this.hideFilter();
            this.status = 'inactive';


        }

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


}

export class ValueFilter extends Filter {

    // multiple options can be selected! These work as an or
    // all options can be cleared with a click - reset/clear button

    /**
     * 
     * @param {*} buttonElement 
     * @param {*} field 
     * @param {*} optionsArray 
     */

    constructor(buttonElement, field, optionsArray) {
        super(buttonElement, field);
        this.optionsArray = optionsArray;
        this.optionObjects = [];

        this.setup();
    }

    setup() {

        console.log(this.optionsArray)
        this.buttonElement.addEventListener('click', (event) => this.handleClick(event));


        this.optionsArray.forEach((option) => {

            // create the option element
            var optionElement = this.createOption(option)

            // Create the option object - create the event listener in the constructor/setup
            var optionObj = new DropdownOption(optionElement, this);
            this.optionObjects.push(optionObj);

        });

    }

    createFilter() {

        if ( this.filterSection === undefined ) {

            var filterSection = document.createElement('ul')
            filterSection.classList = 'horizontal-list-start'
    
            // Create the "header" so the user knows what this is
            var heraderLi = document.createElement('li')
            heraderLi.textContent = this.field;
            filterSection.appendChild(heraderLi);
    
            this.optionObjects.forEach((oe) => {
    
                filterSection.appendChild(oe.element)
    
            })
    
            this.filterCollectionObj.optionSectionElement.appendChild(filterSection);
            
            this.filterSection = filterSection;

        }
    
        else {

            this.filterSection.style.display = 'flex';

        }


    }

    hideFilter() {

        if ( this.filterSection !== undefined ) {

            this.filterSection.style.display = 'none';

        }

    }
    createOption(option) {

        // create html element
        var btnElement = document.createElement('button');
        btnElement.classList = 'filter-btn';
        btnElement.textContent = option;

        return btnElement;

    }

}

class DropdownOption {

    constructor(optionElement, filterObj) {

        this.element = optionElement;
        this.filterObj = filterObj;
        this.status = 'inactive';

        this.setup();

    }

    setup() {

        this.element.addEventListener('click', (event) => this.handleClick(event));

    }

    handleClick() {

        // If inactive


            // request blogs within the category
            
            // return the blogs within the category

            // clear other blogs

            // add returned blogs

            // Add "active" to the classlist

        // if active

            // request all blogs

            // return all blogs

            // clear other blogs

            // add returned blogs

            // replace active with inactive

    }

    // 

}
