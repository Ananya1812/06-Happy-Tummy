// Function to fetch a random recipe
async function getRandomRecipe() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const meal = data.meals[0];

    // Get references to HTML elements
    const randomimages = document.querySelector(".random-generator");
    const dishImage = randomimages.querySelector(".meal-image");
    const dishName = randomimages.querySelector(".meal-name");
    const recipeBtn = randomimages.querySelector(".view-recipe-btn");
    const popup = randomimages.querySelector(".popup");
    const modalDishName = randomimages.querySelector(".popup-meal-name");
    const directions = randomimages.querySelector(".meal-instructions");
    const listOfIngredients = randomimages.querySelector(".ingredients-list");
    const source = randomimages.querySelector(".source-link");
    const exit = randomimages.querySelector(".close-btn");

    // Set the meal image, name, and source link
    dishImage.src = meal.strMealThumb;
    dishImage.alt = meal.strMeal;
    dishName.textContent = meal.strMeal;

    // Add event listener to the "View Recipe" button
    recipeBtn.addEventListener("click", () => {
      // Set the meal name and instructions in the popup
      modalDishName.textContent = meal.strMeal;
      directions.textContent = meal.strInstructions;

      // Get the ingredients and display them in a list
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      listOfIngredients.innerHTML = ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("");

      // Set the source link
      source.href = meal.strSource;

      // Show the popup
      popup.classList.add("show");
    });

    // Add event listener to the close button in the popup
    exit.addEventListener("click", () => {
      // Hide the popup
      popup.classList.remove("show");
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the getRandomRecipe function to fetch and display a random recipe
getRandomRecipe();

// Function to handle key press event
function handleKeyPress(event) {
  if (event.key === "Enter") {
    const searchInput = document.getElementById("search").value.trim();
    if (searchInput !== "") {
      // Fetch recipes based on the search input
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
      )
        .then((response) => response.json())
        .then((data) => displayResults(data.meals))
        .catch((error) => console.log(error));
    }
  }
}

// Function to display search results
function displayResults(meals) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (meals) {
    meals.forEach((meal) => {
      // Create HTML elements for each meal
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");

      const dishName = document.createElement("h3");
      dishName.textContent = meal.strMeal;

      const dishImage = document.createElement("img");
      dishImage.src = meal.strMealThumb;
      dishImage.alt = meal.strMeal;

      const recipeButton = document.createElement("button");
      recipeButton.textContent = "Get Recipe";
      recipeButton.classList.add("recipe-button");
      recipeButton.addEventListener("click", () => displayRecipe(meal));

      // Append the elements to the results container
      mealDiv.appendChild(dishImage);
      mealDiv.appendChild(dishName);
      mealDiv.appendChild(recipeButton);

      resultsContainer.appendChild(mealDiv);
    });

    // Scroll to the results section
    resultsContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    resultsContainer.innerHTML = "<p>No results found</p>";
  }
}

// Function to display the recipe for a selected meal
function displayRecipe(meal) {
  const popup = document.getElementById("popup");
  const modalDishName = document.getElementById("popup-meal-name");
  const popupRecipe = document.getElementById("popup-recipe");

  // Set the meal name in the popup
  modalDishName.textContent = meal.strMeal;

  // Fetch the full recipe details for the selected meal
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
    .then((response) => response.json())
    .then((data) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals[0][`strIngredient${i}`];
        const measure = data.meals[0][`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${ingredient} - ${measure}`);
        }
      }

      const recipeInstructions = data.meals[0].strInstructions;

      // Display the ingredients and recipe instructions in the popup
      popupRecipe.innerHTML = `
        <h4>Ingredients:</h4>
        <p>${ingredients.join("<br>")}</p>
        <h4>Instructions:</h4>
        <p>${recipeInstructions}</p>
      `;

      // Show the popup
      popup.style.display = "flex";
    })
    .catch((error) => console.log(error));
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

// Function to handle key press event for the second div
function handleKeyPress(event) {
  if (event.key === "Enter") {
    const searchInput = document.getElementById("search").value.trim();
    if (searchInput !== "") {
      const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => displayResults(data.meals))
        .catch((error) => console.log(error));
    }
  }
}

// Function to display search results for the second div
function displayResults(meals) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (meals) {
    meals.forEach((meal) => {
      // Create HTML elements for each meal
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");

      const dishName = document.createElement("h3");
      dishName.textContent = meal.strMeal;

      const dishImage = document.createElement("img");
      dishImage.src = meal.strMealThumb;
      dishImage.alt = meal.strMeal;

      const recipeButton = document.createElement("button");
      recipeButton.textContent = "Get Recipe";
      recipeButton.classList.add("recipe-button");
      recipeButton.addEventListener("click", () => displayRecipe(meal));

      // Append the elements to the results container
      mealDiv.appendChild(dishImage);
      mealDiv.appendChild(dishName);
      mealDiv.appendChild(recipeButton);

      resultsContainer.appendChild(mealDiv);
    });

    // Scroll to the results section
    resultsContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    resultsContainer.innerHTML = "<p>No results found</p>";
  }
}

// Function to display the recipe for a selected meal in the second div
function displayRecipe(meal) {
  const showup = document.getElementById("showup");
  const showupContent = document.getElementById("showup-content");
  const showupdishName = document.getElementById("showup-meal-name");
  const showupRecipe = document.getElementById("showup-recipe");

  // Set the meal name in the popup
  showupdishName.textContent = meal.strMeal;

  // Fetch the full recipe details for the selected meal
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
    .then((response) => response.json())
    .then((data) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals[0][`strIngredient${i}`];
        const measure = data.meals[0][`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${ingredient} - ${measure}`);
        }
      }

      const recipeInstructions = data.meals[0].strInstructions;

      // Display the ingredients and recipe instructions in the popup
      showupRecipe.innerHTML = `
        <h4>Ingredients:</h4>
        <p>${ingredients.join("<br>")}</p>
        <h4>Instructions:</h4>
        <p>${recipeInstructions}</p>
      `;

      // Show the popup
      showup.style.display = "flex";
    })
    .catch((error) => console.log(error));
}

// Function to close the popup in the second div
function closeshowup() {
  const showup = document.getElementById("showup");
  showup.style.display = "none";
}
