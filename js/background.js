let isExcludeGapInvestment = false;

chrome.runtime.onInstalled.addListener(() => chrome.storage.sync.set({ isExcludeGapInvestment }));