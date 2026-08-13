async function loadFeaturedRecipes() {
  const container = document.querySelector('#featured-container');
  if (!container) return;

  try {
    const response = await fetch('./data/recipes.json');
    if (!response.ok) throw new Error('No se pudo cargar el archivo de recetas.');
    
    const recipes = await response.json();

    const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 2);

    container.innerHTML = '';

    randomRecipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'featured-card';

      card.innerHTML = `
        <div class="featured-img-wrapper">
          <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
          <span class="recipe-badge">${recipe.category}</span>
        </div>
        <div class="featured-info">
          <h3>${recipe.title}</h3>
          <p class="recipe-desc">Delicious, nutrient-dense batch meal designed to optimize your weekly nutrition and save you time.</p>
          <hr>
          <div class="recipe-meta">
            <span>⏱️ ${recipe.prepTime}</span>
            <span>🔥 ${recipe.calories}</span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando recetas destacadas:", error);
  }
}

loadFeaturedRecipes();