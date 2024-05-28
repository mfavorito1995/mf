export class Sorter {

    /**
     * 
     * Class used to sort blog posts. Has methods to get posts in asc or desc order based on provided field.
     * 
     * @param {*} buttonElement html button element that when clicked triggers the sorting
     * @param {*} field string name of the posts field that this sorter is responsible for
     * @param {*} defaultDir string OPTIONAL - default="desc" - the "default" direction for sorting this field.
     * 
     * When clicked, we check the Sorter's status which can be "active", "reverse", or "inactive"
     * The Sorter will cycle through those in order if the element is clicked multiple times in a row
     *
     * An array (or perhaps eventually some other type of object) of Sorter objects are passed into the SorterHolder object     * 
     * 
     */


    constructor(buttonElement, field, defaultDir='desc') {

        this.buttonElement = buttonElement;
        this.field = field;
        this.defaultDir = defaultDir;
        this.status = 'inactive'
        this.sorterHolderObj;

        this.setup();

    }

    setup() {

        // set up reverse direction
        if (this.defaultDir == 'desc') {

            this.reverseDir = 'asc'

        } else if (this.defaultDir == 'asc') {

            this.reverseDir = 'desc'

        } else {

            throw new Error(`Invalid defaultDir value ${this.defaultDir} - use 'asc' or 'desc'`)

        }

        // initialize the click events
        this.buttonElement.addEventListener('click', this.sortDecisionmaker.bind(this))
        this.buttonElement.classList = `sort-btn ${this.status}`;

    }

    reset() {

        /**
         * 
         * Quick method to set the holder back to start
         * 
         */

        this.status = 'inactive'

    }

    setSorterHolder(sorterHodlerObj) {

        /**
         * 
         * Sets the sorterHolderObj to allow for interaction between classes
         * 
         */

        this.sorterHolderObj = sorterHodlerObj

    }

    sortDecisionmaker() {

        /**
         * 
         * Method called on click event that directs the sorting in the SorterHolder through SorterHolder.updateSort(this)
         * The field and direction from this are accessed by SorterHolder
         * Then, the Gallery.update() function sorts and filters.
         * 
         */

        if (this.status == 'inactive') {

            this.sort(this.defaultDir)
            this.activeDir = this.defaultDir;
            this.status = 'active'
            this.sorterHolderObj.updateSort(this)


        } else if (this.status == 'active') {

            this.sort(this.reverseDir)
            this.activeDir = this.reverseDir;
            this.status = 'reverse'
            this.sorterHolderObj.updateSort(this)


        } else if (this.status == 'reverse') {

            this.status = 'inactive';
            this.activeDir = null
            this.sorterHolderObj.defaultSort(); // reset to the default

        } else {

            throw new console.error(`Corrupted status: ${this.status}, setting default Sorter to active`)

        }

    }

    async sort(direction) {

        /**
         * 
         * Method that sorts.
         * First, clears all other sorts, sets those Sorter's to inactive, and resets their classlists.
         * Then, sorts asc or desc which triggers the request for data
         * Next, it collects that data and initiates the Gallery reorder method.
         * Finally, it updates the Sorter status and class to reflect status
         * 
         */

        this.sorterHolderObj.holders.forEach(holder => {

            if ( holder === this ) {

            } else {

                holder.reset()
                holder.buttonElement.classList = 'sort-btn inactive'

            }

        })

        if (direction == 'desc') {

            this.sortDesc();

        }

        else if (direction == 'asc') {

            this.sortAsc();

        }

        else {

            throw new Error(`Invalid direction value ${direction} - use 'asc' or 'desc'`)

        }

        this.sorterHolderObj.activeHolder = this
        this.buttonElement.classList = `sort-btn ${this.status}`;

    }

    sortAsc() {

        /**
         * 
         * Method that sets status for asc direction
         * 
         */

        if (this.defaultDir == 'asc') {
            this.status='active';
        } else {
            this.status='reverse';
        }



    }

    sortDesc() {

        /**
         * 
         * Method that sets status for desc direction
         * 
         */

        if (this.defaultDir == 'desc') {
            this.status='active';
        } else {
            this.status='reverse';
        }


    }

}