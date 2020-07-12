

//---------------------First Page---------------------//
// Search function
var globalFavoriteFlag = false;

function searchbox_filter() {

  var filterInput = document.getElementById("filter-categories").value;
  var value, cgFlag, bkFlag, items, i;

  value = document.getElementById("value").value.toUpperCase();
  items = document.getElementsByClassName('item');

  for (i = 0; i < items.length; i++) {
    title = items[i].getElementsByClassName("item-title");
    bkFlag = items[i].dataset.bookmark;
    if (filterInput == 'Any') {
      cgFlag = 'Any';
    } else {
      cgFlag = items[i].dataset.categories;
    }

    if (globalFavoriteFlag) {
      if (title[0].innerHTML.toUpperCase().indexOf(value) > -1 && bkFlag == 'true' && filterInput == cgFlag) {
        items[i].style.display = "inline-block";

      } else {
        items[i].style.display = "none";
      }
    } else {
      if (title[0].innerHTML.toUpperCase().indexOf(value) > -1 && filterInput == cgFlag) {
        items[i].style.display = "inline-block";

      } else {
        items[i].style.display = "none";
      }
    }
  }
}

// Bookmark filtering
$('#bookmark-filter-button').on('click', function () {
  if ($(this).attr('class') === "fa-star far") {
    $(this).removeClass('far');
    $(this).addClass('fas');
    globalFavoriteFlag = true;
    searchbox_filter();
  } else {
    globalFavoriteFlag = false;
    $(this).removeClass('fas');
    $(this).addClass('far');
    searchbox_filter();
  }
});

// Category filtering
$('#filter-categories').on('click', function () {
  searchbox_filter();
});

/* start add-recipe-button */
$('#add-recipe-button').on('click', function () {
  $('#modal-add-recipe-backdrop').removeClass('hidden');
  $('#add-recipe-modal').removeClass('hidden');
});

$('#modal-add-recipe-close').on('click', closeModal);
$('#modal-cancel').on('click', closeModal);
$('#modal-add').on('click', addRecipe);

function closeModal() {

  $('#recipe-name-input').val("");
  $('#recipe-photo-input').val("");
  $('recipe-categories-input').val("");
  $('#modal-add-recipe-backdrop').addClass('hidden');
  $('#add-recipe-modal').addClass('hidden');
}

function addRecipe() {
  var bookmark = false;
  var categories = $('#recipe-categories-input').val();
  var ingredients = ["placeholder"];
  var img_url = $('#recipe-photo-input').val();
  var caption = $('#recipe-name-input').val();
  var directions = ["placeholder"];

  if (!categories || !img_url || !caption) {
    alert("Please fill out all blanks to add an item");

  } else {

    var postRequest = new XMLHttpRequest();
    var requestURL = '/addItem';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
      BOOKMARK: bookmark,
      CATEGORIES: categories,
      INGREDIENTS: ingredients,
      IMG_URL: img_url,
      CAPTION: caption,
      DIRECTIONS: directions
    });

    console.log("== Request Body:", requestBody);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
      console.log("== status:", event.target.status);
      if (event.target.status !== 200) {
        var responseBody = event.target.response;
        alert("Error saving item on server side: ", +responseBody);
      } else {
        var itemTemplate = Handlebars.templates.item;
        var itemRecipeHTML = itemTemplate({
          BOOKMARK: bookmark,
          CATEGORIES: categories,
          INGREDIENTS: ingredients,
          IMG_URL: img_url,
          CAPTION: caption,
          DIRECTIONS: directions
        });

        var itemsSection = document.getElementById('items');
        itemsSection.insertAdjacentHTML('beforeend', itemRecipeHTML);
      }
    });

    postRequest.send(requestBody);
    closeModal();
  }
}

function addCategories(categories) {
  var filterCategories = document.getElementById("filter-categories");
  var numCategories = filterCategories.length;
  for (var i = 0; i < numCategories; i++) {
    if ((i + 1) == numCategories) {
      filterCategories.options.add(new Option(categories, categories));
    }
  }
}
/* End add-recipe-button */

/* Misc Buttons */
/* work in progress */

$('.item').each(function () {
  if ($(this).attr('data-bookmark') == 'true') {
    var longShitElem = $(this).children('.item-contents').children('.item-button-container').children('#bookmark');
    longShitElem.removeClass('far');
    longShitElem.addClass('fas');
  }
});

$('#items').on('click', '#trash', function () {

  var itemElem = $(this).parent().parent().parent();
  var caption = itemElem.attr('data-caption');
  var postRequest = new XMLHttpRequest();
  var requestURL = '/deleteItem';
  postRequest.open('POST', requestURL);

  var requestBody = JSON.stringify({
    CAPTION: caption
  });

  console.log("== Request Body:", requestBody);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
    console.log("== status:", event.target.status);
    if (event.target.status !== 200) {
      var responseBody = event.target.response;
      alert("Error deleting item on server side: ", +responseBody);
    } else {
      itemElem.remove();
    }
  });
  postRequest.send(requestBody);
});


$('#items').on('click', '#bookmark', function () {

  console.log("Class:", $(this).attr('class'));

  var itemElem = $(this).parent().parent().parent();
  var caption = itemElem.attr('data-caption');
  var postRequest = new XMLHttpRequest();

  if ($(this).attr('class') === "fa-star far") {
    $(this).removeClass('far');
    $(this).addClass('fas');
    itemElem.attr('data-bookmark', true);
    var requestURL = '/addBookmark';
  } else {
    $(this).removeClass('fas');
    $(this).addClass('far');
    itemElem.attr('data-bookmark', false);
    var requestURL = '/deleteBookmark';
  }
  $(this).off('click');

  postRequest.open('POST', requestURL);

  var requestBody = JSON.stringify({
    CAPTION: caption
  });

  console.log("== Request Body:", requestBody);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
    console.log("== status:", event.target.status);
    if (event.target.status !== 200) {
      var responseBody = event.target.response;
      alert("Error applying item on server side: ", +responseBody);
    } else {
      searchbox_filter();
    }
  });
  postRequest.send(requestBody);

});
//------------------End of First Page------------------//

