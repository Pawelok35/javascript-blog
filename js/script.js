
  'use strict'

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
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

  function generateTitleLinks() {
/* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearElement() {
      titleList.innerHTML = "";
    }
    clearElement();

    let html = '';
/* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
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
  }
  generateTitleLinks();

