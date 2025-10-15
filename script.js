// ===================================
// 1. MOBILE NAVIGATION TOGGLE (Simplified)
// ===================================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Toggles the mobile menu open/closed
if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Closes the menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}));


// ===================================
// 2. ACTIVE NAVIGATION LINK HIGHLIGHTING
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    // Get the current file name (e.g., 'index.html') from the URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; 

    navLinks.forEach(link => {
        // Get the file name the link points to
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Adds 'active' class for styling
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            // Ensure no other links are active
            link.classList.remove('active');
        }
    });
});


// ===================================
// 3. SMOOTH SCROLL ANIMATIONS 
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});


// ===================================
// 4. FUNCTIONAL TRIP PLANNER FORM (for planner.html)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const plannerForm = document.querySelector('.planner-form');
    const resultsSection = document.querySelector('.results-section');

    if (plannerForm && resultsSection) {
        plannerForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const destinationInput = document.getElementById('destination');
            const peopleInput = document.getElementById('people');
            const budgetInput = document.getElementById('budget');

            if (!destinationInput || !peopleInput || !budgetInput) {
                console.error("Planner form inputs not found. Check if IDs (destination, people, budget) are correct in planner.html.");
                return;
            }
            
            const destination = destinationInput.value;
            const people = parseInt(peopleInput.value);
            const budget = parseFloat(budgetInput.value);

            if (!destination || isNaN(people) || people <= 0 || isNaN(budget) || budget <= 0) {
                resultsSection.innerHTML = `
                    <h2 style="color: #ff3333;">Oops!</h2>
                    <p>Please fill out all fields with valid information.</p>
                `;
                return;
            }

            const perPersonBudget = (budget / people).toFixed(2);
            let itinerarySuggestion = "Finding the best deals and routes for you!";
            
            if (budget < 1000) {
                itinerarySuggestion = "Focus on a **local outing** (Cafe/Movie/Quick Bite). Remember to check our <a href='discounts.html'>Local Vendor Discounts</a> for amazing deals in this area!";
            } else if (budget < 5000) {
                itinerarySuggestion = "Perfect for a **short weekend trip**. We'll suggest budget transport options and student-friendly stays.";
            } else {
                itinerarySuggestion = "Ideal for a **full itinerary trip/trek**. We'll include suggested travel routes, trusted local guides, and specialty highlights.";
            }

            resultsSection.innerHTML = `
                <h2>Your Trip Plan is Ready!</h2>
                <p><strong>Destination:</strong> ${destination}</p>
                <p><strong>Group Size:</strong> ${people} people</p>
                <p><strong>Total Budget:</strong> ₹${budget.toFixed(2)} (approx. ₹${perPersonBudget} per person)</p>
                <hr style="margin: 15px 0; border-top: 1px solid #ccc;">
                <p><strong>Itinerary Focus:</strong> ${itinerarySuggestion}</p>
            `;
        });
    }
});


// ===================================
// 5. HOMEPAGE CTA SIMULATION (Original Code for index.html)
// ===================================

function simulateTripPlanning() {
    if (document.title.includes("Homepage") || window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        
        const destination = prompt("Step 1/3: Enter your Destination (e.g., Manali, Local Cafe):");
        if (!destination) return;

        const peopleInput = prompt("Step 2/3: Enter number of people in your group (e.g., 3):");
        const people = parseInt(peopleInput);
        if (isNaN(people) || people <= 0) {
            alert("❌ Error: Please enter a valid number of people.");
            return;
        }

        const budgetInput = prompt("Step 3/3: Enter your total approximate budget (in ₹, e.g., 5000):");
        const budget = parseFloat(budgetInput);
        if (isNaN(budget) || budget <= 0) {
            alert("❌ Error: Please enter a valid budget.");
            return;
        }

        const perPersonBudget = (budget / people).toFixed(2);
        let itinerarySuggestion = "Finding the best deals and routes for you!";

        if (budget < 1000) {
            itinerarySuggestion = "Local outing plan (Cafe/Movie/Quick Bite). Check our **Local Vendor Discounts** for this area!";
        } else if (budget < 5000) {
            itinerarySuggestion = "Short weekend trip itinerary. Includes budget transport options and student-friendly stays.";
        } else {
            itinerarySuggestion = "Full itinerary for a long trip/trek. Includes suggested travel routes, trusted local guides, and specialty highlights.";
        }

        const results = `
          ✨ WALK TRIP PLANNER RESULTS ✨
          ---------------------------------
          Destination: ${destination}
          Group Size: ${people}
          Total Budget: ₹${budget.toFixed(2)}
          Budget Per Person: ₹${perPersonBudget}
          
          Your Custom Itinerary Focus: ${itinerarySuggestion}
          
          ✅ Next: You will now be taken to the full planner page!
          `;
        alert(results);
        return true; 
    }
    return false; 
}

document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector(".cta-button");
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            if (simulateTripPlanning()) {
                // If simulation succeeds, allow the default link action (e.preventDefault() removed)
            } else {
                // If not on homepage or simulation didn't run, allow default link behavior
            }
        });
    }
});
