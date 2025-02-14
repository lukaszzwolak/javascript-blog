{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

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
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      if (!articleId) {
        console.warn('artykul nie ma atrybutu id', article);
        continue;
      }
      const articleTitleElement = article.querySelector(optTitleSelector);
      if (articleTitleElement) {
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
    console.log('to zawiera stala links: ', links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler)
    }
  };
  //wywoalnie generatetitlelinks po zaladowaniu strony
  generateTitleLinks();

  function generateTags() {
    console.log('funkcja generateTags dziala')
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
      console.log('Pobrane tagi: ', articleTags);
      /* split tags into array */
      const tagsArray = articleTags.split(' ');
      console.log(tagsArray);
      /* START LOOP: for each tag */
      for (let tag of tagsArray) {
        console.log('przetwarzany tag: ', tag);
        /* generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        console.log('Wygenerowany link html: ', linkHTML);
        /* add generated code to html variable */
        html += linkHTML;
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked!', clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('wartosc href', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('Wyodrębniony tag: ', tag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`)
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags a');
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();
}


