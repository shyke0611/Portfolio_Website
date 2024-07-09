let currentSlide = 1; // Initialize the current slide number
const totalSlides = 5; // Total number of slides

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide % totalSlides) + 1; // Calculate the next slide number
    setTimeout(() => {
        document.getElementById(`s${currentSlide}`).checked = true; // Select the next slide
    }, 0);
    resetAutoSlide(); // Reset the auto-slide timer
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 2 + totalSlides) % totalSlides + 1; // Calculate the previous slide number
    setTimeout(() => {
        document.getElementById(`s${currentSlide}`).checked = true; // Select the previous slide
    }, 0);
    resetAutoSlide();
}

// Function to manually select a slide
function manualSlide(slideNumber) {
    currentSlide = slideNumber; // Set the current slide number to the selected slide
    setTimeout(() => {
        document.getElementById(`s${currentSlide}`).checked = true; // Select the slide
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
});

// Function to toggle the navigation menu
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show'); // Toggle the 'show' class to display or hide the menu
}

// Function to reset the auto-slide timer
function resetAutoSlide() {
    clearInterval(autoSlide); // Clear the existing interval
    autoSlide = setInterval(nextSlide, 5000); // Start a new interval
}

// Initialize auto-slide functionality
let autoSlide = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds

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
