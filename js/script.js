const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

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
  const author = href.replace('#author-', '');
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
  const authorLinks = document.querySelectorAll('.post-author a, .authors a');// Dodano nasłuchiwanie również dla sidebaru
  console.log('Dodaję nasłuchiwanie do autorów:', authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateAuthorsParams(authors) {
  const params = { max: 0, min: 999999 };

  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}


function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  let normalizedMax = params.max - params.min;
  if (normalizedMax === 0) normalizedMax = 1;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateAuthors() {
  console.log('Funkcja generateAuthors dziala');
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');

    if (!articleAuthor) continue;

    const linkHTML = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
    authorWrapper.innerHTML = linkHTML;

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }

  console.log("allAuthors:", allAuthors);

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log("authorsParams:", authorsParams);

  if (!authorsParams) return;

  const authorsList = document.querySelector(optAuthorsListSelector);
  let allAuthorsHTML = '';

  for (let author in allAuthors) {
    const authorClass = calculateTagClass(allAuthors[author], authorsParams);
    allAuthorsHTML += `<li><a href="#author-${author}" class="${authorClass}">${author} (${allAuthors[author]})</a></li>`;
  }
  authorsList.innerHTML = allAuthorsHTML;
  addClickListenersToAuthors();
}


function generateTags() {
  console.log('funkcja generateTags dziala');
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const tagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      console.log('Wygenerowany link html: ', linkHTML);
      /* add generated code to html variable */
      html += linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = ' ';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    const tagClass = calculateTagClass(allTags[tag], tagsParams);
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += `<li><a href="#tag-${tag}" class="${tagClass}">${tag}</a></li>`;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();
generateAuthors();
