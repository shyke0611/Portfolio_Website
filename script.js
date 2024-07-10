let currentSlide = 1; // Initialize the current slide number
const totalSlides = 5; // Total number of slides

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide % totalSlides) + 1; // Calculate the next slide number
    setTimeout(() => {
        document.getElementById(`s${currentSlide}`).checked = true; // Select the next slide
        updateNavButtons(); // Update navigation buttons
    }, 0);
    resetAutoSlide(); // Reset the auto-slide timer
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 2 + totalSlides) % totalSlides + 1; // Calculate the previous slide number
    setTimeout(() => {
        document.getElementById(`s${currentSlide}`).checked = true; // Select the previous slide
        updateNavButtons();
    }, 0);
    resetAutoSlide();
}

// Function to manually select a slide
function manualSlide(slideNumber) {
    currentSlide = slideNumber; // Set the current slide number to the selected slide
    setTimeout(() => {
        document.getElementById(`s${currentSlide}`).checked = true; // Select the slide
        updateNavButtons()
    }, 0);
    resetAutoSlide(); 
}

// Add change event listeners to radio inputs to manually select slides
document.querySelectorAll('input[type="radio"]').forEach((radio, index) => {
    radio.addEventListener('change', () => manualSlide(index + 1));
});

// Add click event listeners to each slide
document.querySelectorAll('.slide').forEach((slide, index) => {
    slide.addEventListener('click', () => {
        // Check if the clicked slide is the main (active) slide
        if (document.getElementById(`s${index + 1}`).checked) {
            // Open the GitHub repository URL if it's the main slide
            openRepo(slide.getAttribute('data-repo-url'));
        } else {
            // Otherwise, make the clicked slide the main slide
            manualSlide(index + 1);
        }
    });

    // Pause auto rotate when hover
    slide.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    // Resume auto rotate when not hover
    slide.addEventListener('mouseleave', () => {
        resetAutoSlide(); 
    });
});

// Function to toggle the navigation menu
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show'); // Toggle the 'show' class to display or hide the menu
}

// Function to reset the auto-slide timer
function resetAutoSlide() {
    clearInterval(autoSlide); // Clear the existing interval
    autoSlide = setInterval(nextSlide, 3000); // Start a new interval
}

// Initialize auto-slide functionality
let autoSlide = setInterval(nextSlide, 3000); // Auto-slide every 5 seconds

// Function to update navigation buttons
function updateNavButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
        if (index + 1 === currentSlide) {
            btn.style.background = '#333';
            btn.style.border = '2px solid #fff';
            btn.style.transform = 'scale(1.2)';
        } else {
            btn.style.background = '#ddd';
            btn.style.border = 'none';
            btn.style.transform = 'scale(1)';
        }
    });
}

// Call updateNavButtons on initial load
updateNavButtons();

// Add event listeners for slide hover effects
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const radios = document.querySelectorAll('input[name="slider"]');

    // Add hover effects for the 'read more' link on the current slide
    slides.forEach((slide, index) => {
        slide.addEventListener('mouseenter', () => {
            if (radios[index].checked) {
                slide.querySelector('.read-more').style.opacity = '1'; // Show the 'read more' link
                slide.querySelector('.read-more').style.transform = 'translateX(0)'; // Move the 'read more' link into view
            }
        });

        slide.addEventListener('mouseleave', () => {
            if (radios[index].checked) {
                slide.querySelector('.read-more').style.opacity = '0'; // Hide the 'read more' link
                slide.querySelector('.read-more').style.transform = 'translateX(-20px)'; // Move the 'read more' link out of view
            }
        });
    });
});

// Function to open the GitHub repository
function openRepo(url) {
    window.open(url, '_blank'); // Open the URL in a new tab
}

// Function to show the loading for when user submits form
function showLoading() {
    document.body.classList.add('loading'); 
}

// sliding animation for each section

// attribution: https://www.youtube.com/watch?v=T33NN_pPeNI 

document.addEventListener('DOMContentLoaded', () => {
    // define options for the Intersection Observer
    const observerOptions = {
        rootMargin: '0px 0px -50px 0px'
    };

    // callback function when intersection event occurs
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // add show when the element is in view
                entry.target.classList.add('show');
            } else {
                // remove show class when the element is out of view
                entry.target.classList.remove('show');
            }
        });
    };

    // intersection observer instance with the callback function and options
    const observer = new IntersectionObserver(callback, observerOptions);

    // select all elements with the hidden class
    const elementsToObserve = document.querySelectorAll('.hidden');

    // observe each selected element
    elementsToObserve.forEach(element => observer.observe(element));
});



