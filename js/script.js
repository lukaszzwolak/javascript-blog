const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags',
  optAuthorsListSelector = '.authors';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
};

console.log('skrypt laduje sie poprawnie!');

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
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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

/*function generateTags() {
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
*/
function calculateTagClass(count, params) {
  if (params.max === params.min) {
    return "tag-size-1";
  }
  const normalizedCount = count - params.min;
  const range = params.max - params.min;
  const classNumber = Math.floor((normalizedCount / range) * 5 + 1);
  return `tag-size-${classNumber}`;
}

function generateTags() {
  console.log('funkcja generateTags dziala');
  const articles = document.querySelectorAll(optArticleSelector);
  let allTags = {};
  const tagsParams = { max: 0, min: 999999 };

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

      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }

  const allTagsData = { tags: [] };
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  console.log('allTagsData:', allTagsData);
  const tagList = document.querySelector(optTagsListSelector);
  console.log('Tag list:', tagList);
  console.log('wygenerowany HTML dla chmury tagow:', templates.tagCloudLink(allTagsData));
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();


function generateAuthors() {
  console.log('Funkcja generateAuthors dziala');
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    console.log('Pobrany autor:', articleAuthor);
    const linkHTMLData = { author: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log('Wygenerowany link HTML dla autora:', linkHTML);
    authorWrapper.innerHTML = linkHTML;
  }
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
  const author = href.replace('#author-', '');
  console.log('Wyodrębniony autor:', author);

  // usunięcie klasy active z aktywnych linków autorów
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }

  // aktywacja klikniętego linku autora
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
