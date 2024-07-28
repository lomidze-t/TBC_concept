//menu button
document.querySelector('.menu-button').addEventListener('click', function() {
    const div = document.querySelector('.expandable-buttons');
    const icon = this.querySelector('svg'); 
    
    if (div.classList.contains('hidden')) {
       
        div.classList.remove('hidden');
        div.classList.add('show');
        
        icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
    } else {

        div.classList.remove('show');
        div.classList.add('hidden');
        
        icon.innerHTML = '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>';
    }
});

//contact us button
// JavaScript to toggle form visibility
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-button'); // ID of the button that triggers the form
  const formContainer = document.getElementById('form-container'); // ID of the form container

  toggleButton.addEventListener('click', () => {
    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
      formContainer.style.display = 'block'; // Show the form
    } else {
      formContainer.style.display = 'none'; // Hide the form
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const fullname = document.getElementById('fullname');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const terms = document.getElementById('terms');
    const submitButton = document.getElementById('submitButton');
    const wordCount = document.getElementById('wordCount');
    const successMessage = document.getElementById('successMessage');
    const errorMessages = {
        fullname: document.getElementById('fullnameError'),
        phone: document.getElementById('phoneError'),
        email: document.getElementById('emailError'),
        message: document.getElementById('messageError')
    };

    
    message.addEventListener('input', () => {
        wordCount.textContent = `${message.value.length}/100 words`;
    });

    
    const validateForm = () => {
        let isValid = true;
        
        [fullname, phone, email, message].forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                errorMessages[field.id].classList.add('active');
            } else {
                field.classList.remove('error');
                errorMessages[field.id].classList.remove('active');
            }
        });

        
        if (!terms.checked) {
            isValid = false;
        }

        submitButton.disabled = !isValid;
        submitButton.classList.toggle('enabled', isValid);
    };

    
    form.addEventListener('input', validateForm);
    terms.addEventListener('change', validateForm);

    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        successMessage.classList.add('active');
        form.reset();
        validateForm(); 
    });

    
    window.closeForm = () => {
        form.reset();
        validateForm(); 
        successMessage.classList.remove('active');
    };
});

//navbar options

//terms and conditions

//privacy

//slides
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const swiperContainer = document.getElementById('swiperContainer');
    const swiperLine = document.querySelector('.swiper-line');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    const cardCount = cards.length;
    const visibleCards = 3;
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
  
    if (cardCount <= visibleCards) {
      swiperContainer.style.display = 'none';
    }
  
    const updateSwiper = () => {
      const swiperPosition = (currentIndex / (cardCount - visibleCards)) * 100;
      swiperLine.style.left = `${swiperPosition}%`;
    };
  
    const moveCarousel = (index) => {
      const offset = -index * (100 / visibleCards);
      carousel.style.transform = `translateX(${offset}%)`;
      updateSwiper();
  
      prevArrow.disabled = index === 0;
      nextArrow.disabled = index >= cardCount - visibleCards;
    };
  
    prevArrow.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        moveCarousel(currentIndex);
      }
    });
  
    nextArrow.addEventListener('click', () => {
      if (currentIndex < cardCount - visibleCards) {
        currentIndex++;
        moveCarousel(currentIndex);
      }
    });
  
    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startPos = e.clientX;
      carousel.style.transition = 'none';
      animationID = requestAnimationFrame(animation);
    });
  
    carousel.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const currentPosition = e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
        setCarouselPosition();
      }
    });
  
    carousel.addEventListener('mouseup', () => {
      isDragging = false;
      cancelAnimationFrame(animationID);
      carousel.style.transition = 'transform 0.5s ease';
      setPositionByIndex();
    });
  
    carousel.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        cancelAnimationFrame(animationID);
        carousel.style.transition = 'transform 0.5s ease';
        setPositionByIndex();
      }
    });
  
    carousel.addEventListener('touchstart', (e) => {
      isDragging = true;
      startPos = e.touches[0].clientX;
      carousel.style.transition = 'none';
      animationID = requestAnimationFrame(animation);
    });
  
    carousel.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
        setCarouselPosition();
      }
    });
  
    carousel.addEventListener('touchend', () => {
      isDragging = false;
      cancelAnimationFrame(animationID);
      carousel.style.transition = 'transform 0.5s ease';
      setPositionByIndex();
    });
  
    const setCarouselPosition = () => {
      carousel.style.transform = `translateX(${currentTranslate}px)`;
    };
  
    const setPositionByIndex = () => {
      const movedBy = currentTranslate - prevTranslate;
  
      if (movedBy < -100 && currentIndex < cardCount - visibleCards) {
        currentIndex++;
      }
  
      if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
      }
  
      moveCarousel(currentIndex);
      prevTranslate = currentIndex * (-100 / visibleCards);
      currentTranslate = prevTranslate;
    };
  
    const animation = () => {
      setCarouselPosition();
      if (isDragging) requestAnimationFrame(animation);
    };
  
    moveCarousel(currentIndex);
  });
  
//