const gapInvestmentRegex = /([전월]?세 ?([안끼]고)|갭 ?(투자?|[안끼]고)|승계)/;
const mapWrap = document.getElementsByClassName('map_wrap')[0];
const listenerTargetEventNames = ['mousewheel', 'mousemove', 'pointermove'];
const isHidden = (item) => item.style.display === 'none';

function init() {
  listenerTargetEventNames.forEach(targetName => mapWrap.addEventListener(targetName, () => gapInvestmentFilterListener(), { passive: true }));
  console.debug(`Added listeners: ${listenerTargetEventNames}`);
}

async function gapInvestmentFilterListener() {
  chrome.storage.sync.get('isExcludeGapInvestment', ({ isExcludeGapInvestment }) => applyGapInvestmentFilter(isExcludeGapInvestment));
}

function applyGapInvestmentFilter(shouldExclude) {
  [...document.getElementsByClassName("item_inner ")] // 매물 정보가 있는 영역
    .forEach(item => {
      const innerTexts = [...item.getElementsByClassName("info_area")] // 매물 설명
        .map(innerText => innerText.textContent)
        .join("")
      if (gapInvestmentRegex.test(innerTexts)) {
        if (shouldExclude && !isHidden(item)) {
          item.style.display = 'none';
          console.debug(`[Hidden] ${innerTexts}`)
        } else if (!shouldExclude && isHidden(item)) {
          item.style.display = '';
          console.debug(`[Reveal] ${innerTexts}`)
        }
      }
    });
}

init();