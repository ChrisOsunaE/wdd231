let recipeList = [];

async function loadRecipes() {
  const container = document.querySelector('#recipe-container');
  if (!container) return;

  try {
    const response = await fetch('./data/recipes.json');
    recipeList = await response.json(); 
    container.innerHTML = ''; 

    recipeList.forEach((recipe, index) => {
      let cardSize = 'small';
      if (index % 3 === 0) {
        cardSize = 'large';
      }

      const card = document.createElement('article');
      card.className = `bento-card ${cardSize}`;

      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="card-img" loading="lazy">
        <div class="card-content">
          <h2 class="playfair">${recipe.title}</h2>
          <div class="tags">
            <span class="tag">🔥 ${recipe.calories}</span>
            <span class="tag">⏱ ${recipe.prepTime}</span>
            <span class="tag">🏷️ ${recipe.category}</span>
          </div>
          <div class="ingredients">
            <strong>Meal Info</strong>
            <p>Nutrient-dense ${recipe.category.toLowerCase()} designed for optimal batch prep.</p>
          </div>
          <button class="btn-outline view-recipe-btn">View Recipe</button>
        </div>
      `;

      const viewBtn = card.querySelector('.view-recipe-btn');
      viewBtn.addEventListener('click', () => {
        openModal(recipe);
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.log("Error loading recipes:", error);
  }
}

const recipeModal = document.querySelector('#recipe-modal');
const closeBtn = document.querySelector('#close-modal');

function openModal(recipe) {
  document.querySelector('#modal-title').textContent = recipe.title;
  document.querySelector('#modal-process').textContent = recipe.process;
  document.body.style.overflow = 'hidden';
  
  const ingredientsList = document.querySelector('#modal-ingredients');
  ingredientsList.innerHTML = '';
  
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  recipeModal.showModal();
}

closeBtn.addEventListener('click', () => {
  recipeModal.close();
  document.body.style.overflow = '';
});

loadRecipes();