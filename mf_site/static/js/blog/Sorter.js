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
         * Method that directs the sorting based on sttaus and defaultDir or reverseDir
         * 
         */

        if (this.status == 'inactive') {

            this.sort(this.defaultDir)
            this.status = 'active'

        } else if (this.status == 'active') {

            this.sort(this.reverseDir)
            this.status = 'reverse'

        } else if (this.status == 'reverse') {

            this.status = 'inactive';
            this.sorterHolderObj.defaultSort(); // reset to the default

        } else {

            throw new console.error(`Corrupted status: ${this.status}, setting default Sorter to active`)

        }

    }

    async sortRequest(direction) {

        /**
         * 
         * Method to request posts from database
         * Uses the instance's field and provided direction from sort and SortDecisionMaker
         * 
         */

        console.log(`/blog/get_field_direction?field=${this.field}&direction=${direction}`)
        try {
            const response = await fetch(`/blog/get_field_direction?field=${this.field}&direction=${direction}`);
            console.log('Response received:', response.body);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jR = await response.json();
            return jR;        
        } catch (error) {
            console.error('Error fetching data:', error);
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

        var posts = await this.sortRequest(direction);

        // use the sorter holder -> gallery obj to create the cards.
        this.sorterHolderObj.galleryObj.reorder(posts);
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
        console.log('DESCENDING', this.field);
        console.log(this.status)

    }

}