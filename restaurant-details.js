document.addEventListener('DOMContentLoaded', function() {
  // Get restaurant ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get('id');
  
  if (!restaurantId) {
    window.location.href = 'index.html';
    return;
  }
  
  // Fetch restaurant data
  fetch('restaurants.json')
    .then(response => response.json())
    .then(data => {
      // Find the restaurant by ID
      const restaurant = data.restaurants.find(r => r.id === restaurantId);
      
      if (!restaurant) {
        window.location.href = 'index.html';
        return;
      }
      
      // Enhance the restaurant menu data with dietary information
      const enhancedRestaurant = enhanceMenuData(restaurant);
      
      // Populate the page with restaurant details
      populateRestaurantDetails(enhancedRestaurant);
    })
    .catch(error => {
      console.error('Error loading restaurant data:', error);
      window.location.href = 'index.html';
    });
});

// Modify the populateRestaurantDetails function to properly handle the container
function populateRestaurantDetails(restaurant) {
  // Update page title
  document.title = `${restaurant.name} - Swiggy Dineout`;

  // Get the restaurant container once
  const restaurantContainer = document.querySelector('.restaurant-container');
  if (!restaurantContainer) {
    console.error('Restaurant container not found in the DOM');
    return;
  }
  
  // Clear existing content
  restaurantContainer.innerHTML = '';
  
  // 2. Create header tabs for Dineout and Order Online
  const headerTabs = document.createElement('div');
  headerTabs.className = 'tabs';
  headerTabs.innerHTML = `
    <div class="tab">Order Online</div>
    <div class="tab active">Dineout</div>
  `;
  restaurantContainer.appendChild(headerTabs);
  
  // 3. Populate restaurant info card (white rectangular card with circular edges)
  const restaurantInfoCard = document.createElement('div');
  restaurantInfoCard.className = 'restaurant-info-card';
  
  // Apply the background image to the info card instead of the container
  restaurantInfoCard.style.backgroundImage = `url(${restaurant.image})`;
  restaurantInfoCard.style.backgroundSize = 'cover';
  restaurantInfoCard.style.backgroundPosition = 'center';
  restaurantInfoCard.style.position = 'relative';
  
  // Create an overlay div for the background to dim it
  const bgOverlay = document.createElement('div');
  bgOverlay.className = 'bg-overlay';
  restaurantInfoCard.appendChild(bgOverlay);
  
  // Calculate a random number for the ratings count (between 5k and 15k)
  const ratingsCount = (Math.floor(Math.random() * 100) + 50) / 10;
  const ratingsCountFormatted = ratingsCount + 'k+';
  
  // Create a content container to ensure text is above the overlay
  const infoContent = document.createElement('div');
  infoContent.className = 'restaurant-info-content';
  infoContent.innerHTML = `
    <h1 class="restaurant-name">${restaurant.name}</h1>
    <div class="restaurant-cuisine">${restaurant.cuisine}</div>
    <div class="restaurant-location">${restaurant.location}</div>
    
    <div class="restaurant-meta">
      <div class="meta-item">
        <div class="rating-badge">${restaurant.rating} ★</div>
        <div class="rating-count">Rated by ${ratingsCountFormatted}</div>
      </div>
      <div class="meta-divider"></div>
      <div class="meta-item">
        <div class="price-badge">${restaurant.price}</div>
        <div class="price-label">Cost for two</div>
      </div>
    </div>
  `;
  restaurantInfoCard.appendChild(infoContent);
  restaurantContainer.appendChild(restaurantInfoCard);
  
  // 4. Create timeline component
  const timelineComponent = document.createElement('div');
  timelineComponent.className = 'timeline-component';
  timelineComponent.innerHTML = `
    <div class="timeline-header">
      <div class="timeline-title">Outlet</div>
      <div class="timeline-subtitle">${restaurant.location}</div>
      <div class="timeline-dropdown">▾</div>
    </div>
    <div class="timeline-content">
      <div class="timeline-value">25-30 mins</div>
      <div class="timeline-info">Estimated delivery time</div>
    </div>
  `;
  restaurantContainer.appendChild(timelineComponent);

  // 5. Create Deals For You section
  const dealsSection = document.createElement('div');
  dealsSection.className = 'deals-section';
  
  dealsSection.innerHTML = `
    <div class="deals-header">
      <h2 class="deals-title">Deals For You</h2>
      <div class="deals-navigation">
        <button class="nav-arrow prev-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button class="nav-arrow next-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="deals-scroll-container">
      <div class="deals-container">
        <div class="deal-card">
          <div class="deal-image-container">
            <img src="./deals/deals1.avif" alt="Deal" class="deal-image">
          </div>
          <div class="deal-content">
            <div class="deal-header">Extra ₹20 Off</div>
            <div class="deal-subtext">APPLICABLE OVER & ABOVE COUPONS</div>
          </div>
        </div>
        <div class="deal-card">
          <div class="deal-image-container">
            <img src="./deals/deals2.avif" alt="Deal" class="deal-image">
          </div>
          <div class="deal-content">
            <div class="deal-header">Flat ₹150 Off</div>
            <div class="deal-subtext">USE FLATDEAL</div>
          </div>
        </div>
        <div class="deal-card">
          <div class="deal-image-container">
            <img src="./deals/deals3.avif" alt="Deal" class="deal-image">
          </div>
          <div class="deal-content">
            <div class="deal-header">Free Coke 330ml Can</div>
            <div class="deal-subtext">NO CODE REQUIRED</div>
          </div>
        </div>
        <div class="deal-card">
          <div class="deal-image-container">
            <img src="./deals/deals4.avif" alt="Deal" class="deal-image">
          </div>
          <div class="deal-content">
            <div class="deal-header">10% Off Upto ₹100</div>
            <div class="deal-subtext">USE RBLCC100</div>
          </div>
        </div>
        <div class="deal-card">
          <div class="deal-image-container">
            <img src="./deals/deals1.avif" alt="Deal" class="deal-image">
          </div>
          <div class="deal-content">
            <div class="deal-header">10% Off Upto ₹150</div>
            <div class="deal-subtext">USE HSBCFEST</div>
          </div>
        </div>
      </div>
    </div>
  `;
  restaurantContainer.appendChild(dealsSection);
  
  // 6. Create details layout
  const detailsLayout = document.createElement('div');
  detailsLayout.className = 'details-layout';

  // Create left column (about, gallery, menu, facilities)
  const leftColumn = document.createElement('div');
  leftColumn.className = 'details-left';

  // About section
  const aboutSection = document.createElement('div');
  aboutSection.className = 'about-section';
  aboutSection.innerHTML = `
    <h2 class="section-title">About</h2>
    <div class="about-content">${restaurant.details.about || "Information about this restaurant is not available at the moment."}</div>
  `;
  leftColumn.appendChild(aboutSection);

  // Menu section with enhanced UI
  const menuSection = document.createElement('div');
  menuSection.className = 'menu-section';
  
  // Build the menu HTML with data validation checks
  let menuHTML = `
    <div class="menu-header">
      <div class="menu-title-container">
        <svg aria-hidden="true" height="24" width="24" class="art-deco-svg">
          <path d="M1 12h9M1 7h5M1 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <div class="menu-title">MENU</div>
        <svg aria-hidden="true" height="24" width="24" class="art-deco-svg">
          <path d="M14 12h9M18 7h5M18 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
      
      <div class="menu-search-container">
        <input type="text" class="menu-search" placeholder="Search for dishes">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      <div class="menu-filters">
        <div class="diet-toggle">
          <button class="toggle-btn veg" data-filter="veg">
            <span class="veg-icon"></span>
            <span>Veg Only</span>
          </button>
          <button class="toggle-btn non-veg" data-filter="non-veg">
            <span class="non-veg-icon"></span>
            <span>Non-Veg</span>
          </button>
        </div>
        
        <button class="filter-btn bestseller-filter" data-filter="bestseller">
          <span class="filter-icon">★</span>
          <span>Bestseller</span>
        </button>
        
        <button class="filter-btn allergies-filter" data-filter="allergies">
          <span class="filter-icon">⚠️</span>
          <span>Specify Allergies</span>
          <div class="new-feature-badge">
            <span class="new-text">NEW</span>
          </div>
        </button>
      </div>
    </div>
    
    <div class="menu-categories">
  `;
  
  // Check if menu data exists and has items
  if (restaurant.details && restaurant.details.menu && restaurant.details.menu.length > 0) {
    // Process each menu category
    menuHTML += restaurant.details.menu.map((category, index) => `
      <div class="menu-category" data-category="${category.category ? category.category.toLowerCase().replace(/\s+/g, '-') : 'uncategorized'}">
        <div class="category-header">
          <h3 class="category-name">${category.category || 'Menu Items'}</h3>
          <span class="category-toggle">▼</span>
        </div>
        <div class="category-items ${index === 0 ? 'active' : ''}">
          ${category.items && category.items.length > 0 ? 
            category.items.map(item => `
              <div class="menu-item ${item.veg ? 'veg-item' : 'non-veg-item'} ${item.bestseller ? 'bestseller-item' : ''}"
                   data-spice-level="${item.dietary?.preferences?.spiceLevel || 0}"
                   data-oil-level="${item.dietary?.preferences?.oilContent || 0}"
                   data-allergens="${item.dietary?.allergens ? 
                      Object.entries(item.dietary.allergens)
                        .filter(([_, present]) => present)
                        .map(([name]) => name)
                        .join(',') : ''
                    }"
                   data-jain="${item.dietary?.religious?.jainFriendly || false}"
                   data-navratri="${item.dietary?.religious?.navratriFriendly || false}"
                   data-fasting="${item.dietary?.preferences?.fasting || false}"
                   data-onion-garlic="${item.dietary?.preferences?.onionGarlic || false}"
                   data-vegan="${item.dietary?.vegan || false}">
                <div class="item-content">
                  <div class="item-header">
                    <div class="item-name">
                      <span class="${item.veg ? 'veg-indicator' : 'non-veg-indicator'}"></span>
                      ${item.name || 'Unnamed Item'}
                      ${item.bestseller ? '<span class="bestseller-tag">★ Bestseller</span>' : ''}
                      ${item.dietary?.vegan ? '<span class="diet-tag vegan-tag">Vegan</span>' : ''}
                      ${item.dietary?.religious?.jainFriendly ? '<span class="diet-tag jain-tag">Jain</span>' : ''}
                      ${item.dietary?.preferences?.fasting ? '<span class="diet-tag fasting-tag">Fasting</span>' : ''}
                    </div>
                    <div class="item-price">${item.price || '₹0'}</div>
                  </div>
                  <div class="item-offers">
                    <div class="offer-tag">₹150 OFF USE FLATDEAL</div>
                  </div>
                  <div class="item-description">
                    ${item.detailedDescription || `Double the flavor with our signature sauce. Indulge in this delicious ${item.name ? item.name.toLowerCase() : 'dish'} with fresh ingredients and exotic spices.`}
                    <span class="description-more">more ...</span>
                  </div>
                  <div class="item-allergens">
                    <div class="allergen-list">
                      ${item.dietary?.allergens ? 
                        Object.entries(item.dietary.allergens)
                          .filter(([_, present]) => present)
                          .map(([allergen]) => `<span class="allergen-tag">${allergen}</span>`)
                          .join('') : ''
                      }
                    </div>
                  </div>
                </div>
                <div class="item-image-container">
                  <img src="${item.image || (restaurant.details.images && restaurant.details.images.length > 0 ? restaurant.details.images[0] : 'placeholder-dish.png')}" alt="${item.name || 'Menu item'}" class="item-image">
                </div>
              </div>
            `).join('') : '<div class="no-items-message">No items available in this category</div>'
          }
        </div>
      </div>
    `).join('');
  } else {
    menuHTML += '<div class="no-menu-message">Menu information is not available at this time.</div>';
  }
  
  // Close menu-categories div
  menuHTML += '</div>';
  
  // Add allergies dialog
  menuHTML += `
    <!-- Allergies Dialog -->
    <div class="allergies-dialog" id="allergiesDialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>Customize Your Dietary Preferences</h3>
          <button class="close-dialog">&times;</button>
        </div>
        <div class="dialog-body">
          <div class="allergy-tabs">
            <button class="allergy-tab active" data-tab="allergies">Allergies</button>
            <button class="allergy-tab" data-tab="preferences">Preferences</button>
            <button class="allergy-tab" data-tab="religious">Religious</button>
          </div>
          
          <div class="allergy-tab-content active" data-tab-content="allergies">
            <div class="preference-intro">
              <p>Select ingredients you're allergic to or want to avoid</p>
            </div>
            <div class="allergy-options">
              <div class="allergy-option">
                <input type="checkbox" id="dairy" class="allergy-checkbox">
                <label for="dairy">Dairy</label>
              </div>
              <div class="allergy-option">
                <input type="checkbox" id="nuts" class="allergy-checkbox">
                <label for="nuts">Nuts</label>
              </div>
              <div class="allergy-option">
                <input type="checkbox" id="gluten" class="allergy-checkbox">
                <label for="gluten">Gluten</label>
              </div>
              <div class="allergy-option">
                <input type="checkbox" id="shellfish" class="allergy-checkbox">
                <label for="shellfish">Shellfish</label>
              </div>
              <div class="allergy-option">
                <input type="checkbox" id="soy" class="allergy-checkbox">
                <label for="soy">Soy</label>
              </div>
              <div class="allergy-option">
                <input type="checkbox" id="eggs" class="allergy-checkbox">
                <label for="eggs">Eggs</label>
              </div>
            </div>
          </div>
          
          <div class="allergy-tab-content" data-tab-content="preferences">
            <div class="preference-intro">
              <p>Set your preferences for these ingredients</p>
            </div>
            <div class="preference-sliders">
              <div class="preference-item">
                <div class="preference-header">
                  <span class="preference-name">Spicy Food</span>
                  <span class="preference-value">Moderate</span>
                </div>
                <div class="preference-scale">
                  <input type="range" min="1" max="5" value="3" class="preference-slider" id="spicy-slider">
                  <div class="scale-labels">
                    <span>None</span>
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Spicy</span>
                    <span>Very Spicy</span>
                  </div>
                </div>
              </div>
              
              <div class="preference-item">
                <div class="preference-header">
                  <span class="preference-name">Onion & Garlic</span>
                  <span class="preference-value">Preferred</span>
                </div>
                <div class="preference-scale">
                  <input type="range" min="1" max="5" value="4" class="preference-slider" id="onion-garlic-slider">
                  <div class="scale-labels">
                    <span>None</span>
                    <span>Minimal</span>
                    <span>Some</span>
                    <span>Preferred</span>
                    <span>Extra</span>
                  </div>
                </div>
              </div>
              
              <div class="preference-item">
                <div class="preference-header">
                  <span class="preference-name">Oil Content</span>
                  <span class="preference-value">Low</span>
                </div>
                <div class="preference-scale">
                  <input type="range" min="1" max="5" value="2" class="preference-slider" id="oil-slider">
                  <div class="scale-labels">
                    <span>Minimal</span>
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>Rich</span>
                    <span>Extra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="allergy-tab-content" data-tab-content="religious">
            <div class="preference-intro">
              <p>Select religious or cultural dietary restrictions</p>
            </div>
            <div class="diet-options">
              <div class="diet-option">
                <input type="radio" name="diet-type" id="all" class="diet-radio" checked>
                <label for="all">
                  <div class="diet-name">No Restrictions</div>
                  <div class="diet-desc">All food types shown</div>
                </label>
              </div>
              <div class="diet-option">
                <input type="radio" name="diet-type" id="jain" class="diet-radio">
                <label for="jain">
                  <div class="diet-name">Jain Diet</div>
                  <div class="diet-desc">No root vegetables, onion, garlic or potatoes</div>
                </label>
              </div>
              <div class="diet-option">
                <input type="radio" name="diet-type" id="navratri" class="diet-radio">
                <label for="navratri">
                  <div class="diet-name">Navratri Special</div>
                  <div class="diet-desc">Rock salt, no onion, garlic or regular salt</div>
                </label>
              </div>
              <div class="diet-option">
                <input type="radio" name="diet-type" id="halal" class="diet-radio">
                <label for="halal">
                  <div class="diet-name">Halal</div>
                  <div class="diet-desc">Halal-certified meat and ingredients</div>
                </label>
              </div>
              <div class="diet-option">
                <input type="radio" name="diet-type" id="kosher" class="diet-radio">
                <label for="kosher">
                  <div class="diet-name">Kosher</div>
                  <div class="diet-desc">Kosher-certified food options</div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="cancel-btn">Cancel</button>
          <button class="apply-btn">Apply</button>
          <div class="diet-preferences-info">
            <span class="info-icon">ⓘ</span>
            <span class="info-text">Your preferences will personalize menu recommendations</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Set the menu section HTML
  menuSection.innerHTML = menuHTML;
  leftColumn.appendChild(menuSection);

  // Facilities section (if available)
  if (restaurant.details && restaurant.details.facilities && restaurant.details.facilities.length > 0) {
    const facilitiesSection = document.createElement('div');
    facilitiesSection.className = 'facilities-section';
    facilitiesSection.innerHTML = `
      <h2 class="section-title">Facilities</h2>
      <div class="facilities-list">
        ${restaurant.details.facilities.map(facility => 
          `<div class="facility">${facility}</div>`
        ).join('')}
      </div>
    `;
    leftColumn.appendChild(facilitiesSection);
  }

  // Create right column (info card, offers, book table)
  const rightColumn = document.createElement('div');
  rightColumn.className = 'details-right';

  // Restaurant info card
  const infoCard = document.createElement('div');
  infoCard.className = 'info-card';
  infoCard.innerHTML = `
    <div class="info-card-header">
      <div class="info-card-title">Restaurant Info</div>
    </div>
    <div class="info-card-body">
      <div class="info-item">
        <div class="info-icon">📍</div>
        <div class="info-content">
          <div class="info-label">Address</div>
          <div class="address-content">${restaurant.details && restaurant.details.address ? restaurant.details.address : restaurant.location}</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">🕒</div>
        <div class="info-content">
          <div class="info-label">Opening Hours</div>
          <div class="hours-content">${restaurant.details && restaurant.details.openingHours ? restaurant.details.openingHours : '11:00 AM - 11:00 PM'}</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">📞</div>
        <div class="info-content">
          <div class="info-label">Phone</div>
          <div class="phone-content">${restaurant.details && restaurant.details.phone ? restaurant.details.phone : '+91 9876543210'}</div>
        </div>
      </div>
    </div>
  `;
  rightColumn.appendChild(infoCard);

  // Offers card
  const offersCard = document.createElement('div');
  offersCard.className = 'offers-card';
  offersCard.innerHTML = `
    <div class="offers-card-header">
      <div class="offers-card-title">Offers</div>
    </div>
    <div class="offers-card-body">
      ${restaurant.offers && restaurant.offers.length > 0 ? 
        restaurant.offers.map(offer => `
          <div class="offer-item">
            <div class="offer-icon">${offer.icon}</div>
            <div class="offer-content">${offer.text}</div>
          </div>
        `).join('') : '<div class="no-offers">No offers available at the moment</div>'
      }
    </div>
  `;
  rightColumn.appendChild(offersCard);

  // Book table button
  const bookTableBtn = document.createElement('a');
  bookTableBtn.href = "#";
  bookTableBtn.className = "book-table-btn";
  bookTableBtn.textContent = "Book a Table";
  rightColumn.appendChild(bookTableBtn);

  // Add columns to layout
  detailsLayout.appendChild(leftColumn);
  detailsLayout.appendChild(rightColumn);
  
  // Add the details layout to the container
  restaurantContainer.appendChild(detailsLayout);
  
  // Initialize interactive elements
  setupMenuInteractions();
  setupDealsCarousel();
  setupNavbar();
  setupAllergiesDialog(); // Add this line
  
  // Log confirmation
  console.log("Restaurant details populated successfully:", restaurant.name);
  
  // When creating menu items, add the button to each item's image container
  // Look for this part in your code where you create menu items:
  
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(menuItem => {
    const imageContainer = menuItem.querySelector('.item-image-container');
    if (imageContainer && !imageContainer.querySelector('.add-dish-btn')) {
      const addButton = document.createElement('button');
      addButton.className = 'add-dish-btn';
      addButton.textContent = 'ADD +';
      imageContainer.appendChild(addButton);
      
      // Add click event for the button
      addButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Visual feedback
        this.textContent = "ADDED ✓";
        this.classList.add('added');
        
        // Reset after animation
        setTimeout(() => {
          this.textContent = "ADD +";
          this.classList.remove('added');
        }, 1500);
      });
    }
  });
}

function setupDealsCarousel() {
  const dealsContainer = document.querySelector('.deals-container');
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  const scrollContainer = document.querySelector('.deals-scroll-container');
  
  if (!dealsContainer || !prevArrow || !nextArrow || !scrollContainer) return;
  
  // Calculate visible width
  const containerWidth = scrollContainer.clientWidth;
  
  // Scroll amount (distance to scroll per click)
  const scrollStep = containerWidth * 0.8; // 80% of visible width
  
  // Update arrow visibility based on scroll position
  function updateArrows() {
    const maxScrollLeft = dealsContainer.scrollWidth - scrollContainer.clientWidth;
    
    // Enable/disable left arrow based on scroll position
    prevArrow.disabled = scrollContainer.scrollLeft <= 0;
    prevArrow.classList.toggle('disabled', prevArrow.disabled);
    
    // Enable/disable right arrow based on scroll position
    nextArrow.disabled = scrollContainer.scrollLeft >= maxScrollLeft - 10;
    nextArrow.classList.toggle('disabled', nextArrow.disabled);
  }
  
  // Initial arrow state
  updateArrows();
  
  // Previous button click handler
  prevArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -scrollStep,
      behavior: 'smooth'
    });
  });
  
  // Next button click handler
  nextArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: scrollStep,
      behavior: 'smooth'
    });
  });
  
  // Update arrows when scrolling stops
  scrollContainer.addEventListener('scroll', () => {
    updateArrows();
  });
}

function setupMenuInteractions() {
  // Toggle menu categories
  const categoryHeaders = document.querySelectorAll('.category-header');
  categoryHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const items = header.nextElementSibling;
      const toggle = header.querySelector('.category-toggle');
      
      items.classList.toggle('active');
      toggle.textContent = items.classList.contains('active') ? '▼' : '►';
    });
  });
  
  // Toggle veg/non-veg filters
  const dietButtons = document.querySelectorAll('.toggle-btn');
  dietButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      applyFilters();
    });
  });
  
  // Bestseller filter toggle
  const bestsellerBtn = document.querySelector('.bestseller-filter');
  bestsellerBtn.addEventListener('click', () => {
    bestsellerBtn.classList.toggle('active');
    
    if (bestsellerBtn.classList.contains('active')) {
      // Add cross icon
      const crossSpan = document.createElement('span');
      crossSpan.className = 'filter-cross';
      crossSpan.innerHTML = '&times;';
      bestsellerBtn.appendChild(crossSpan);
    } else {
      // Remove cross icon
      const cross = bestsellerBtn.querySelector('.filter-cross');
      if (cross) bestsellerBtn.removeChild(cross);
    }
    
    applyFilters();
  });
  
  // Allergies dialog
  const allergiesBtn = document.querySelector('.allergies-filter');
  const allergiesDialog = document.getElementById('allergiesDialog');
  const closeDialogBtn = document.querySelector('.close-dialog');
  const cancelBtn = document.querySelector('.cancel-btn');
  const applyBtn = document.querySelector('.apply-btn');
  
  allergiesBtn.addEventListener('click', () => {
    allergiesDialog.classList.add('active');
    // Initialize tab view
    setupAllergiesDialog();
  });
  
  closeDialogBtn.addEventListener('click', () => {
    allergiesDialog.classList.remove('active');
  });
  
  cancelBtn.addEventListener('click', () => {
    allergiesDialog.classList.remove('active');
  });
  
  applyBtn.addEventListener('click', () => {
    allergiesDialog.classList.remove('active');
    allergiesBtn.classList.add('active');
    
    if (!allergiesBtn.querySelector('.filter-cross')) {
      const crossSpan = document.createElement('span');
      crossSpan.className = 'filter-cross';
      crossSpan.innerHTML = '&times;';
      allergiesBtn.appendChild(crossSpan);
    }
    
    // Get preference values to use for filtering
    const selectedDiet = document.querySelector('input[name="diet-type"]:checked').id;
    const spicyLevel = document.getElementById('spicy-slider').value;
    const onionGarlicLevel = document.getElementById('onion-garlic-slider').value;
    const oilLevel = document.getElementById('oil-slider').value;
    
    // Get allergy selections
    const selectedAllergies = [];
    document.querySelectorAll('.allergy-checkbox:checked').forEach(checkbox => {
      selectedAllergies.push(checkbox.id);
    });
    
    console.log('Applied preferences:', {
      diet: selectedDiet,
      spicy: spicyLevel,
      onionGarlic: onionGarlicLevel,
      oil: oilLevel,
      allergies: selectedAllergies
    });
    
    applyFilters();
  });
  
  // Show more description
  const moreLinks = document.querySelectorAll('.description-more');
  moreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const description = link.parentElement;
      description.classList.toggle('expanded');
      link.textContent = description.classList.contains('expanded') ? 'less' : 'more ...';
    });
  });
  
  // Function to apply all active filters
  function applyFilters() {
    const vegActive = document.querySelector('.toggle-btn.veg.active');
    const nonVegActive = document.querySelector('.toggle-btn.non-veg.active');
    const bestsellerActive = document.querySelector('.bestseller-filter.active');
    const allergiesActive = document.querySelector('.allergies-filter.active');
    
    const items = document.querySelectorAll('.menu-item');
    
    // Get allergy preferences if the filter is active
    let allergensToAvoid = [];
    let selectedDiet = 'all';
    let minSpiceLevel = 1;
    let maxSpiceLevel = 5;
    let onionGarlicAllowed = true;
    let maxOilLevel = 5;
    
    if (allergiesActive) {
      // Get allergens to avoid
      document.querySelectorAll('#allergiesDialog .allergy-checkbox:checked').forEach(checkbox => {
        allergensToAvoid.push(checkbox.id);
      });
      
      // Get religious diet preference
      selectedDiet = document.querySelector('input[name="diet-type"]:checked')?.id || 'all';
      
      // Get spice level preference (only filter if the slider was adjusted)
      const spiceSlider = document.getElementById('spicy-slider');
      if (spiceSlider && spiceSlider.getAttribute('data-adjusted') === 'true') {
        maxSpiceLevel = parseInt(spiceSlider.value);
      }
      
      // Get onion & garlic preference
      const onionGarlicSlider = document.getElementById('onion-garlic-slider');
      if (onionGarlicSlider && parseInt(onionGarlicSlider.value) < 2) {
        onionGarlicAllowed = false;
      }
      
      // Get oil content preference
      const oilSlider = document.getElementById('oil-slider');
      if (oilSlider && oilSlider.getAttribute('data-adjusted') === 'true') {
        maxOilLevel = parseInt(oilSlider.value);
      }
    }
    
    items.forEach(item => {
      let shouldShow = true;
      
      // Diet filter (veg/non-veg)
      if (vegActive && !item.classList.contains('veg-item')) shouldShow = false;
      if (nonVegActive && !item.classList.contains('non-veg-item')) shouldShow = false;
      
      // Bestseller filter
      if (bestsellerActive && !item.classList.contains('bestseller-item')) shouldShow = false;
      
      // Apply dietary filters if allergies filter is active
      if (allergiesActive && shouldShow) {
        // Check allergens
        const itemAllergens = item.dataset.allergens.split(',').filter(a => a);
        if (allergensToAvoid.some(allergen => itemAllergens.includes(allergen))) {
          shouldShow = false;
        }
        
        // Check religious diet
        if (selectedDiet === 'jain' && item.dataset.jain !== 'true') shouldShow = false;
        if (selectedDiet === 'navratri' && item.dataset.navratri !== 'true') shouldShow = false;
        if (selectedDiet === 'halal' && item.dataset.halal !== 'true' && !item.classList.contains('veg-item')) shouldShow = false;
        if (selectedDiet === 'kosher' && item.dataset.kosher !== 'true' && !item.classList.contains('veg-item')) shouldShow = false;
        
        // Check spice level
        const spiceLevel = parseInt(item.dataset.spiceLevel);
        if (spiceLevel > maxSpiceLevel) shouldShow = false;
        
        // Check onion & garlic
        if (!onionGarlicAllowed && item.dataset.onionGarlic === 'true') shouldShow = false;
        
        // Check oil content
        const oilLevel = parseInt(item.dataset.oilLevel);
        if (oilLevel > maxOilLevel) shouldShow = false;
      }
      
      // Apply visibility
      item.style.display = shouldShow ? 'flex' : 'none';
    });
    
    // Check if no items are visible and show a message
    const visibleItems = document.querySelectorAll('.menu-item[style="display: flex;"]');
    const noResultsMsg = document.querySelector('.no-results-message') || document.createElement('div');
    
    if (visibleItems.length === 0) {
      noResultsMsg.className = 'no-results-message';
      noResultsMsg.textContent = 'No items match your dietary preferences. Try adjusting your filters.';
      
      const menuSection = document.querySelector('.menu-section');
      if (!document.querySelector('.no-results-message') && menuSection) {
        menuSection.appendChild(noResultsMsg);
      }
    } else if (document.querySelector('.no-results-message')) {
      document.querySelector('.no-results-message').remove();
    }
  }
}

// Enhanced allergies dialog functionality
function setupAllergiesDialog() {
  // Tab functionality
  const allergyTabs = document.querySelectorAll('.allergy-tab');
  const tabContents = document.querySelectorAll('.allergy-tab-content');
  
  allergyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      allergyTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      const tabName = tab.getAttribute('data-tab');
      tab.classList.add('active');
      document.querySelector(`.allergy-tab-content[data-tab-content="${tabName}"]`).classList.add('active');
    });
  });
  
  // Handle preference sliders
  const preferenceSliders = document.querySelectorAll('.preference-slider');
  
  preferenceSliders.forEach(slider => {
    const valueDisplay = slider.parentElement.previousElementSibling.querySelector('.preference-value');
    const scaleLabels = slider.nextElementSibling.querySelectorAll('span');
    
    // Update value display when slider changes
    slider.addEventListener('input', () => {
      const valueIndex = parseInt(slider.value) - 1;
      valueDisplay.textContent = scaleLabels[valueIndex].textContent;
      
      // Mark slider as adjusted
      slider.setAttribute('data-adjusted', 'true');
    });
  });
}

// Call this function after the dialog is created
setupAllergiesDialog();

// This function will generate the enhanced menu data structure
// Add this function where appropriate in your code, maybe after the populateRestaurantDetails function

function enhanceMenuData(restaurant) {
  // Make sure menu exists
  if (!restaurant.details.menu) return restaurant;
  
  // Process each menu category
  restaurant.details.menu.forEach(category => {
    // Process each menu item
    category.items.forEach(item => {
      // Add detailed dietary information
      item.dietary = {
        // Basic indicators
        veg: item.veg || false,
        vegan: Math.random() > 0.7, // Random assignment for demo
        
        // Allergy information
        allergens: {
          dairy: !item.veg || Math.random() > 0.5,
          nuts: Math.random() > 0.7,
          gluten: Math.random() > 0.3,
          shellfish: !item.veg && Math.random() > 0.6,
          soy: Math.random() > 0.5, 
          eggs: !item.veg && Math.random() > 0.5
        },
        
        // Religious/cultural preferences
        religious: {
          jainFriendly: item.veg && Math.random() > 0.7,
          navratriFriendly: item.veg && Math.random() > 0.6,
          halal: !item.veg ? Math.random() > 0.5 : null,
          kosher: !item.veg ? Math.random() > 0.6 : null
        },
        
        // Preferences
        preferences: {
          spiceLevel: Math.floor(Math.random() * 5) + 1, // 1-5 scale
          onionGarlic: item.veg ? (Math.random() > 0.3 ? true : false) : true,
          oilContent: Math.floor(Math.random() * 5) + 1, // 1-5 scale
          fasting: item.veg && Math.random() > 0.7
        }
      };
      
      // Add detailed description with allergen information
      item.detailedDescription = generateDetailedDescription(item);
    });
  });
  
  return restaurant;
}

// Helper function to generate realistic menu descriptions
function generateDetailedDescription(item) {
  const descriptions = [
    `Our signature ${item.name.toLowerCase()} made with ${item.veg ? 'fresh vegetables' : 'premium quality meat'} and exotic spices. ${item.dietary.preferences.spiceLevel > 3 ? 'Prepared with a spicy twist' : 'Mild and flavorful'}.`,
    `Indulge in this delicious ${item.name.toLowerCase()} with ${item.dietary.preferences.onionGarlic ? 'aromatic onion and garlic' : 'special herbs'} and house-made sauce.`,
    `A crowd favorite! Our ${item.name.toLowerCase()} is ${item.dietary.preferences.oilContent < 3 ? 'light and healthy' : 'rich and indulgent'} with authentic flavors.`,
    `Experience the perfect blend of spices in our ${item.name.toLowerCase()}, made with ${item.veg ? 'seasonal vegetables' : 'tender meat'} and chef's special recipe.`
  ];
  
  // Pick a random description
  const baseDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  // Add allergen information
  const allergens = [];
  for (const [allergen, present] of Object.entries(item.dietary.allergens)) {
    if (present) allergens.push(allergen);
  }
  
  let allergenText = '';
  if (allergens.length > 0) {
    allergenText = `Allergens: Contains ${allergens.join(', ')}.`;
  } else {
    allergenText = 'Allergen-free.';
  }
  
  // Add special diet indicators
  const dietLabels = [];
  if (item.dietary.vegan) dietLabels.push('Vegan');
  if (item.dietary.religious.jainFriendly) dietLabels.push('Jain-friendly');
  if (item.dietary.religious.navratriFriendly) dietLabels.push('Navratri special');
  if (item.dietary.preferences.fasting) dietLabels.push('Fasting-friendly');
  
  let dietText = '';
  if (dietLabels.length > 0) {
    dietText = `Suitable for: ${dietLabels.join(', ')}.`;
  }
  
  return `${baseDesc} ${allergenText} ${dietText}`;
}

