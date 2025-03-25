document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Video Data (Replace with your actual YouTube videos)
    const videos = [
        {
            id: 'video1',
            title: 'Top 5 Laptops for Developers in 2023',
            thumbnail: 'assets/images/thumbnail-placeholder.jpg',
            views: '125K',
            date: '2 weeks ago',
            category: 'top10',
            youtubeUrl: 'https://youtube.com/watch?v=example1'
        },
        {
            id: 'video2',
            title: 'How to Build a Gaming PC - Step by Step Guide',
            thumbnail: 'assets/images/thumbnail-placeholder.jpg',
            views: '250K',
            date: '1 month ago',
            category: 'tutorials',
            youtubeUrl: 'https://youtube.com/watch?v=example2'
        },
        {
            id: 'video3',
            title: 'iPhone 15 Pro Max Review - Is It Worth It?',
            thumbnail: 'assets/images/thumbnail-placeholder.jpg',
            views: '500K',
            date: '2 months ago',
            category: 'reviews',
            youtubeUrl: 'https://youtube.com/watch?v=example3'
        },
        {
            id: 'video4',
            title: '10 VS Code Extensions Every Developer Needs',
            thumbnail: 'assets/images/thumbnail-placeholder.jpg',
            views: '300K',
            date: '3 months ago',
            category: 'top10',
            youtubeUrl: 'https://youtube.com/watch?v=example4'
        },
        {
            id: 'video5',
            title: 'Windows 11 Tips & Tricks You Should Know',
            thumbnail: 'assets/images/thumbnail-placeholder.jpg',
            views: '180K',
            date: '4 months ago',
            category: 'tutorials',
            youtubeUrl: 'https://youtube.com/watch?v=example5'
        },
        {
            id: 'video6',
            title: 'MacBook Pro M2 Review - Best Laptop for Creators?',
            thumbnail: 'assets/images/thumbnail-placeholder.jpg',
            views: '420K',
            date: '5 months ago',
            category: 'reviews',
            youtubeUrl: 'https://youtube.com/watch?v=example6'
        }
    ];

    // Featured Videos (first 3 videos)
    const featuredVideos = videos.slice(0, 3);
    const featuredVideosContainer = document.querySelector('.video-grid');

    // Display Featured Videos
    featuredVideos.forEach(video => {
        featuredVideosContainer.appendChild(createVideoCard(video));
    });

    // Video Category Filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    const videoContainer = document.querySelector('.video-container');
    let currentCategory = 'all';
    let visibleVideos = 6; // Initial number of videos to show

    // Display initial videos
    displayVideos();

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.dataset.category;
            
            // Reset visible videos count
            visibleVideos = 6;
            
            // Display filtered videos
            displayVideos();
        });
    });

    // Load More Videos
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', function() {
        visibleVideos += 3;
        displayVideos();
    });

    function displayVideos() {
        // Clear current videos
        videoContainer.innerHTML = '';
        
        // Filter videos based on category
        let filteredVideos = videos;
        if (currentCategory !== 'all') {
            filteredVideos = videos.filter(video => video.category === currentCategory);
        }
        
        // Display videos up to visibleVideos count
        const videosToShow = filteredVideos.slice(0, visibleVideos);
        
        if (videosToShow.length === 0) {
            videoContainer.innerHTML = '<p class="no-videos">No videos found in this category.</p>';
        } else {
            videosToShow.forEach(video => {
                videoContainer.appendChild(createVideoCard(video));
            });
        }
        
        // Show/Hide load more button
        if (visibleVideos >= filteredVideos.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Create Video Card Element
    function createVideoCard(video) {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <a href="${video.youtubeUrl}" target="_blank" class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <i class="fas fa-play play-icon"></i>
            </a>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span>${video.views} views</span>
                    <span>${video.date}</span>
                </div>
            </div>
        `;
        return videoCard;
    }

    // Animate Stats Counter
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }
    
    // Start counter animation when stats section is in view
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsSection);
        }
    });
    
    observer.observe(statsSection);

    // Form Submission Handling
    const newsletterForm = document.getElementById('newsletterForm');
    const contactForm = document.getElementById('contactForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        // Here you would typically send the data to your server
        alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
        this.reset();
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the data to your server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});