// Optimized Scrollama setup
const scroller = scrollama();
const scroller2 = scrollama();

// Initialize scrollers
function initScrollers() {
  // Main text scroll animations
  scroller
    .setup({
      step: ".text",
      offset: 0.8,
    })
    .onStepEnter((response) => {
      const el = response.element;
      el.classList.add('visible');
    });

  // Progressive content for sticky section
  scroller2
    .setup({
      step: ".progressive",
      offset: 0.6,
    })
    .onStepEnter((response) => {
      const el = response.element;
      el.classList.add('visible');

      updateStickyContent(response.index);
    })
    .onStepExit((response) => {
      const el = response.element;
      if (response.direction === 'up') {
        el.classList.remove('visible');
      }
    });
}

// Enhanced sticky content function
function updateStickyContent(index) {
  const target = document.querySelector("#dynamic_sticky1 .aligner");

  if (!target) return;

  const content = [
    {
      title: "What Did Humanity Demand of Earth in 2024?",
      subtitle: "",
      content: '<div style="font-size: 4rem; color: #c20c0cff; font-weight: 800;">1.7 Earths</div>',
      type: 'symbol'
    },
    {
      title: "Global Ecological Deficit",
      subtitle: "Deficits vs Reserves",
      content: '<div id="counter" style="color: #c20c0cff;">1.1 global hectares per person</div>',
      type: 'counter'
    },
    {
      title: "Overshoot Date 2024",
      content: '<div style="font-size: 3rem; color: #c20c0cff; font-weight: 800;">August 1st</div>',
      type: 'date'
    }
  ];

  if (content[index]) {
    const item = content[index];
    target.innerHTML = `
      <h1>${item.title}</h1>
      ${item.content}
    `;

    // Add fade-in animation
    target.classList.add('fade-in');
    setTimeout(() => {
      target.classList.remove('fade-in');
    }, 800);
  }
}

// Navigation visibility controller
function initNavigation() {
  const navTitle = document.getElementById("navTitle");
  const mainTitle = document.getElementById("mainTitle");

  if (!navTitle || !mainTitle) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        navTitle.style.opacity = entry.isIntersecting ? 0 : 1;
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(mainTitle);
}



// Smooth loading for iframes
function initIframeLoading() {
  document.querySelectorAll('iframe').forEach(iframe => {
    // Set initial state
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.5s ease';

    // Show when loaded
    iframe.addEventListener('load', () => {
      iframe.style.opacity = '1';
    });

    // Error handling
    iframe.addEventListener('error', (e) => {
      console.warn('Failed to load iframe:', iframe.src);
      iframe.style.opacity = '0.5';
    });
  });
}

// Resize handler with throttling
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scroller.resize();
    scroller2.resize();
  }, 100);
}



// Utility function for smooth scrolling to elements
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Error handling wrapper
function safeExecute(fn, context = 'Unknown') {
  try {
    fn();
  } catch (error) {
    console.error(`Error in ${context}:`, error);
  }
}

// Main initialization
function init() {
  // Core functionality
  safeExecute(initScrollers, 'Scrollers');
  safeExecute(initNavigation, 'Navigation');
  safeExecute(initIframeLoading, 'Iframe Loading');


}

// Event listeners
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', handleResize);

// Prevent memory leaks on page unload
window.addEventListener('beforeunload', () => {
  scroller.destroy();
  scroller2.destroy();
});

// Optional: Expose utilities to global scope for debugging
if (typeof window !== 'undefined') {
  window.scrollyUtils = {
    scrollToElement,
    updateStickyContent,

  };
}