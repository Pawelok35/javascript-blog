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
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapper);

    /* 4. make html variable with empty string */
    let tagHtml = "";

    /* 5. get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);

    /* 6. split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    
    /* 5. START LOOP: for each tag */
    for (let tag of articleTagsArray){
    console.log(tag);

    /* 6. generate HTML of the link */
   const tagLinkHTML ='<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";
  console.log(tagLinkHTML);

    /* 7. add generated code to html variable */
    tagHtml = tagHtml + tagLinkHTML;

    /* 8.  END LOOP: for each tag */
    }
    /* 9. insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = tagHtml;
    console.log(tagWrapper);
    /* 10. END LOOP: for every article: */
  }
}

generateTags();
