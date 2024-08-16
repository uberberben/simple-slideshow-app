async function fetchImages() {
    const response = await fetch('/images');
    const images = await response.json();
    return images;
}

function createSlide(src) {
    const slide = document.createElement('div');
    slide.className = 'mySlides fade';
    const img = document.createElement('img');
    img.src = `images/${src}`;
    slide.appendChild(img);
    return slide;
}

async function showSlides(timeout) {
    const slideshowContainer = document.getElementById('slideshow-container');
    const images = await fetchImages();
    images.forEach(image => {
        const slide = createSlide(image);
        slideshowContainer.appendChild(slide);
    });

    let slideIndex = 0;
    function displaySlides() {
        const slides = document.getElementsByClassName('mySlides');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(displaySlides, timeout); // Use the timeout parameter
    }
    displaySlides();
}

// Fetch the timeout value from the server
fetch('/timeout')
    .then(response => response.json())
    .then(data => showSlides(data.timeout));
