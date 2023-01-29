/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function () {

  $('#tweet-form').submit(function (e) {
    e.preventDefault();
    const maxChars = 140;
    const tweetLength = $(this).find('#tweet-text').val().length;
    if (tweetLength > maxChars) {
      window.alert("Please lower your character count")
    }
    else if (tweetLength === 0) {
      window.alert("Please input some text")
    }
    else{
      postTweetData();
    }
  })

  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      type: "GET",
      dataType: "json",
      success: (data) => {
        renderTweets(data);
      }
    })
  }
  loadTweets();

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
          <span>${timeago.format(tweet.created_at)}</span>
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
    for (let tweet of tweets) {
      console.log(tweet);
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }
  const postTweetData = () => {
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $('#tweet-form').serialize(),
      dataType: "json",
      success: (data) => {
        console.log(data);
      }
    })
  }

})