//---------------------Second Page---------------------//
// Creating array
var myNodelist = document.getElementsByClassName("ingredient_li");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
function deleteElement(e) {
  var caption = getItemCaptionFromURL();
  var index = -1;
  for (var i = 0; i < ingredient_arr.length; i++) {
    if (ingredient_arr[i] == e.parent().text().replace('\u00D7', '')) {
      index = i;
    }
  }
  if(index != -1)
    ingredient_arr.splice(index, 1);

  var postRequest = new XMLHttpRequest();
  var requestURL = '/updateIng';
  postRequest.open('POST', requestURL);

  var requestBody = JSON.stringify({
    INGREDIENTS: ingredient_arr,
    CAPTION: caption
  });

  console.log("== Request Body:", requestBody);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
    console.log("== status:", event.target.status);
    if (event.target.status !== 200) {
      var responseBody = event.target.response;
      alert("Error saving item on server side: ", +responseBody);
    } else {
      $(e).parent().remove();
    }
  });

  postRequest.send(requestBody);

}

$('.close').on('click', function () {
  deleteElement($(this));
});

// Add a "checked" symbol when clicking on a list item
$('#myUL').on('click', 'li', function () {
  $(this).toggleClass('checked');
});

function getItemCaptionFromURL() {
  var path = window.location.pathname;
  var pathParts = path.split('/');
  var caption = decodeURI(pathParts[1]);
  return caption;
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var caption = getItemCaptionFromURL();
  
  var inputValue = document.getElementById("myInput").value;
  ingredient_arr.push(inputValue);

  if (inputValue === '') {
    alert("You must write something!");

  } else {

    var postRequest = new XMLHttpRequest();
    var requestURL = '/updateIng';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
      INGREDIENTS: ingredient_arr,
      CAPTION: caption
    });

    console.log("== Request Body:", requestBody);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
      console.log("== status:", event.target.status);
      if (event.target.status !== 200) {
        var responseBody = event.target.response;
        alert("Error saving item on server side: ", +responseBody);

      } else {

        var li = document.createElement("li");
        li.setAttribute("class", "ingredient_li");
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        document.getElementById("myUL").appendChild(li);

        document.getElementById("myInput").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        $('.close').on('click', function () {
          deleteElement($(this));
        });
      }
    });

    postRequest.send(requestBody);
  }
}

// direction

// Create a "close" button and append it to each list item
var direction_Nodelist = document.getElementsByClassName("direction_li");
for (var i = 0; i < direction_Nodelist.length; i++) {
  var direction_span = document.createElement("SPAN");
  var direction_txt = document.createTextNode("\u00D7");
  direction_span.className = "direction_close";
  direction_span.appendChild(direction_txt);
  direction_Nodelist[i].appendChild(direction_span);
}

// Click on a close button to hide the current list item
function directiondeleteElement(e) {
  var caption = getItemCaptionFromURL();
  var index = -1;
  for (var i = 0; i < direction_arr.length; i++) {
    if (direction_arr[i] == e.parent().text().replace('\u00D7', '')) {
      index = i;
    }
  }
  if(index != -1)
    direction_arr.splice(index, 1);

  var postRequest = new XMLHttpRequest();
  var requestURL = '/updateDir';
  postRequest.open('POST', requestURL);

  var requestBody = JSON.stringify({
    DIRECTIONS: direction_arr,
    CAPTION: caption
  });

  console.log("== Request Body:", requestBody);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
    console.log("== status:", event.target.status);
    if (event.target.status !== 200) {
      var responseBody = event.target.response;
      alert("Error saving item on server side: ", +responseBody);
    } else {
      $(e).parent().remove();
    }
  });

  postRequest.send(requestBody);

}

$('.direction_close').on('click', function () {
  directiondeleteElement($(this));
});

// Add a "checked" symbol when clicking on a list item
$('#direction_UL').on('click', 'li', function () {
  $(this).toggleClass('direction_checked');
});

// Create a new list item when clicking on the "Add" button
function direction_newElement() {
  var caption = getItemCaptionFromURL();

  var direction_inputValue = document.getElementById("direction_Input").value;
  direction_arr.push(direction_inputValue);

  if (direction_inputValue === '') {
    alert("You must write something!");

  } else {

    var postRequest = new XMLHttpRequest();
    var requestURL = '/updateDir';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
      DIRECTIONS: direction_arr,
      CAPTION: caption
    });

    console.log("== Request Body:", requestBody);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
      console.log("== status:", event.target.status);
      if (event.target.status !== 200) {
        var responseBody = event.target.response;
        alert("Error saving item on server side: ", +responseBody);

      } else {

        var direction_li = document.createElement("li");
        direction_li.setAttribute("class", "direction_li");
        var direction_t = document.createTextNode(direction_inputValue);
        direction_li.appendChild(direction_t);
        document.getElementById("direction_UL").appendChild(direction_li);

        document.getElementById("direction_Input").value = "";

        var direction_span = document.createElement("SPAN");
        var direction_txt = document.createTextNode("\u00D7");
        direction_span.className = "direction_close";
        direction_span.appendChild(direction_txt);
        direction_li.appendChild(direction_span);

        $('.direction_close').on('click', function () {
          directiondeleteElement($(this));
        });
      }
    });

    postRequest.send(requestBody);
  }
}

//------------------End of Second Page------------------//
