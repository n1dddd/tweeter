/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const createTweetElement = function (tweet) {
  let $tweet = $(
`<article class="tweet">
    <section class="user-profile">
    <div class="image-name">
        <img src="${tweet.user.avatars}">
        <h3 class="user-name">${tweet.user.name}</h3>
    </div>
    <div class="user-handle">
    <h2>${tweet.user.handle}</h2>
    </div>
    </section>
    <div class="user-tweet-text">
      <span>${tweet.content.text}</span>
    </div>
    <span>
      <hr class="line-break"></span>
    <footer class="user-tweet-footer">
      <div class="date">
        <span>${tweet.created_at}</span>
      </div>
      <div class="user-action-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-sharp fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`)
return $tweet;
}

const renderTweets = function (tweets) {
  for (let tweet of data) {
    console.log(tweet);
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}


renderTweets(data);
})
