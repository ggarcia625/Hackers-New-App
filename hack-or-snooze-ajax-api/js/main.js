"use strict";


const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $storyForm = $(
  `<form>
    <div>
      <label for="title">title</label>
      <input id="title" type="text"></input>
    </div>
    <div>
      <label for="author">author</label>
      <input id="author" type="text"></input>
    </div>
    <div>
      <label for="url">url</label>
      <input id="url" type="text"></input>
    </div>
    <button type="submit">Submit</buttom>
  </form>`);
$storyForm.hide();
const $navStorySubmit = $("#nav-story-submit");
const $storyContainer = $("section.new-story-form-container")
$storyContainer.append($storyForm);
const $author = $("#author");
const $title = $("#title");
const $url = $("#url");


function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $storyForm,
  ];
  components.forEach(c => c.hide());
}



async function start() {
  console.debug("start");

  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  if (currentUser) updateUIOnUserLogin();
  
}


$(start);
