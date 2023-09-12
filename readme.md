# Pup-E-Picker PART DEUX

In this assignment we will be re-building our dog-favoriting app called Pup- E-Picker. Don't even try this assignment till you've done the first one please 🙏.

Since you know how the app should look in feel let's highlight the differences between this app and the last one.

1. This app will be built using ONLY functional components and hooks
   a. This means you will not be using any class components
2. Updating and deleting a dog will need to be done optimistically
   a. This means that you will need to update the state of the app before the server responds
   b. If the server responds with an error, you will need to revert the state of the app to what it was before the update
3. You will need to use the context API to share state between components

For a demo of how the app should look and feel please visit [This Deployed Version of The App](https://optimitistic-pup-e-picker-deployed-bsa263act-devslopes1.vercel.app/functional)

## Learning Objectives

In order to complete this assignment, a student should be able to...

- use array states to store data from a server
- make `GET` requests to a server to retrieve data
- make `POST` requests to a server to create data
- make `DELETE` requests to a server to delete data
- make `PATCH` requests to a server to update data
- use `onSubmit` handlers to make form submissions
- using helper functions to clean up your fetch calls
- pass down state setters in order to change the state of a parent component
- set up application state correctly
- use loading states to prevent errors and make user experience better
- use `useEffect` to trigger code when a component mounts in a functional component
- use a controlled form to submit data to the server
- use `children` to create a Layout Component
- use `react-hot-toast` to create toast notifications
- use a Context Provider to share state between components without props drilling
- optimistically make changes to state before the server responds for a better user experience

## Setup

To get this project setup, you should:

- Run `npm i` to install all dependencies
- Run `npm run dev` to run the project
- Run `npm run serve` to run the server
- Run `npm run seed` to seed the server
- Run `npm run serve:slow` to run the server with a delay on all requests
  - This is useful for testing loading states

## Standard Requirements

- [x] Setup eslint
- [x] Pass all linting checks

- To check if linting passes, run `npm run lint`

- [x] Format code with prettier
- [x] State should not be duplicated
- [x] Variables should be named logically
- [x] No unnecessary console logs
- [x] No commented out blocks of code (Code comments are fine)
- [x] Setup a github repository with your submission as the `main` branch, you will submit a link to this for grading (NOT A ZIP FILE)

## Typescript Specific Requirements

- [x] pass **ALL** type checks
  - Check by running `npm run typecheck`
- [x] DON'T USE `any`.... OR ELSE
- [x] Keep your types clean and in a logical location
- [x] Prop Types for components should be collocated with their components
- [x] Shared types should live in a file that says `types` somewhere in it's name
  - [x] example: `types.ts` should work fine
- [x] Unshared types should live in the component they are used in

## Showing the Correct Component

- [x] place `Dogs` inside of the `.content-container` div of the `Section` component **using React Children**
- [x] place `CreateDogForm` inside of the `.content-container` div of the `Section` component **using React Children**
- [x] you can track the state of what tab is active in your provider

## Navigation

You should use conditional rendering to show different components inside of the `Section` components using react children. The specifications are as follows...

### when no tab is active

- [x] show the `Dogs` component
- [x] the dogs we can see should be ALL OF THE DOGS FETCHED

### when the `favorited` tab is active

- [x] shows the `Dogs` component
- [x] the dogs we can see should be ONLY THE DOGS WHERE `isFavorite` IS TRUE

### when the `unfavorited` tab is active

- [x] should show the `Dogs` component
- [x] the selected dogs should be ONLY THE DOGS WHERE `isFavorite` IS FALSE

### when the create dog tab is active

- [x] should show the `CreateDogForm` component
- [x] should not show the `Dogs` component

### Tabs

- [x] Should be black when active (You can add the `active` class to it to style an active tab correctly)
- [x] Should be white when inactive
- [x] Only zero - one tab should be active at a time
- [x] Clicking on a tab should make it active and make all other tabs inactive
- [x] Clicking an Active Tab should make it inactive

## Interacting With the API

- [x] When the component loads, you should fetch all of the dogs from the server and store them in state
- [x] When you click on a gray heart, it should turn red and the dog's `isFavorite` property should be set to `true` in the database
- [x] When you click on a red heart, it should turn gray and the dog's `isFavorite` property should be set to `false` in the database
- [x] When you click on the trash icon, it should delete the dog from the database and show the updated list of dogs
- [x] When you create a dog, it should be added to the database

## Organizing your fetch calls

- [x] You should have a file called `api.ts` with a request object that contains all of your fetching functions
  - You can completely rip this file from your previous submission if you would like

## Interacting With Fetch Calls

- [x] When the component loads, you should fetch all of the dogs from the server and store them in state
- [x] That state should be used to render all the appropriate `DogCards` on the page
- [x] Dogs where isFavorite is true should have a red heart
- [x] Dogs where isFavorite is false should have a gray heart
- [x] Clicking a gray heart on a dog should turn it red and update the database to set `isFavorite` to `true`
- [x] Clicking a red heart on a dog should turn it gray and update the database to set `isFavorite` to `false`
- [x] Clicking the trash icon on a dog should delete it from the database and update the list of dogs on the page
- [x] Creating a dog should add it to the database and update the list of dogs on the page

## Loading States

If the data is still loading then...

- [x] All inputs should be disabled
- [x] Buttons should be disabled

## What happens when you submit the form

- [x] When you submit the form, it should create a new dog in the database
- [x] If you navigate to the `all` tab, you should see the new dog in the list of dogs
- [x] If you navigate to the `favorited` tab, you should NOT see the new dog in the list of dogs
- [x] If you navigate to the `unfavorited` tab, you should see the new dog in the list of dogs
- [x] After the submission the form should be cleared, and the select should return to the default
- [x] Aftersubmitting a toast notification from `react-hot-toast` should appear saying "Dog Created"

## Performance

- [x] Clicking a heart or trash icon should trigger QUICKLY and not cause any loading UI.
- [x] The create dog form should still submit pessimistically and provide a toast that it is done afterwards
- [x] The create dog form should also be disabled according to the loading state of the fetch call
