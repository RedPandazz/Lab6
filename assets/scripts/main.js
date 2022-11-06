// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  // A9
  const recipes = localStorage.getItem('recipes');
  return (recipes ? JSON.parse(recipes) : []);
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. - Get a reference to the <main> element
  // A11. - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>

  // A10
  let mainElement = document.querySelector('main');
  // A11
  for(let i of recipes){
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = i;
    mainElement.append(recipeCard);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  // B1
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. - Get a reference to the <form> element
  // B2
  let form = document.querySelector('form');
  // B3. - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  // B3
  const button = document.querySelector('button[type="submit"]');
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4.  - Create a new FormData object from the <form> element reference above
  // B5.  - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
  // B6. - Create a new <recipe-card> element
  // B7. - Add the recipeObject data to <recipe-card> using element.data
  // B8. - Append this new <recipe-card> to <main>
  // B9. - Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage
  button.addEventListener('click', () => {
    event.preventDefault();
    // B4
    let formData = new FormData(form);
    // B5
    let recipeObject = {};
    for(const [key, value] of formData){
      recipeObject[key] = value;
    }
    // B6
    let recipeCard = document.createElement('recipe-card');
    // B7
    recipeCard.data = recipeObject;
    // B8
    let main = document.querySelector('main');
    main.append(recipeCard);
    // B9
    let recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  }) 
  // B10. - Get a reference to the "Clear Local Storage" button
  // B10
  let clearStorage = document.querySelector('button[type="button"]');
  // B11. - Add a click event listener to clear local storage button
  // B11
  clearStorage.addEventListener('click', () => {
    // B12
    localStorage.setItem('recipes', JSON.stringify([]));
    // B13
    let main = document.querySelector('main');
    main.innerHTML = ``;
  });
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. - Clear the local storage
  // B13. - Delete the contents of <main>
}
