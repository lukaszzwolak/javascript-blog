{
  const optArticleSelector = '.post',
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
    const articles = document.querySelectorAll(optArticleSelector);

    //zmienna do przychowywania kodu html wszystkich linokow
    //let html = '';

    //dla kazdego artykulu
    for(let article of articles) {
      const articleId = article.getAttribute('id');
      if(!articleId) {
        console.warn('artykul nie ma atrybutu id', article);
        continue;
      }
      const articleTitleElement = article.querySelector(optTitleSelector);
      if (articleTitleElement){
        const articleTitle = articleTitleElement.innerText;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('Wygenerowany link HTML:', linkHTML);
        // Dodaj link do listy
        titleList.insertAdjacentHTML('beforeend', linkHTML);
      } else {
        console.error('Nie znaleziono tytułu dla artykułu o id', articleId);
      }
    }

    //wstawienie wszyskich linkow naraz do listy tytulow
    //titleList.innerHTML = html;

    //nasluchiwanie klikniecia nowych linkow
    const links = document.querySelectorAll('.titles a');
    console.log('to zawiera stala links: ',  links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler)
    }
  };
  //wywoalnie generatetitlelinks po zaladowaniu strony
  generateTitleLinks();
}
/*
Nie wiem dlaczego cały blog po odpaleniu w wyszukiwarce przesuwa
się na lewo... Prosiłbym o intrukcję ://// 
*/
