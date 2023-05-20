"use strict";
const titleClickHandler = function (event) {
  /// wyrazenie funkcyjne const title...
  console.log("Link was clicked!");
  event.preventDefault();
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  /* [DONE] add class 'active' to the clicked link */
  const clickedElement = this; ///obiekt ktory wywoluje funkcje, klikniety elemnet na ktorym zaszlo zdarzenie
  clickedElement.classList.add("active");
  console.log("clickedElement:", clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    /// iteruje po wszytskich elementach
    activeArticle.classList.remove("active");
  }
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute("href"); /// #article-2 #element o id
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
  console.log("targetArticle:", targetArticle);
};

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author"; 

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearElement() {
    titleList.innerHTML = "";
  }
  clearElement();

  let html = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(customSelector);
  console.log(articles);
  for (let article of articles) {
    console.log(article);

    /* get the article id */
    const articleId = article.getAttribute("id");
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
      "</span></a></li>";
    console.log(linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");
  console.log(links);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  /* 1. find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* 2. START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* 3. find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector); /// looking for wrapper tags in every article.
    console.log(tagWrapper);
    /* 4. make html variable with empty string */
    let html = "";
    /* 5. get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* 6. split tags into array */
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);
    /* 7. START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /// tag will be text for single tag
      console.log(tag);
      /* 8. generate HTML of the link */
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";
      console.log(linkHTML);
      /* 9. add generated code to html variable */
      html = html + linkHTML;
      /* 10. END LOOP: for each tag */
    }
    /* 11. insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    console.log(tagWrapper);
    /* 12. END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  console.log(tag);
  /* find all tag links with class active */
  const allActiveTagLinks = clickedElement.querySelectorAll(
    'a.active[href="' + href + '"]'
  );
  /* START LOOP: for each active tag link */
  for (let activeTag of allActiveTagLinks) {
    /* remove class active */
    activeTag.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href); 
  console.log(tagLinks);
  
  /* START LOOP: for each found tag link */
for (let tagLink of tagLinks){
  /* add class active */
  tagLink.classList.add("active");
  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

tagClickHandler();

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll (optArticleTagsSelector);
  console.log(allTagLinks);
  /* START LOOP: for each link */
  for (let allTagLink of allTagLinks){
  /* add tagClickHandler as event listener for that link */
  allTagLink.addEventListener("click", titleClickHandler);
  /* END LOOP: for each link */
}
}
addClickListenersToTags();