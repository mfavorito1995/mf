/**
 * 
 * Objects to sort and filter cells dynamically
 * 
 */

/*

Cell gallery object
- Load by default using python but this object handles what happens next
- params:
    - cell container obj: the element where all cells live
- should the filters/sort buttons be their own objects?
    - generic galleryControl
        - takes field and action?

- methods:
    - sort by
        - takes a field/thing to sort by
    - filter by
        - takes field and value
    - - Sort and filter by should work together

    - reset
        - send back to python version

    - create cell
    - create all cells

*/

// cells.js
export class Gallery {

    constructor(element) {
        this.element = element;
        this.originalOrder();
    }

    clearAll() {
        this.element.innerHTML = '';
    }

    async originalOrder() {
        try {
            const response = await fetch('blog/get_most_recent');
            const posts = await response.json();
            console.log(posts);
            // Now you can continue with your logic here
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    reset() {
        this.clearAll();
    }
}
