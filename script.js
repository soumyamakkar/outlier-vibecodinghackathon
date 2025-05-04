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

  // Set up show more buttons
  const showMoreBtns = document.querySelectorAll('.show-more-btn');
  
  showMoreBtns.forEach(btn => {
    // Initially show only 8 buttons (2 rows of 4)
    const categoryButtons = btn.previousElementSibling;
    const buttons = categoryButtons.querySelectorAll('.category-btn');
    
    // Hide buttons beyond the first 8
    for (let i = 8; i < buttons.length; i++) {
      buttons[i].style.display = 'none';
    }
    
    let expanded = false;
    
    btn.addEventListener('click', function() {
      if (!expanded) {
        // Show all buttons
        buttons.forEach(button => {
          button.style.display = '';
        });
        btn.innerHTML = 'Show Less <span class="dropdown-arrow" style="transform: rotate(180deg);">&#9660;</span>';
        expanded = true;
      } else {
        // Hide buttons beyond the first 8
        for (let i = 8; i < buttons.length; i++) {
          buttons[i].style.display = 'none';
        }
        btn.innerHTML = 'Show More <span class="dropdown-arrow">&#9660;</span>';
        expanded = false;
      }
    });
  });

  // Food carousel functionality
  setupFoodCarousel();
  
  // Outlets carousel functionality
  setupOutletsCarousel();

  // Add sticky header functionality
  setupStickyHeader();
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

// Function to set up food carousel
function setupFoodCarousel() {
  const carousel = document.querySelector('.food-items');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const progressContainer = document.querySelector('.scroll-progress-container');
  
  if (!carousel || !prevBtn || !nextBtn || !progressBar) return;
  
  // Initial check to disable prev button if at start
  checkScrollButtons();
  updateProgressBar();
  
  // Scroll left when clicking prev button
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -500, behavior: 'smooth' });
    setTimeout(() => {
      checkScrollButtons();
      updateProgressBar();
    }, 350); // Check after scroll animation
  });
  
  // Scroll right when clicking next button
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 500, behavior: 'smooth' });
    setTimeout(() => {
      checkScrollButtons();
      updateProgressBar();
    }, 350); // Check after scroll animation
  });
  
  // Check scroll position on scroll
  carousel.addEventListener('scroll', () => {
    checkScrollButtons();
    updateProgressBar();
  });
  
  // Disable/enable buttons based on scroll position
  function checkScrollButtons() {
    const isAtStart = carousel.scrollLeft <= 0;
    const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
    
    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
    
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
  }
  
  // Update progress bar based on scroll position
  function updateProgressBar() {
    const scrollPosition = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    if (maxScroll <= 0) return;
    
    // Calculate maximum translation distance
    const maxTranslation = progressContainer.clientWidth - progressBar.clientWidth;
    
    // Apply translation transform based on scroll percentage
    const translation = (scrollPosition / maxScroll) * maxTranslation;
    
    // Move the progress indicator from left to right
    progressBar.style.transform = `translateX(${translation}px)`;
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    checkScrollButtons();
    updateProgressBar();
  });
}

// Function to set up outlets carousel
function setupOutletsCarousel() {
  const carousel = document.querySelector('.outlets-items');
  const prevBtn = document.querySelector('.outlets-prev-btn');
  const nextBtn = document.querySelector('.outlets-next-btn');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const progressContainer = document.querySelector('.scroll-progress-container');
  
  if (!carousel || !prevBtn || !nextBtn || !progressBar || !progressContainer) return;
  
  // Initial check to disable prev button if at start and update progress bar
  checkScrollButtons();
  updateProgressBar();
  
  // Scroll left when clicking prev button
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -600, behavior: 'smooth' });
    setTimeout(() => {
      checkScrollButtons();
      updateProgressBar();
    }, 350); // Check after scroll animation
  });
  
  // Scroll right when clicking next button
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 600, behavior: 'smooth' });
    setTimeout(() => {
      checkScrollButtons();
      updateProgressBar();
    }, 350); // Check after scroll animation
  });
  
  // Check scroll position and update progress bar on scroll
  carousel.addEventListener('scroll', () => {
    checkScrollButtons();
    updateProgressBar();
    
    // Request animation frame for smoother updates during scrolling
    requestAnimationFrame(updateProgressBar);
  });
  
  // Disable/enable buttons based on scroll position
  function checkScrollButtons() {
    const isAtStart = carousel.scrollLeft <= 0;
    const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
    
    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
    
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
  }
  
  // Update progress bar based on scroll position
  function updateProgressBar() {
    const scrollPosition = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    if (maxScroll <= 0) return;
    
    // Calculate the position as a percentage
    const scrollPercentage = (scrollPosition / maxScroll);
    
    // Calculate maximum translation distance
    const maxTranslation = progressContainer.clientWidth - progressBar.clientWidth;
    
    // Apply translation transform based on scroll percentage
    const translation = maxTranslation * scrollPercentage;
    
    // Apply the transform - this moves the small bar from left to right
    progressBar.style.transform = `translateX(${translation}px)`;
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    checkScrollButtons();
    updateProgressBar();
  });
}

// Function to make header sticky after scrolling
function setupStickyHeader() {
  const header = document.getElementById('stickyHeader');
  if (!header) return;
  
  // Create a spacer element to prevent content jump when header becomes sticky
  const spacer = document.createElement('div');
  spacer.className = 'sticky-spacer';
  header.parentNode.insertBefore(spacer, header.nextSibling);
  
  // Get header height for the spacer
  const headerHeight = header.offsetHeight;
  
  // Set the threshold for when the header becomes sticky
  const scrollThreshold = 100; // Start sticky behavior after scrolling down 100px
  
  // Handle scroll event
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > scrollThreshold) {
      header.classList.add('sticky');
      spacer.classList.add('active');
      spacer.style.height = `${headerHeight}px`;
    } else {
      header.classList.remove('sticky');
      spacer.classList.remove('active');
      spacer.style.height = '0';
    }
  });
}

// Add this to your script.js file to make the navbar sticky only when reaching the tabs section

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header');
  const tabs = document.querySelector('.tabs');
  
  if (!header || !tabs) return;
  
  // Create a spacer element to prevent content jump when header becomes sticky
  const spacer = document.createElement('div');
  spacer.className = 'header-spacer';
  header.parentNode.insertBefore(spacer, header.nextSibling);
  
  // Function to update sticky state
  function updateStickyHeader() {
    // Get the position of the tabs element
    const tabsPosition = tabs.getBoundingClientRect().top;
    const headerHeight = header.offsetHeight;
    
    // If tabs are at or above the top of the viewport, make header sticky
    if (tabsPosition <= 0) {
      header.classList.add('sticky');
      spacer.style.height = headerHeight + 'px';
    } else {
      header.classList.remove('sticky');
      spacer.style.height = '0px';
    }
  }
  
  // Check on scroll
  window.addEventListener('scroll', updateStickyHeader);
  
  // Initial check
  updateStickyHeader();
  
  // Check on window resize
  window.addEventListener('resize', updateStickyHeader);
});
