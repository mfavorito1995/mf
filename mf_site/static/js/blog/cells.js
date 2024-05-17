/**
 * 
 * Objects to sort and filter cells dynamically
 * 
 */

/*

UPDATE EOD 5/16 - plan below in action, some of card is being added correctly but not all.

New plan for cell organization
- when page loads create JS objects for each card
    - do we try to read it from the HTML or do we collect from DB
    - I think collect from db. But leave HTML on page to start for fast loading
- the elements will persist
- elements will include all attributes of the blog that can be used for sorting
- elements will include a copy of the complete html element - jquery clone or otherwise

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

export class PostObject {

    constructor(post) {

        this.post = post;
        this.id = post.id;
        this.title = post.title;
        this.place = post.place;
        this.music = post.music;
        this.category = post.category;
        this.display_date = post.display_date;
        this.gallery_image = this.gallery_image;

    }

    createCard() {
        const container = document.createElement('div');
        container.className = "cell gallery-cell";
        container.style.minHeight = "400px";

        const topDiv = document.createElement('div');
        topDiv.className = "gallery-cell-top";
        topDiv.style.flex = "1";

        const h4 = document.createElement('h4');
        const a = document.createElement('a');
        a.href = `/blog/${this.id}`;
        a.textContent = this.title;
        h4.appendChild(a);
        topDiv.appendChild(h4);

        if (this.place) {
            const placeDiv = document.createElement('div');
            placeDiv.className = "columns is-1 is-mobile";
            const column1 = document.createElement('div');
            column1.className = "column is-narrow gallery-col";
            // Replace with icon
            column1.textContent = "Icon";
            const column2 = document.createElement('div');
            column2.className = "column gallery-col";
            const p = document.createElement('p');
            p.className = "is-flex";
            p.style.alignItems = "center";
            const span = document.createElement('span');
            span.className = "ml-2";
            span.textContent = this.place;
            p.appendChild(span);
            column2.appendChild(p);
            placeDiv.appendChild(column1);
            placeDiv.appendChild(column2);
            topDiv.appendChild(placeDiv);
        }

        if (this.music) {
            const musicDiv = document.createElement('div');
            musicDiv.className = "columns is-1 is-mobile";
            const column1 = document.createElement('div');
            column1.className = "column is-narrow gallery-col";
            // Replace with icon
            column1.textContent = "Icon";
            const column2 = document.createElement('div');
            column2.className = "column gallery-col";
            const p = document.createElement('p');
            p.className = "is-flex";
            p.style.alignItems = "center";
            const span = document.createElement('span');
            span.className = "ml-2";
            span.textContent = this.music;
            p.appendChild(span);
            column2.appendChild(p);
            musicDiv.appendChild(column1);
            musicDiv.appendChild(column2);
            topDiv.appendChild(musicDiv);
        }

        if (this.display_date) {
            const dateDiv = document.createElement('div');
            dateDiv.className = "columns is-1 is-mobile";
            const column1 = document.createElement('div');
            column1.className = "column is-narrow gallery-col";
            // Replace with icon
            column1.textContent = "Icon";
            const column2 = document.createElement('div');
            column2.className = "column gallery-col";
            const p = document.createElement('p');
            p.className = "is-flex";
            p.style.alignItems = "center";
            const span = document.createElement('span');
            span.className = "ml-2";
            span.textContent = this.display_date;
            p.appendChild(span);
            column2.appendChild(p);
            dateDiv.appendChild(column1);
            dateDiv.appendChild(column2);
            topDiv.appendChild(dateDiv);
        }

        if (this.category) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = "columns is-1 is-mobile";
            const column1 = document.createElement('div');
            column1.className = "column is-narrow gallery-col";
            // Replace with icon
            column1.textContent = "Icon";
            const column2 = document.createElement('div');
            column2.className = "column gallery-col";
            const p = document.createElement('p');
            p.className = "is-flex";
            p.style.alignItems = "center";
            const span = document.createElement('span');
            span.className = "ml-2";
            span.textContent = this.category;
            p.appendChild(span);
            column2.appendChild(p);
            categoryDiv.appendChild(column1);
            categoryDiv.appendChild(column2);
            topDiv.appendChild(categoryDiv);
        }

        // Repeat the above pattern for other properties

        const bottomDiv = document.createElement('div');
        bottomDiv.className = "gallery-cell-bottom";
        bottomDiv.style.flex = "1";

        if (this.gallery_image) {
            const figure = document.createElement('figure');
            figure.className = "image gallery-cell-image";
            const img = document.createElement('img');
            img.src = this.gallery_image.url;
            figure.appendChild(img);
            bottomDiv.appendChild(figure);
        }

        container.appendChild(topDiv);
        container.appendChild(bottomDiv);

        return container;
    }

}

// cells.js
export class Gallery {

    constructor(element) {
        this.element = element;
        this.originalOrder();
    }

    clearAll() {
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
        
        var postsArray = [];

        if (posts) {
            posts.forEach(post => {

                var postObj = new PostObject(post)
                var postElement = postObj.createCard()
                this.element.appendChild(postElement);

            });
        } else {
            console.error('No posts to display');
        }

    }
}
