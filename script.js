/*
    Assignment 05
    Clayton Laliberty
    0673373
*/

class ContentItem {
    constructor(id, name, description, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
    }

    updateContentItem(id, name, description, category) {
        if (id === this.id) {
            if (name !== null) this.name = name;
            if (description !== null) this.description = description;
            if (category !== null) this.category = category;
        }
    }

    toString() {
        return `
        <div id="content-item-${this.id}" class="content-item-wrapper">
        <h2>${this.name}</h2>
        <p>${this.description}</p>
        <div>${this.category}</div>
        </div>
        `;
    }
}

$(document).ready(function () {
    const contentItemList = $("#content-item-list");

    const contentItems = [
        new ContentItem(0, "Batman: Year One", "Follow Batman's early years as he establishes himself as Gotham's Dark Knight and faces corruption in the city.", "Comic Book"),
        new ContentItem(1, "Batman: The Killing Joke", "Witness the epic showdown between Batman and the Joker in a story that delves into the Clown Prince of Crime's origins.", "Comic Book"),
        new ContentItem(2, "Batman: The Dark Knight Returns", "In a dystopian Gotham, an aging Batman comes out of retirement to confront new threats, including the brutal Mutant gang.", "Comic Book"),
        new ContentItem(3, "Batman: Hush", "Batman faces a mysterious adversary known as Hush, who uses manipulation and cunning to strike at the heart of Bruce Wayne.", "Comic Book"),
        new ContentItem(4, "The Long Halloween", "Join Batman in a year-long murder mystery as he tries to unravel the identity of the Holiday Killer, who strikes on holidays.", "Comic Book"),
    ];

    contentItems.forEach((item) => {
        contentItemList.append(item.toString());
    });

    
    $(".content-item-wrapper").css({
        border: "1px solid #000",
        width: "300px",
        padding: "10px",
        margin: "10px auto",
    });

});
