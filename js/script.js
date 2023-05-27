'use strict';
const titleClickHandler = function (event) {
  /// wyrazenie funkcyjne const title...
  console.log('Link was clicked!');
  event.preventDefault();
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  const clickedElement = this; ///obiekt ktory wywoluje funkcje, klikniety elemnet na ktorym zaszlo zdarzenie
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    /// iteruje po wszytskich elementach
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href'); /// #article-2 #element o id
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list', /// find list of tags in right column
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearElement() {
    titleList.innerHTML = '';
  }
  clearElement();

  let html = '';
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(customSelector);
  console.log(articles);
  for (let article of articles) {
    console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

const params = {
  max: 0,
  min: 999999,
};
function calculateTagsParams(allTags) {
  console.log(params);
  for (let tag in allTags) {
    if (allTags[tag] > params.max) {
      params.max = allTags[tag];
      console.log(allTags + ' is used');
    }
    if (allTags[tag] < params.min) {
      params.min = allTags[tag];
      console.log(allTags + ' is used');
    }
    console.log(tag + ' is used ' + allTags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params) {
  // funkcja przyjmuje dwa argumenty

  const normalizedCount = count - params.min; // roznica pomiedzy min a  + ile do nastepnego taga
  const normalizedMax = params.max - params.min; // roznica pomiedzy max a min
  const percentage = normalizedCount / normalizedMax; //
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1); // optCloudClassCount = maxymalna skala 1-5 czyli 5  optCloudClassCount-1 bo
  console.log(classNumber);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object  */
  //if i not found tag in arrey i create new one and add to arrey

  let allTags = {}; // Was [] ->  array | change on {} -> object

  /* 1. find all articles */

  const articles = document.querySelectorAll(optArticleSelector); //przypisane elementu z uzyciem selektora  // szukam elementu o selektorze i przypisuje do stalej
  console.log(articles);

  /* 2. START LOOP: for every article: */
  for (let article of articles) {
    // iteracja po kazdym elemencie z articles
    console.log(article);

    /* 3. find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapper);

    /* 4. make html variable with empty string */
    let tagHtml = '';

    /* 5. get tags from data-tags attribute */
    // for each article I found his tags
    const articleTags = article.getAttribute('data-tags'); // w obrembie elementu article szukam atrybutu
    console.log(articleTags);

    /* 6. split tags into array */
    const articleTagsArray = articleTags.split(' '); // tablica wartosci  'cat dog'   ['cat', 'dog']  -> elementy tablicy
    console.log(articleTagsArray);

    /* 5. START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* 6. generate HTML of the link */
      // for each founded tags from (Point 5.) is generated LINK HTML code
      const tagLinkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>'; // string ltory reprezentuje kawalek html
      console.log(tagLinkHTML);

      /* 7. add generated code to html variable */
      tagHtml = tagHtml + tagLinkHTML; // dopisanie do starej wartosci nowa wartosc
      console.log(tagHtml);

      /* [NEW] check if this link is NOT already in allTags array*/
      // Now i must change code because now i use object (not array anymore)
      // in which (object) i want to count how many times appears tag
      if (!allTags[tag]) {
        // czy w obiekcie alltags istnieje wratosc tag
        // it's use ! -> this is negation
        // so I read "If in allTags ARE NOT key tag"

        /* [NEW] add tag to allTags object */
        // now in allTags I do not have any tag yet. So counter = 1
        allTags[tag] = 1; // [wlasciwosc]
      } else {
        // if exists this tag which I am looking for I rise counter +1
        allTags[tag] = allTags[tag] + 1; // ++ MEANS +1 (rise +1)
      }
      /* 8.  END LOOP: for each tag */
    }
    /* 9. insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = tagHtml;
    console.log(tagWrapper);
    /* 10. END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  //I ADD TO TAGS LIST ALL LINKS IN ARRAY, I CONNECT THEM BY SPACE ' '
  // ELEMENTS MUST BE OUTSIDE THE LOOP.

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags); // params -> parameters
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML =

      '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    // += operator which i use to add new link to allTagsHtml

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  document.querySelectorAll('a.active[href^="tag-"]');
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeLinks);
  /* START LOOP: for each active tag link */
  for (const link of activeLinks) {
    /* remove class active */
    link.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /*                                                                                                               find all tag links with "href" attribute equal to the "href" constant */
  const links = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let link of links) {
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tagLinks);
  /* START LOOP: for each link */
  for (const tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

generateTags();
addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  for (let article of articles) {
    console.log(article);

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);
    const articleAuthors = article.getAttribute('data-author');
    console.log(articleAuthors);
    const linkHTML =
      '<a href="#author' +
      articleAuthors +
      '"><span>' +
      articleAuthors +
      '</span></a></li>';
    console.log(linkHTML);
    authorWrapper.innerHTML = linkHTML;
    console.log(authorWrapper);
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const authorTag = href.replace('#author', '');
  console.log(authorTag);

  /*  find all links with custom tag author */
  const author = document.querySelectorAll('a[href^="#author"]');
  console.log(author);
  /*  find all links with class active author */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author"]');

  /*  START LOOP: for each active tag link */
  for (const author of activeAuthors) {
    /* remove class active */
    author.classList.remove('active');
    /*  END LOOP: for each active tag link */
  }
  /*  Find links with author */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);

  /* START LOOP: for each link */
  for (const author of authorLinks) {
    author.classList.add('active');

    /* END LOOP: for each link */
  }

  generateTitleLinks('[data-author="' + authorTag + '"]');
}
/*  find posts with authors */
function addClickListenersToAuthors() {
  /*  Find links with tags */
  const allAuthorsLinks = document.querySelectorAll('a[href^="#author"]');
  console.log(allAuthorsLinks);
  /* START LOOP: for each link */
  for (const allAuthorLink of allAuthorsLinks) {
    /* add tagClickHandler as event listener for that link */
    allAuthorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
