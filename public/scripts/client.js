/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () { //ensures that the scripts load together fully

  $('#error-empty').hide(); //hide error messages until prompted to show
  $('#error-too-long').hide();

  $('#tweet-form').submit(function (e) { //jquery function to post user tweet on submit event
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
      const userTweet = $(this).serialize();
      $.post('/tweets/', userTweet, () => { //POST tweet-form data to database, then render database directly after
        loadTweets();
      })
      this.reset();
      $(this).find('.counter').val(maxChars); //navigate to parent, find child .counter, and replace with maxChars variable to reset word count
    }
  })

  const loadTweets = () => { //AJAX function to load (GET), then render tweets from database
    $.ajax({
      url: "/tweets/",
      type: "GET",
      dataType: "json",
      success: (data) => {
        renderTweets(data);
      },
      error: (error) => {
        console.log(`GET request failed, here is your error: ${error}`)
      }
    })
  }

  const escape = function (string) { //block cross-site scripting by converting unsafe chars to safe chars
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  }

  const renderTweets = function (tweets) { //jquery function to render each tweet based on set styling from database
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  const createTweetElement = function (tweet) { //creates template tweet container
    let $tweet = $(
      `<article class="tweet">
      <section class="tweet-header">
        <div class="image-and-name">
          <img src="${tweet.user.avatars}">
          <h3>${tweet.user.name}</h3>
        </div>
        <div class="only-user-handle">
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
  loadTweets();
})


