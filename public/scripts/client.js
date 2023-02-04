/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () {

  $('#error-empty').hide();
  $('#error-too-long').hide();

  $('#tweet-form').submit(function (e) {
    e.preventDefault();
    const maxChars = 140;
    const tweetLength = $(this).find('#tweet-text').val().length;

    $('#error-too-long').slideUp('slow');
    $('#error-empty').slideUp('slow');

    if (tweetLength > maxChars) {
      $('#error-too-long').slideDown('slow');
    }
    else if (tweetLength === 0) {
      $('#error-empty').slideDown('slow');
    }
    else {
      postTweetData();
      loadTweets();
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
        <span>${escape(tweet.content.text)}</span>
      </div>
      <span>
        <hr class="line-break">
        </span>
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

  const escape = function (string) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  }

  const renderTweets = function (tweets) {
    $('#tweet-container').empty();
    for (let tweet of tweets) {
      console.log(tweet);
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }
  const postTweetData = () => {
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $('#tweet-form').serialize(),
      dataType: "json"
    })
  }

})


