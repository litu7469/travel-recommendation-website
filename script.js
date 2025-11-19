// Travel Recommendation Data
const travelData = {
    countries: [
        {
            name: "Australia",
            cities: [
                {
                    name: "Sydney, Australia",
                    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500",
                    description: "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge.",
                    timezone: "Australia/Sydney"
                },
                {
                    name: "Melbourne, Australia",
                    imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=500",
                    description: "A cultural hub famous for its art, food, music, and diverse neighborhoods.",
                    timezone: "Australia/Melbourne"
                }
            ]
        },
        {
            name: "Japan",
            cities: [
                {
                    name: "Tokyo, Japan",
                    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500",
                    description: "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture.",
                    timezone: "Asia/Tokyo"
                },
                {
                    name: "Kyoto, Japan",
                    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500",
                    description: "Known for its historic temples, traditional gardens, and beautiful geisha districts.",
                    timezone: "Asia/Tokyo"
                }
            ]
        },
        {
            name: "Brazil",
            cities: [
                {
                    name: "Rio de Janeiro, Brazil",
                    imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500",
                    description: "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic Christ the Redeemer statue.",
                    timezone: "America/Sao_Paulo"
                },
                {
                    name: "São Paulo, Brazil",
                    imageUrl: "https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3?w=500",
                    description: "The financial hub of Brazil with diverse culture, world-class museums, and vibrant nightlife.",
                    timezone: "America/Sao_Paulo"
                }
            ]
        }
    ],
    temples: [
        {
            name: "Angkor Wat, Cambodia",
            imageUrl: "https://images.unsplash.com/photo-1563640214-e7e6e75d9ec2?w=500",
            description: "A UNESCO World Heritage site and the largest religious monument in the world, showcasing stunning Khmer architecture.",
            timezone: "Asia/Phnom_Penh"
        },
        {
            name: "Taj Mahal, India",
            imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500",
            description: "An iconic symbol of love and a masterpiece of Mughal architecture, built with white marble.",
            timezone: "Asia/Kolkata"
        }
    ],
    beaches: [
        {
            name: "Bora Bora, French Polynesia",
            imageUrl: "https://images.unsplash.com/photo-1589197331516-8c7b1e5c6a3c?w=500",
            description: "An island paradise known for its stunning turquoise lagoons, overwater bungalows, and incredible marine life.",
            timezone: "Pacific/Tahiti"
        },
        {
            name: "Copacabana Beach, Brazil",
            imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500",
            description: "One of the world's most famous beaches with golden sands, vibrant atmosphere, and stunning ocean views.",
            timezone: "America/Sao_Paulo"
        }
    ]
};

// Function to get local time for a timezone
function getLocalTime(timezone) {
    try {
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return new Date().toLocaleTimeString('en-US', options);
    } catch (error) {
        return 'Time not available';
    }
}

// Function to search destinations
function searchDestinations() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsSection = document.getElementById('resultsSection');
    const resultsTitle = document.getElementById('resultsTitle');
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    
    // Clear previous results
    recommendationsContainer.innerHTML = '';
    
    if (!searchInput) {
        resultsTitle.textContent = 'Please enter a search term';
        return;
    }
    
    let results = [];
    let searchType = '';
    
    // Check if searching for beaches
    if (searchInput.includes('beach')) {
        results = travelData.beaches;
        searchType = 'Beach';
    }
    // Check if searching for temples
    else if (searchInput.includes('temple')) {
        results = travelData.temples;
        searchType = 'Temple';
    }
    // Check if searching for countries
    else if (searchInput.includes('country') || searchInput.includes('countries') || 
             searchInput.includes('australia') || searchInput.includes('japan') || 
             searchInput.includes('brazil')) {
        // Find matching country
        const country = travelData.countries.find(c => 
            c.name.toLowerCase().includes(searchInput) || 
            searchInput.includes(c.name.toLowerCase())
        );
        
        if (country) {
            results = country.cities;
            searchType = 'Country';
        } else {
            // Show all countries if no specific match
            results = travelData.countries.flatMap(c => c.cities);
            searchType = 'Country';
        }
    }
    // General search across all destinations
    else {
        const allDestinations = [
            ...travelData.beaches,
            ...travelData.temples,
            ...travelData.countries.flatMap(c => c.cities)
        ];
        
        results = allDestinations.filter(dest => 
            dest.name.toLowerCase().includes(searchInput)
        );
        searchType = 'Search';
    }
    
    // Display results
    if (results.length > 0) {
        resultsTitle.textContent = `${searchType} Recommendations`;
        
        results.forEach(destination => {
            const card = createDestinationCard(destination);
            recommendationsContainer.appendChild(card);
        });
    } else {
        resultsTitle.textContent = 'No results found';
        recommendationsContainer.innerHTML = '<p style="text-align: center; color: #666; font-size: 1.2rem;">Try searching for "beaches", "temples", or "countries"</p>';
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to create destination card
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    
    const localTime = destination.timezone ? getLocalTime(destination.timezone) : null;
    
    card.innerHTML = `
        <img src="${destination.imageUrl}" alt="${destination.name}">
        <div class="card-content">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            ${localTime ? `<div class="local-time">🕒 Local Time: ${localTime}</div>` : ''}
        </div>
    `;
    
    return card;
}

// Function to clear results
function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('resultsTitle').textContent = '';
    document.getElementById('recommendationsContainer').innerHTML = '';
}

// Add event listener for Enter key on search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchDestinations();
            }
        });
    }
});

// Update time every second for displayed destinations
setInterval(function() {
    const timeElements = document.querySelectorAll('.local-time');
    timeElements.forEach((element, index) => {
        // This would update times, but requires storing timezone info
        // For now, times are static after search
    });
}, 1000);
