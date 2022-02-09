"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
//<i class="fas fa-star"></i>
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let starClass = "class='far fa-star'";
  if (story.favorite){
    starClass = "class='fas fa-star'"
  }
  let deleteButton = ""
  if (currentUser.loginToken.length > 1){
    deleteButton ="class='fa fa-trash'"
  }
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}"> 
      <span class='star'>
        <i ${starClass}></i>
      </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <span class="delete" display: inline-block;>
          <i ${deleteButton}></i>
        </span>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $story.children('.star').on('click', favoriteAddAndRemoveStory)
    $story.children('.delete').on('click', deleteButton)
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


async function newStorySubmit(event) {
  event.preventDefault();
  let newStory = await storyList.addStory(currentUser, { title: $title.val(), author: $author.val(), url: $url.val() });
  console.log("hello");
  const $story = generateStoryMarkup(newStory);
  $allStoriesList.append($story);
  hidePageComponents();
  $allStoriesList.show();
}
$storyForm.on("submit", newStorySubmit);
