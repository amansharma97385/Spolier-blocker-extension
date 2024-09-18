// Function to inject CSS into the document
function injectCSS() {
    // Check if CSS has already been injected
    if (document.querySelector('#spoiler-styles')) return;
  
    const style = document.createElement('style');
    style.id = 'spoiler-styles';
    style.textContent = `
      /* Basic style for a warning message with fade-in and fade-out */
      .spoiler-warning {
        background-color: #ffdddd;
        color: #d9534f;
        font-weight: bold;
        padding: 10px;
        margin-bottom: 10px;
        border: 2px solid #d9534f;
        position: relative;
        z-index: 10;
        opacity: 0; /* Initially hidden */
        transition: opacity 1s ease-in-out; /* Smooth transition for fade-in and fade-out */
      }
  
      .spoiler-warning.fade-in {
        opacity: 1; /* Show element */
      }
  
      .spoiler-warning.fade-out {
        opacity: 0; /* Hide element */
      }
  
      /* Blur effect for spoiler content */
      .spoiler-blur {
        filter: blur(10px);
        position: relative;
        display: inline-block;
      }
  
      .spoiler-blur::after {
        content: 'Spoiler Blocked';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        z-index: 1;
      }
  
      /* Modal styles */
      .modal {
        display: none; 
        position: fixed;
        z-index: 1000; 
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
      }
  
      .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      }
  
      .modal-buttons {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
  
      .modal-buttons button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
  
      .btn-yes {
        background-color: #5cb85c;
        color: white;
      }
  
      .btn-no {
        background-color: #d9534f;
        color: white;
      }
  
      /* Styles for input modal */
      .keyword-input-modal {
        display: none;
        position: fixed;
        z-index: 1001;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
      }
  
      .keyword-input-modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      }
  
      .keyword-input-modal-content input {
        width: 80%;
        padding: 10px;
        margin-bottom: 10px;
        background-color: #f0f0f0; /* Input background color */
        color: #333; /* Input text color */
        border: 2px solid #ccc;
        border-radius: 5px;
      }
  
      .keyword-input-modal-content button {
        padding: 10px;
        background-color: #5cb85c;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Function to inject the modal HTML
  function injectModal() {
    const modal = document.createElement('div');
    modal.id = 'spoiler-modal';
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <p>Do you want to enter the Spoiler World and reveal the spoilers?</p>
        <div class="modal-buttons">
          <button class="btn-yes">Yes</button>
          <button class="btn-no">No</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  
    // Add event listeners for the buttons
    document.querySelector('.btn-yes').addEventListener('click', () => {
      revealSpoilers();
      closeModal();
    });
  
    document.querySelector('.btn-no').addEventListener('click', () => {
      closeModal();
    });
  }
  
  // Function to inject the keyword input modal HTML
  function injectKeywordInputModal() {
    const inputModal = document.createElement('div');
    inputModal.id = 'keyword-input-modal';
    inputModal.classList.add('keyword-input-modal');
    inputModal.innerHTML = `
      <div class="keyword-input-modal-content">
        <p>Please enter spoiler keywords (comma separated):</p>
        <input type="text" id="spoiler-keywords" placeholder="Enter keywords">
        <button id="save-keywords">Save</button>
      </div>
    `;
    document.body.appendChild(inputModal);
  
    document.getElementById('save-keywords').addEventListener('click', () => {
      saveKeywords();
      closeKeywordInputModal();
    });
  }
  
  // Function to show the keyword input modal
  function showKeywordInputModal() {
    const modal = document.getElementById('keyword-input-modal');
    modal.style.display = 'flex'; // Show the modal as a flexbox
  }
  
  // Function to close the keyword input modal
  function closeKeywordInputModal() {
    const modal = document.getElementById('keyword-input-modal');
    modal.style.display = 'none'; // Hide the modal
  }
  
  // Function to save the entered keywords
  function saveKeywords() {
    const input = document.getElementById('spoiler-keywords').value;
    if (input) {
      const keywords = input.split(',').map(keyword => keyword.trim());
      spoilerKeywords.push(...keywords);
      console.log('Spoiler keywords saved:', spoilerKeywords);
    }
  }
  
  // Function to show the modal
  function showModal() {
    const modal = document.getElementById('spoiler-modal');
    modal.style.display = 'flex'; // Show the modal (as flexbox to center content)
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('spoiler-modal');
    modal.style.display = 'none'; // Hide the modal
  }
  
  // Function to reveal spoilers (remove blur)
  function revealSpoilers() {
    const blurredElements = document.querySelectorAll('.spoiler-blur');
    blurredElements.forEach(element => {
      element.classList.remove('spoiler-blur');
    });
  }
  
  // Call the function to inject the CSS and modals
  injectCSS();
  injectModal();
  injectKeywordInputModal();
  
  // List of spoiler keywords (initially empty)
  let spoilerKeywords = [];
  
  // Function to scan the DOM for spoilers
  function checkForSpoilers() {
    // Find all elements that might contain spoilers (for example, Instagram captions)
    const posts = document.querySelectorAll('p, span, div');
  
    posts.forEach(post => {
      const postText = post.textContent.toLowerCase();
  
      // Check if the post contains any of the spoiler keywords
      spoilerKeywords.forEach(keyword => {
        if (postText.includes(keyword.toLowerCase())) {
          blockSpoiler(post);
        }
      });
    });
  }
  
  // Function to block or hide spoilers
  function blockSpoiler(element) {
    // Apply blur to the spoiler content
    element.classList.add('spoiler-blur');
    showModal(); // Show the modal asking the user
  }
  
  // Throttle function to prevent excessive load
  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  
  // Use a MutationObserver to catch dynamically loaded content
  const observer = new MutationObserver(throttle(() => {
    checkForSpoilers();
  }, 2000)); // Throttle the checkForSpoilers call
  
  // Observe changes to the body (for dynamically loaded posts)
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Initial check for spoilers
  checkForSpoilers();
  
  // Trigger the keyword input modal when needed (for example, on page load)
  showKeywordInputModal();
  