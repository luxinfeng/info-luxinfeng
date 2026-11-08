const articleLinks = document.querySelectorAll('.featured-article, .article-index a');
const notesList = document.querySelector('#notes-list');

for (const article of articleLinks) {
  const link = document.createElement('a');
  link.href = article.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = article.querySelector('h3').innerText.replace(/\n/g, ' ');
  notesList.append(link);
}

for (const link of document.querySelectorAll('[data-dialog]')) {
  const dialog = document.getElementById(link.dataset.dialog);
  link.addEventListener('click', event => {
    event.preventDefault();
    dialog.showModal();
  });
}

for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    const outsideDialog = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === dialog && outsideDialog) dialog.close();
  });
}

for (const button of document.querySelectorAll('.copy-account')) {
  button.addEventListener('click', async () => {
    const status = button.closest('.contact-card, .studio-dialog').querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('芦十一');
      status.textContent = '已复制「芦十一」，去微信搜索就能找到我。';
    } catch {
      status.textContent = '请手动复制「芦十一」，在微信搜索关注。';
    }
  });
}

function selectTab(selectedTab) {
  const tabs = selectedTab.closest('[role="tablist"]').querySelectorAll('[role="tab"]');
  for (const tab of tabs) {
    const selected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  }
}

for (const tabList of document.querySelectorAll('[role="tablist"]')) {
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      const destinations = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (!(event.key in destinations)) return;
      event.preventDefault();
      const nextTab = tabs[destinations[event.key]];
      selectTab(nextTab);
      nextTab.focus();
    });
  });
}