// Update the setupNavbar function
function setupNavbar() {
  // Add hover effect to navbar items and the address selector
  const navbarItems = document.querySelectorAll('.navbar-item');
  const addressSelector = document.querySelector('.address-selector');
  
  // Handle navbar items hover
  navbarItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icons = this.querySelectorAll('i');
      icons.forEach(icon => {
        icon.style.color = '#FF5200';
      });
      const texts = this.querySelectorAll('span');
      texts.forEach(text => {
        text.style.color = '#FF5200';
      });
    });
    
    item.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        const icons = this.querySelectorAll('i');
        icons.forEach(icon => {
          icon.style.color = '';
        });
        const texts = this.querySelectorAll('span');
        texts.forEach(text => {
          text.style.color = '';
        });
      }
    });
  });
  
  // Handle address selector hover separately since it's now in a different location
  if (addressSelector) {
    addressSelector.addEventListener('mouseenter', function() {
      const icons = this.querySelectorAll('i');
      icons.forEach(icon => {
        icon.style.color = '#FF5200';
      });
      const addressText = this.querySelector('.address-text');
      if (addressText) addressText.style.color = '#FF5200';
    });
    
    addressSelector.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        const icons = this.querySelectorAll('i');
        icons.forEach(icon => {
          icon.style.color = '';
        });
        const addressText = this.querySelector('.address-text');
        if (addressText) addressText.style.color = '#3d4152';
        const addressDetails = this.querySelector('.address-details');
        if (addressDetails) addressDetails.style.color = '#686b78';
      }
    });
  }
}

