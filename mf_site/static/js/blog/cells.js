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
        console.log(this.element)
        console.log('???')
        this.element.innerHTML = '';
    }

    async originalOrder() {
        try {
            const response = await fetch('/blog/get_most_recent');
            console.log('Response received:', response);
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const jR = await response.json();
            return jR;        
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async reset() {
        this.clearAll();

        const posts = await this.originalOrder();
        
        if (posts) {
            posts.forEach(post => {
                console.log(post);
                // Here you can create and append the elements to this.element
                // For example:
                let postElement = document.createElement('div');
                postElement.textContent = post.name; // or other fields
                this.element.appendChild(postElement);
            });
        } else {
            console.error('No posts to display');
        }

    }
}
