export class SorterHolder {

    /**
     * 
     * Class used to handle all Sorter objects needed by Gallery
     * Includes a default Sorter and default direction - this will be the fallback position if any Sorter is cycled/
     * back through to "inactive" or the "reset" button is clicked.
     * 
     * @param {*} galleryObj 
     * @param {*} holdersArray 
     * @param {*} defaultIndex 
     * @param {*} defaultDir 
     */

    constructor(galleryObj, holdersArray, defaultIndex=0, defaultDir="desc") {

        this.galleryObj=galleryObj;
        this.holders=holdersArray;
        this.defaultDir=defaultDir;
        this.defaultIndex=defaultIndex
        this.defaultHolder=holdersArray[defaultIndex]
        this.anyActive;
        this.setup();

    }

    setup() {

        // Set this as the sorterHolderObj for each Holder
        this.holders.forEach( holder => {

            holder.setSorterHolder(this)

        })

        // set the activeHolder to default with defaultDir;
        this.activeHolder = this.holders[this.defaultIndex];

        //  confirm that the holder sorted
        if (this.activeHolder.status == this.defaultDir) {

            this.anyActive = true;
            
        }

    }

    defaultSort() {
        // Function to back to default sorter and default direction
        this.defaultHolder.sort(this.defaultHolder.defaultDir)

    }

}