# Contact Management Application with Vue.js (hard)

It is your first day at a new job as a senior front-end engineer and you have been given a task to finish a contact management application.

## Setup

This app was created with [Vue CLI](https://cli.vuejs.org/).

Follow these steps for correct application setup:

1. `npm install` – install dependencies
2. `npm test` – run all tests (should fail unless you fix the app)
3. `npm run test:watch` – run all tests in  watch mode
4. `npm run serve` – serve the app at [http://localhost:8080/](http://localhost:8080/) (or at another port it `8080` is unavailable)

----

## Introduction

All parts of the application have been written by the previous engineer except the following *missing functionalities*:

* Binding data variable contact to contact imported from contacts.json.
* Creating a data variable called query initialized to the empty string.
* Two way binding data variable query to input field with the `id="search"`.
* Creating a search function to search through the contacts by firstname and lastname.
* Displaying contacts using `app-contacts` component and search results.
* Making sure all imported contacts are sorted properly in ascending order.
* Displaying contacts with a constant styling to the viewport.

## Problem Statement

You are expected to implement the following functionalities:

1. Create a method called: `sortContacts()`. This method returns `this.contacts` sorted in ascending order by lastname.
2. Set variable contacts to be equal to the sorted output of `sortContacts` method.
3. Create a data variable called `query` and initialize it to the empty string.
4. Bind the `query` variable to the input field with the `id="search"`.
5. Create the computed getter function: `search()` > This function filters contacts by their first and last names, email and phone number based on a data variable named query and returns an array of the filtered contacts.
6. Bind the results of search to be displayed in `app-contacts` componenent.
7. Create a directive called `contactBubble` that when added to a div changes its styling to have:
    * `background-color: rgb(159, 159, 199)`.
    * `border-radius: 10px`.
    * `color: white`.
    * `font-size: 20px`.
    * `font-variant: all-petite-cap`.
8. Add the `contactBubble` directive to the div with its id equal to app.
9. Create an event bus called `ContactBus` in the file `./src/bus/ContactBus.js` that will be used to emit relevant data to different parts of the application.
10. Add members variables `index = ''`, `newCon = false` and `visible = false` to `formSettings`.
11. Finish method `openNew()` so that it sets `contact` data variable to default values and add id equal to the size of contacts. This method should also set `visible` and `newCon` in `formSettings` object to `true`.
12. Subscribe to `ContactBus` signal `delCon` with a callback method (which accepts `contactIndex`) and removes `contactIndex` from the `contacts`.
13. Finish the computed methods `validatedEmail()` and `validatedPhone()` in `src/components/ContactForm.vue` to return the proper boolean values.
14. In the file `src/components/ContactForm.vue` `contact.email` and `contact.phoneNumber` arrays will be dynamically updated when they are changed. Update `addEmail()` and `addPhone()` so that the form will add a new email or phone number field whenever anyone of these methods are called.

## Note

Some functionalities which you are asked to implement might not covered with the tests you can see, but make sure you do implement them, as they will affect your final score. Just make sure to implement missing features stated above.

# Good luck!