// Add this function to handle the allergies dialog
function setupAllergiesDialog() {
  const allergiesButton = document.querySelector('.allergies-filter');
  const allergiesDialog = document.getElementById('allergiesDialog');
  const closeButton = allergiesDialog.querySelector('.close-dialog');
  const cancelButton = allergiesDialog.querySelector('.cancel-btn');
  const applyButton = allergiesDialog.querySelector('.apply-btn');
  const allergiesTabButtons = allergiesDialog.querySelectorAll('.allergy-tab');
  const allergiesTabContents = allergiesDialog.querySelectorAll('.allergy-tab-content');
  const allergyCheckboxes = allergiesDialog.querySelectorAll('.allergy-checkbox');
  const dietRadios = allergiesDialog.querySelectorAll('.diet-radio');
  const preferenceSliders = allergiesDialog.querySelectorAll('.preference-slider');
  
  // State to track if filter is active
  let isFilterActive = false;
  
  // Open dialog when clicking the filter button
  if (allergiesButton) {
    allergiesButton.addEventListener('click', function() {
      allergiesDialog.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when dialog is open
    });
  }
  
  // Function to close dialog
  function closeDialog() {
    allergiesDialog.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Close dialog when clicking the close button
  if (closeButton) {
    closeButton.addEventListener('click', closeDialog);
  }
  
  // Close dialog when clicking cancel button without applying changes
  if (cancelButton) {
    cancelButton.addEventListener('click', closeDialog);
  }
  
  // Close dialog and apply filters when clicking apply button
  if (applyButton) {
    applyButton.addEventListener('click', function() {
      // Update the filter active state
      isFilterActive = hasActiveFilters();
      
      // Update UI to show filter is active
      if (isFilterActive) {
        allergiesButton.classList.add('active');
        allergiesButton.innerHTML = `
          <span class="filter-icon">⚠️</span>
          <span>Allergy Filters On</span>
          <span class="filter-cross">×</span>
        `;
      } else {
        allergiesButton.classList.remove('active');
        allergiesButton.innerHTML = `
          <span class="filter-icon">⚠️</span>
          <span>Specify Allergies</span>
          <div class="new-feature-badge">
            <span class="new-text">NEW</span>
          </div>
        `;
      }
      
      // Actually apply the filters to the menu items (simplified implementation)
      applyFiltersToMenu();
      
      // Close the dialog
      closeDialog();
    });
  }
  
  // Handle tab switching
  allergiesTabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      // Update active tab button
      allergiesTabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update active tab content
      allergiesTabContents.forEach(content => {
        if (content.getAttribute('data-tab-content') === tabName) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
  
  // Add click handler for the cross button to reset filters
  if (allergiesButton) {
    allergiesButton.addEventListener('click', function(event) {
      // Check if the click was on the cross button
      if (event.target.classList.contains('filter-cross')) {
        event.stopPropagation(); // Prevent opening the dialog
        
        // Reset all filters
        resetAllFilters();
        
        // Update button state
        allergiesButton.classList.remove('active');
        allergiesButton.innerHTML = `
          <span class="filter-icon">⚠️</span>
          <span>Specify Allergies</span>
          <div class="new-feature-badge">
            <span class="new-text">NEW</span>
          </div>
        `;
        
        // Reset menu filtering
        clearFiltersFromMenu();
        
        return false;
      }
    });
  }
  
  // Helper function to check if any filters are active
  function hasActiveFilters() {
    const anyCheckboxChecked = Array.from(allergyCheckboxes).some(cb => cb.checked);
    const anyNonDefaultRadioSelected = Array.from(dietRadios).some(radio => radio.id !== 'all' && radio.checked);
    const anySliderNotDefault = Array.from(preferenceSliders).some(slider => slider.value != slider.defaultValue);
    
    return anyCheckboxChecked || anyNonDefaultRadioSelected || anySliderNotDefault;
  }
  
  // Helper function to reset all filters
  function resetAllFilters() {
    // Reset checkboxes
    allergyCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset radios to default "all" option
    dietRadios.forEach(radio => {
      if (radio.id === 'all') {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });
    
    // Reset sliders to default values
    preferenceSliders.forEach(slider => {
      slider.value = slider.defaultValue;
      
      // Also update the displayed value
      const valueDisplay = slider.closest('.preference-item').querySelector('.preference-value');
      if (valueDisplay) {
        const values = ['None', 'Mild', 'Moderate', 'Spicy', 'Very Spicy'];
        if (slider.id === 'spicy-slider') {
          valueDisplay.textContent = values[slider.value - 1];
        } else if (slider.id === 'onion-garlic-slider') {
          const values = ['None', 'Minimal', 'Some', 'Preferred', 'Extra'];
          valueDisplay.textContent = values[slider.value - 1];
        } else if (slider.id === 'oil-slider') {
          const values = ['Minimal', 'Low', 'Moderate', 'Rich', 'Extra'];
          valueDisplay.textContent = values[slider.value - 1];
        }
      }
    });
  }
  
  // Apply filters to menu items
  function applyFiltersToMenu() {
    // Get all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Collect active filters
    const activeAllergies = Array.from(allergyCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.id);
    
    const activeDiet = Array.from(dietRadios)
      .find(radio => radio.checked)?.id;
    
    const spiceLevel = document.getElementById('spicy-slider')?.value;
    const onionGarlicPreference = document.getElementById('onion-garlic-slider')?.value;
    const oilPreference = document.getElementById('oil-slider')?.value;
    
    // Apply filters to each menu item
    menuItems.forEach(item => {
      let shouldHide = false;
      
      // Check allergies
      if (activeAllergies.length > 0) {
        const itemAllergens = item.getAttribute('data-allergens');
        if (itemAllergens) {
          const allergensList = itemAllergens.split(',');
          if (activeAllergies.some(allergy => allergensList.includes(allergy))) {
            shouldHide = true;
          }
        }
      }
      
      // Check diet
      if (activeDiet && activeDiet !== 'all') {
        const isJain = item.getAttribute('data-jain') === 'true';
        const isNavratri = item.getAttribute('data-navratri') === 'true';
        
        if ((activeDiet === 'jain' && !isJain) ||
            (activeDiet === 'navratri' && !isNavratri)) {
          shouldHide = true;
        }
      }
      
      // Show or hide the item
      if (shouldHide) {
        item.style.display = 'none';
      } else {
        item.style.display = '';
      }
    });
    
    // Check if any items are visible in each category
    document.querySelectorAll('.menu-category').forEach(category => {
      const visibleItems = category.querySelectorAll('.menu-item:not([style*="display: none"])');
      if (visibleItems.length === 0) {
        // If no visible items, hide the category
        category.style.display = 'none';
      } else {
        // Otherwise show it
        category.style.display = '';
      }
    });
  }
  
  // Clear all filters from menu
  function clearFiltersFromMenu() {
    // Show all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
      item.style.display = '';
    });
    
    // Show all categories
    document.querySelectorAll('.menu-category').forEach(category => {
      category.style.display = '';
    });
  }
  
  // Update slider value displays
  preferenceSliders.forEach(slider => {
    const valueDisplay = slider.closest('.preference-item').querySelector('.preference-value');
    
    slider.addEventListener('input', function() {
      if (slider.id === 'spicy-slider') {
        const values = ['None', 'Mild', 'Moderate', 'Spicy', 'Very Spicy'];
        valueDisplay.textContent = values[this.value - 1];
      } else if (slider.id === 'onion-garlic-slider') {
        const values = ['None', 'Minimal', 'Some', 'Preferred', 'Extra'];
        valueDisplay.textContent = values[this.value - 1];
      } else if (slider.id === 'oil-slider') {
        const values = ['Minimal', 'Low', 'Moderate', 'Rich', 'Extra'];
        valueDisplay.textContent = values[this.value - 1];
      }
    });
  });
}

// Add this to your existing initialization code
document.addEventListener('DOMContentLoaded', function() {
  // Other initialization functions...
  
  // Setup allergies dialog
  setupAllergiesDialog();
});

// Additionally, add this function to handle dynamically created menu items
function setupMenuItemAddButtons() {
  // Find all menu item image containers that don't have an ADD button yet
  const imageContainers = document.querySelectorAll('.item-image-container:not(:has(.add-dish-btn))');
  
  imageContainers.forEach(container => {
    // Create and add the button
    const addButton = document.createElement('button');
    addButton.className = 'add-dish-btn';
    addButton.textContent = 'ADD +';
    container.appendChild(addButton);
    
    // Add click event handler
    addButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Visual feedback
      this.textContent = "ADDED ✓";
      this.classList.add('added');
      
      // Reset after animation
      setTimeout(() => {
        this.textContent = "ADD +";
        this.classList.remove('added');
      }, 1500);
    });
  });
}

// Call this function at the end of your document ready handler
document.addEventListener('DOMContentLoaded', function() {
  // Your existing initialization code...
  
  // Set up a MutationObserver to watch for new menu items being added
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // Check if we need to add buttons to new menu items
        setupMenuItemAddButtons();
      }
    });
  });
  
  // Start observing the container where menu items will be loaded
  const menuContainer = document.querySelector('.restaurant-container');
  if (menuContainer) {
    observer.observe(menuContainer, { 
      childList: true, 
      subtree: true 
    });
  }
  
  // Also run initially to catch any existing menu items
  setTimeout(setupMenuItemAddButtons, 1000);
});