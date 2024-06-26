/**
 * 
 * Objects to sort and filter cells dynamically
 * 
 */


const heroicons = {
    globeAmericas: `
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" width="16" height="16">
            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM4.5 3.757a5.5 5.5 0 1 0 6.857-.114l-.65.65a.707.707 0 0 0-.207.5c0 .39-.317.707-.707.707H8.427a.496.496 0 0 0-.413.771l.25.376a.481.481 0 0 0 .616.163.962.962 0 0 1 1.11.18l.573.573a1 1 0 0 1 .242 1.023l-1.012 3.035a1 1 0 0 1-1.191.654l-.345-.086a1 1 0 0 1-.757-.97v-.305a1 1 0 0 0-.293-.707L6.1 9.1a.849.849 0 0 1 0-1.2c.22-.22.22-.58 0-.8l-.721-.721A3 3 0 0 1 4.5 4.257v-.5Z" clip-rule="evenodd"></path>
        </svg>`,
    musicalNote: `
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" width="16" height="16">
            <path d="M14 1.75a.75.75 0 0 0-.89-.737l-7.502 1.43a.75.75 0 0 0-.61.736v2.5c0 .018 0 .036.002.054V9.73a1 1 0 0 1-.813.983l-.58.11a1.978 1.978 0 0 0 .741 3.886l.603-.115c.9-.171 1.55-.957 1.55-1.873v-1.543l-.001-.043V6.3l6-1.143v3.146a1 1 0 0 1-.813.982l-.584.111a1.978 1.978 0 0 0 .74 3.886l.326-.062A2.252 2.252 0 0 0 14 11.007V1.75Z"></path>
        </svg>`,
    calendarDays: `
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" width="16" height="16">
            <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z"></path>
            <path fill-rule="evenodd" d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z" clip-rule="evenodd"></path>
        </svg>`,
    folderOpen: `
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" width="16" height="16">
            <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h1.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H11.5A1.5 1.5 0 0 1 13 5.5v1H3v-3ZM3.081 8a1.5 1.5 0 0 0-1.423 1.974l1 3A1.5 1.5 0 0 0 4.081 14h7.838a1.5 1.5 0 0 0 1.423-1.026l1-3A1.5 1.5 0 0 0 12.919 8H3.081Z"></path>
        </svg>`
};


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

    createIconElement(icon) {

        const div = document.createElement('div');
        div.className = "column is-narrow gallery-col";
        div.innerHTML = icon;
        return div;

    }

    createCard() {

        // Crate the card container
        const container = document.createElement('div');
        container.className = "cell gallery-cell";
        container.style.minHeight = "400px";
        
        // Create the top portion
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
            
            // Create the icon
            const column1 = this.createIconElement(heroicons.globeAmericas)
            
            // Create the text
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
            
            const column1 = this.createIconElement(heroicons.musicalNote)

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

            const column1 = this.createIconElement(heroicons.calendarDays);
            
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

            const column1 = this.createIconElement(heroicons.folderOpen)

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

        // Create the bottom portion
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

    /**
     * 
     * Class used to represent and handle the entire Gallery page
     * Includes methods to clear all posts and create posts
     * 
     * Controlled by Sorters and SorterHolder.
     * 
     * @param {*} element The HTML element where the Gallery lives
     */

    constructor(element, sorterHolderObj, filterHolderObj) {
        this.element = element;
        this.sorterHolderObj = sorterHolderObj;
        this.filterHolderObj = filterHolderObj
        this.originalOrder();

        this.setup();

    }

    setup() {

        /**
         * 
         * Set up the sorterHolder, activeHolder, and filterHolder so those objects can access the Gallery
         * 
         */

        this.sorterHolderObj.setGalleryObj(this);
        this.sorterHolderObj.activeHolder.sortDecisionmaker();
        this.filterHolderObj.setGalleryObj(this);

    }

    createCards (posts) {

        /**
         * 
         * Method that creates the gallery post cards
         * 
         * @param {*} posts - JSON representation of posts from DB - comes from blog/views.get_field_direction()
         */

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

    clearAll() {

        /**
         * 
         * Simple method to clear all information from Gallery
         * Used just before adding new cards
         * 
         */

        this.element.innerHTML = '';
    }

    async originalOrder() {

        /**
         * 
         * Hardcoded request for original order - publish_date, desc
         * 
         */

        try {
            const response = await fetch('/blog/get_field_direction?field=publish_date&direction=desc');
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
    
    async reset() {

        /**
         * 
         * Reset the page back to originalOrder
         * 
         */

        this.clearAll();

        const posts = await this.originalOrder();
        
        if (posts) {
            this.createCards(posts);
        } else {
            console.error('No posts to display');
        }

    }

    async resetCurrentSort() {

        /**
         * 
         * Reset the order to the currently active sort - maintaining direction!
         * 
         * Used when unselecting a filter
         * 
         */

        this.sorterHolderObj.resetCurrentSort();


    }

    reorder(posts) {

        /**
         * 
         * Using posts from Sorter, reorders posts on the Gallery page
         * 
         */

        this.clearAll();
        this.createCards(posts);
    }

    setSorterHolder(sorterHolderObj) {

        this.sorterHolderObj = sorterHolderObj;

    }

    constructBlogUrl() {

        return `/blog/get_field_direction?field=${this.sortField}&direction=${this.sortDirection}&filter_params=${this.filterString}`

    }

    async fetchPosts() {
        
        var searchUrl = this.constructBlogUrl();
        console.log(searchUrl)

        try {
            const response = await fetch(searchUrl);
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

    createQueryString() {

        /**
         * 
         * Method that combines the FilterHolder.filterParams into a queryString
         * If no values in there, it returns {}
         * 
         * Called within this.update() to set this.filterString
         * 
         */

        var queryString = '{'
        const entries = Object.entries(this.filterHolderObj.filterParams);
        entries.forEach(([field, values]) => {

            values.forEach((value) => {

                queryString+=`"${field}":"${value}",`

            })

        })

        queryString+='}'

        return queryString

    }

    getSortField() {

        /**
         * 
         * Simple method to retrieve the activeField from SorterHolder
         * 
         * Called within this.update() to set this.sortField
         * 
         */

        return this.sorterHolderObj.activeField;

    }

    getSortDirection() {

        /**
         * 
         * Simple method to retrieve the activeDir from SorterHolder
         * 
         * Called within this.update() to set this.sortDirection
         * 
         */

        return this.sorterHolderObj.activeDir;

    }

    async update() {

        /**
         * 
         * Function that is called to "update" the gallery when a new filter or sort is added
         * It takes all data from sorterHolder and FilterHolder to create the desired query and order
         * 
         */

        // Make sure all params are up to date
        this.sortField = this.getSortField();
        this.sortDirection = this.getSortDirection();
        this.filterString = this.createQueryString();

        // collect the posts from the DB
        var posts = await this.fetchPosts()

        // Remove current posts
        this.clearAll();

        // Display newly returned posts
        this.reorder(posts)

    }
    
}
