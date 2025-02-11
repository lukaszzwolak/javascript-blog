const optArticleSelector = '.post-title',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);
  
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

//generiwanie linkow tytulow artykolow
const generateTitleLinks = function () {
  console.log('funkcja generateTitleLinks wykonala się');
  //szukanie kontenera na linki tytulow
  const titleList = document.querySelector(optTitleListSelector);
  //wyczyszczenie zawartosci kontenera
  titleList.innerHTML = '';

  //znalezienie wszystkich artykulow
  const articles = document.querySelectorAll('.posts .post');
  //dla kazdego artykulu
  for(let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optArticleSelector).innerText;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('wygenerowany link html: ', linkHTML);
    //dodaje link do listy
    titleList.innerHTML += linkHTML;
  }

  //nasluchiwanie klikniecia nowych linkow
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler)
  }
};
//wywoalnie generatetitlelinks po zaladowaniu strony
generateTitleLinks();

/*
Nie wiem dlaczego cały blog po odpaleniu w wyszukiwarce przesuwa
się na lewo... Prosiłbym o intrukcję ://// 
*/