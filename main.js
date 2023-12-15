async function getRandomRecipe() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const meal = data.meals[0];

    const randomGeneratorDiv = document.querySelector(".random-generator");
    const mealImage = randomGeneratorDiv.querySelector(".meal-image");
    const mealName = randomGeneratorDiv.querySelector(".meal-name");
    const viewRecipeBtn = randomGeneratorDiv.querySelector(".view-recipe-btn");
    const popup = randomGeneratorDiv.querySelector(".popup");
    const popupMealName = randomGeneratorDiv.querySelector(".popup-meal-name");
    const mealInstructions =
      randomGeneratorDiv.querySelector(".meal-instructions");
    const ingredientsList =
      randomGeneratorDiv.querySelector(".ingredients-list");
    const sourceLink = randomGeneratorDiv.querySelector(".source-link");
    const closeBtn = randomGeneratorDiv.querySelector(".close-btn");

    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealName.textContent = meal.strMeal;

    viewRecipeBtn.addEventListener("click", () => {
      popupMealName.textContent = meal.strMeal;
      mealInstructions.textContent = meal.strInstructions;

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      ingredientsList.innerHTML = ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("");

      sourceLink.href = meal.strSource;

      popup.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      popup.classList.remove("show");
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getRandomRecipe();

// second div codes
function handleKeyPress(event) {
  if (event.key === "Enter") {
    const searchInput = document.getElementById("search").value.trim();
    if (searchInput !== "") {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
      )
        .then((response) => response.json())
        .then((data) => displayResults(data.meals))
        .catch((error) => console.log(error));
    }
  }
}

function displayResults(meals) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (meals) {
    meals.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");

      const mealName = document.createElement("h3");
      mealName.textContent = meal.strMeal;

      const mealImage = document.createElement("img");
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;

      const recipeButton = document.createElement("button");
      recipeButton.textContent = "Get Recipe";
      recipeButton.classList.add("recipe-button");
      recipeButton.addEventListener("click", () => displayRecipe(meal));

      mealDiv.appendChild(mealImage);
      mealDiv.appendChild(mealName);
      mealDiv.appendChild(recipeButton);

      resultsContainer.appendChild(mealDiv);
    });

    // Scroll to the results section
    resultsContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    resultsContainer.innerHTML = "<p>No results found</p>";
  }
}

function displayRecipe(meal) {
  const popup = document.getElementById("popup");
  const popupMealName = document.getElementById("popup-meal-name");
  const popupRecipe = document.getElementById("popup-recipe");

  popupMealName.textContent = meal.strMeal;

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

      // Display ingredients and recipe
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

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

//get recipe
function handleKeyPress(event) {
  if (event.key === "Enter") {
    const searchInput = document.getElementById("search").value.trim();
    if (searchInput !== "") {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
      )
        .then((response) => response.json())
        .then((data) => displayResults(data.meals))
        .catch((error) => console.log(error));
    }
  }
}

function displayResults(meals) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (meals) {
    meals.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");

      const mealName = document.createElement("h3");
      mealName.textContent = meal.strMeal;

      const mealImage = document.createElement("img");
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;

      const recipeButton = document.createElement("button");
      recipeButton.textContent = "Get Recipe";
      recipeButton.classList.add("recipe-button");
      recipeButton.addEventListener("click", () => displayRecipe(meal));

      mealDiv.appendChild(mealImage);
      mealDiv.appendChild(mealName);
      mealDiv.appendChild(recipeButton);

      resultsContainer.appendChild(mealDiv);
    });
    // Scroll to the results section
    resultsContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    resultsContainer.innerHTML = "<p>No results found</p>";
  }
}

function displayRecipe(meal) {
  const showup = document.getElementById("showup");
  const showupContent = document.getElementById("showup-content");
  const showupMealName = document.getElementById("showup-meal-name");
  const showupRecipe = document.getElementById("showup-recipe");

  showupMealName.textContent = meal.strMeal;

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

      // Display ingredients and recipe
      showupRecipe.innerHTML = `
        <h4>Ingredients:</h4>
        <p>${ingredients.join("<br>")}</p>
        <h4>Instructions:</h4>
        <p>${recipeInstructions}</p>
      `;
      // Show the showup
      showup.style.display = "flex";
    })
    .catch((error) => console.log(error));
}

function closeshowup() {
  const showup = document.getElementById("showup");
  showup.style.display = "none";
}
