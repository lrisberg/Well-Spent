(function() {
  // constants
  const newPurchaseUrl = 'https://wellspent.herokuapp.com/purchases/new';

  function attachTrackHappinessButtons() {
    for (let orderElem of document.getElementsByClassName('a-box-group')) {
      for (let itemElem of orderElem.getElementsByClassName('a-fixed-left-grid')) {
        const itemName = extractItemName(itemElem);
        const itemPrice = extractItemPrice(itemElem);

        let trackHappinessButton = createButton(itemName, itemPrice);
        let topMiniElem = itemElem.getElementsByClassName('a-spacing-top-mini')[0];
        topMiniElem.appendChild(trackHappinessButton);
      }
    }
  }

  function extractItemName(itemElem) {
    let name = itemElem.getElementsByClassName('a-link-normal')[1].innerText;
    return name;
  }

  function extractItemPrice(itemElem) {
    let price = itemElem.getElementsByClassName('a-color-price')[0].innerText;
    let priceValue = price.substring(1)
    return priceValue;
  }

  function createButton(name, price) {
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
          window.location = newPurchaseUrl + `?name=${name}&price=${price}`;
      }

      return aDecl;
  }

  attachTrackHappinessButtons();
})();
