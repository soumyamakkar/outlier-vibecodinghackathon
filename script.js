// Toggle active tab
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Load restaurant data from JSON
  fetch('restaurants.json')
    .then(response => response.json())
    .then(data => {
      // Render initial visible restaurants (first 12)
      renderRestaurants(data.restaurants.slice(0, 12), document.querySelector('.restaurant-grid'));
      
      // Render hidden restaurants (next 9)
      renderRestaurants(data.restaurants.slice(12, 21), document.querySelector('.hidden-restaurants'));

      // Add click handlers to all restaurant cards after they're rendered
      setupRestaurantCardClickHandlers();
    })
    .catch(error => console.error('Error loading restaurant data:', error));

  // See more button functionality
  const seeMoreBtn = document.querySelector('.see-more-btn');
  const hiddenRestaurants = document.querySelector('.hidden-restaurants');
  
  seeMoreBtn.addEventListener('click', () => {
    hiddenRestaurants.classList.toggle('active');
    seeMoreBtn.textContent = hiddenRestaurants.classList.contains('active') ? 'See Less' : 'See More';
    
    if (hiddenRestaurants.classList.contains('active')) {
      window.scrollBy({
        top: 200,
        behavior: 'smooth'
      });
    }
  });

  // Toggle text expansion for the discovery section
  const seeMoreTextBtn = document.getElementById('see-more-text');
  const hiddenText = document.getElementById('hidden-text');
  
  seeMoreTextBtn.addEventListener('click', function() {
    if (hiddenText.style.display === 'inline' || hiddenText.style.display === '') {
      hiddenText.style.display = 'none';
      seeMoreTextBtn.textContent = 'see more';
    } else {
      hiddenText.style.display = 'inline';
      seeMoreTextBtn.textContent = 'see less';
    }
  });
});

// Function to render restaurant cards
function renderRestaurants(restaurants, container) {
  container.innerHTML = ''; // Clear the container first
  
  restaurants.forEach(restaurant => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.dataset.id = restaurant.id; // Store the restaurant ID for click handling
    
    card.innerHTML = `
      <div class="restaurant-image">
        <img src="${restaurant.image}" alt="${restaurant.name}">
        <div class="discount-tag">${restaurant.discount}</div>
      </div>
      <div class="restaurant-details">
        <div class="restaurant-name">${restaurant.name}</div>
        <div class="cuisine">${restaurant.cuisine}</div>
        <div class="restaurant-meta">
          <div class="rating">${restaurant.rating} ★</div>
          <div class="price">${restaurant.price}</div>
        </div>
        <div class="restaurant-info">
          <div class="location">${restaurant.location}</div>
          <div class="distance">${restaurant.distance}</div>
        </div>
        <div class="offers">
          ${restaurant.offers.map(offer => 
            `<div class="offer"><span class="offer-icon">${offer.icon}</span> ${offer.text}</div>`
          ).join('')}
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// Function to set up click handlers for restaurant cards
function setupRestaurantCardClickHandlers() {
  const restaurantCards = document.querySelectorAll('.restaurant-card');
  
  restaurantCards.forEach(card => {
    card.addEventListener('click', () => {
      const restaurantId = card.dataset.id;
      window.location.href = `restaurant-details.html?id=${restaurantId}`;
    });
    
    // Add cursor pointer to make it clear it's clickable
    card.style.cursor = 'pointer';
  });
}
