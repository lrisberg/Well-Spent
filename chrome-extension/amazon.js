(function() {
  // constants
  const newPurchaseUrl = 'https://wellspent.herokuapp.com/';

  function attachTrackHappinessButtons() {
    for (let orderElem of document.getElementsByClassName('a-box-group')) {
      for (let itemElem of orderElem.getElementsByClassName('a-fixed-left-grid')) {
        let trackHappinessButton = createButton();
        let topMiniElem = itemElem.getElementsByClassName('a-spacing-top-mini')[0];
        topMiniElem.appendChild(trackHappinessButton);
      }
    }
  }

  function createButton() {
      let aDecl = document.createElement('span')
      aDecl.classList.add('a-declarative');

      let aButton = document.createElement('span')
      aButton.classList.add('a-button');
      aDecl.appendChild(aButton);

      let aButtonInner = document.createElement('span')
      aButtonInner.classList.add('a-button-inner');
      aButton.appendChild(aButtonInner);

      let aButtonText = document.createElement('span')
      aButtonText.classList.add('a-button-text');
      aButtonText.innerText = "Track Happiness";
      aButtonInner.appendChild(aButtonText);

      aButton.onclick = function() {
          window.location = newPurchaseUrl;
      }

      return aDecl;
  }

  attachTrackHappinessButtons();
})();
