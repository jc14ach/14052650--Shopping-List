
var g = {};
g.addedLists = [];

$(document).ready(function() {


//empty local storage




g.addedLists = localStorage.getItem("addedLists");

if (g.addedLists == null) {
g.addedLists = [];
}
else {
g.addedLists = JSON.parse(g.addedLists);

generateListOfLists();
}







// enter button
$(document).keypress(function(event){

var keycode = (event.keyCode ? event.keyCode : event.which);

if(keycode == '13') {

// checks whether input is in the box
if ($('#addListInput').is(":focus")) {
	addList();
}
}
})

$('#addListButton').click(function() {
addList();
})

// go to list on click
$("#listsOfListsView").on('click', 'a', function () {
if (this.id) {






// new list chosen, so set data to new list
changeListData(this.id);

generateList();

$.mobile.changePage("#listItem");
}
})
});

function addList() {

var listName = $('#addListInput').val();

if (listName != "") {







// check if item already exists
listExists = g.addedLists.filter(function (val) {
return val === listName;
});
if (!listExists.length) {

g.addedLists.push(listName);

// sort the item list alphabetically
g.addedLists.sort()

generateListOfLists();

saveLists();

$('h2').text("Shopping List - List Added!").css("color", "green");
}
else {
$('h2').text("Shopping List - This list already exists!").css("color", "red");
}
}
$('#addListInput').val("");
}






// save
function saveLists()
{
localStorage.setItem("addedLists",JSON.stringify(g.addedLists));
}

function removeListItem(listName) {
filteredItems = g.addedLists.filter(function (val) {
return val !== listName;
});

g.addedLists = filteredItems;

saveLists();
}

// refreshes list
function generateListOfLists()
{
$('#listsOfListsView').empty();

for (var i = 0; i < g.addedLists.length; i++) {
$('#listsOfListsView').append(

'<li>'
+ '<a id="' + g.addedLists[i] + '" style="background: #f3f3f3; color: black; font-size: 20px; font-weight: normal; text-shadow: none; padding-left: 0;">'
	+ '<div style="display: inline-block; margin-left: 50px; font-size: 20px;">'
		+ g.addedLists[i]
	+ '</div>'
	+ '<div style="float: right;">'
		+ 'View List'
	+ '</div>'
+ '</a>'
+ '</li>'
);
}
// refresh elements so that dynamically added elements have jQuery mobile styling added
$('#listsOfListsView').listview().listview('refresh').trigger("create");
}