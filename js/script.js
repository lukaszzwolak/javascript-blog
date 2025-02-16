const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);

  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
  console.log('funkcja generateTitleLinks wykonala się', customSelector);
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('Znalezione artykuly: ', articles);

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    if (!articleId) continue;
    const articleTitle = article.querySelector(optTitleSelector).innerText;
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    console.log('Wygenerowany link HTML:', linkHTML);

    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  const links = document.querySelectorAll('.titles a');
  console.log('to zawiera stala links: ', links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  console.log('funkcja generateTags dziala');
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    console.log('Pobrane tagi: ', articleTags);
    const tagsArray = articleTags.split(' ');
    for (let tag of tagsArray) {
      console.log('przetwarzany tag: ', tag);
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      console.log('Wygenerowany link html: ', linkHTML);
      html += linkHTML;
    }
    tagsWrapper.innerHTML = html;
  }
}
generateTags();

function generateAuthors() {
  console.log('Funkcja generateAuthors dziala');
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    console.log('Pobrany autor:', articleAuthor);
    const linkHTML = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
    console.log('Wygenerowany link HTML dla autora:', linkHTML);
    authorWrapper.innerHTML = linkHTML;
  }
  addClickListenersToAuthors();
}
generateAuthors();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  console.log('Wyodrębniony tag: ', tag);
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }
  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '').trim(); // Usunięcie zbędnych spacji
  console.log('Wyodrębniony autor:', author);

  // Usunięcie klasy active z aktywnych linków autorów
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }

  // Aktywacja klikniętego linku autora
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  console.log('Znalezione linki autora:', authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  console.log('Filtrujemy artykuły po autorze:', `[data-author="${author}"]`);
  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('.post-tags a');
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a, .authors a'); // Dodano nasłuchiwanie również dla sidebaru
  console.log('Dodaję nasłuchiwanie do autorów:', authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
