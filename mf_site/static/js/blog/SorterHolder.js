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

    constructor(holdersArray, defaultIndex=0, defaultDir="desc") {

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

    setGalleryObj(galleryObj) {

        this.galleryObj = galleryObj

    }

    resetCurrentSort() {

        this.activeHolder.sort();

    }

    updateSort(sorterObj) {

        this.activeField = sorterObj.field;
        this.activeDir = sorterObj.activeDir

        console.log("Update sort", this.activeField, this.activeDir)

        this.galleryObj.update();

    }

    defaultSort() {

        this.activeField = this.defaultHolder.field;
        this.activeDir = this.defaultDir;

        console.log("Reset sort", this.activeField, this.activeDir)

        this.galleryObj.update();

    }



}