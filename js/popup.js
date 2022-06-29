function init() {
  document.addEventListener('DOMContentLoaded', () => {
    const excludeGapInvestmentCheckbox = document.getElementById('excludeGapInvestmentCheckbox');
    excludeGapInvestmentCheckbox.addEventListener('change', (event) => onCheckboxChanged(excludeGapInvestmentCheckbox, event));
    changeGapInvestmentCheckboxStatus(excludeGapInvestmentCheckbox);
  });
}

function onCheckboxChanged(excludeGapInvestmentCheckbox, event) {
  chrome.storage.sync.set(({ isExcludeGapInvestment: event.target.checked }), () => changeGapInvestmentCheckboxStatus(excludeGapInvestmentCheckbox));
}

function changeGapInvestmentCheckboxStatus(excludeGapInvestmentCheckbox) {
  chrome.storage.sync.get('isExcludeGapInvestment', ({ isExcludeGapInvestment }) => excludeGapInvestmentCheckbox.checked = isExcludeGapInvestment);
}

init();