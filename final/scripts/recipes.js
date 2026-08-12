
async function displayRecipes() {
  const container = document.querySelector('#recipe-container');

  try {
    const response = await fetch('./data/recipes.json');
    
    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo JSON: ${response.status}`);
    }

    const recipes = await response.json();

    container.innerHTML = '';

    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
        <h3>${recipe.title}</h3>
        <div class="macros">
          <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
          <p><strong>Calories:</strong> ${recipe.calories}</p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error al procesar las recetas:", error);
    container.innerHTML = '<p>Lo sentimos, las recetas no se pudieron cargar en este momento.</p>';
  }
}

displayRecipes();