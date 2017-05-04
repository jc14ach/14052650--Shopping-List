// g short for global file data
var g = {};
g.currentList = "";
g.addedItems = [];

		$(document).ready(function() {

		var countries = [
		"Apple",
		"Orange",
		"Bannana",
		"Pear",
		"Bacon",
		"Susages",
		"Melon",
		"Cuccumber",
		"potatoes",
		"Letuce",
		"Tomato",
		"Chicken",
		"Bread",
		"Pasta",
		"Cheese",
		"Eggs",
		"Rice",
		"Icecream",
		"Ketchup",
		"Buiscuits",
		"Yoghurt",
		"Beef",
		"Peppers",
		"Milk",
		"Butter",
		"Fish",
		"Waffles",
		"Pizza",
		"Shrimp",
		"Crackers",
		"Choclate",
		"Haribo",
		"Pork Pies",
		"Pants",
		"Hummus",
		"Broccoli",
		"Strawberrys",
		"Blue Berries",
		"Carrots",
		"Orange Juice",
		"Apple Juice",
		"Squash",
		"Coke"
	];






    // empty list


    // enter button addds items
    $(document).keypress(function(event){

        var keycode = (event.keyCode ? event.keyCode : event.which);

        if(keycode == '13') {

            // checks whether input box is in focus
            if ($('#addItemInput').is(":focus")) {
                addItem();
            }
        }
    })




    // add item
    $('#addItemButton').click(function() {
        addItem();
    })









    // "untick boxes
    $('#removeTicks').click(function() {
        $(":checkbox").prop('checked',false);

        for (var i = 0; i < g.addedItems.length; i++) {
            g.addedItems[i]['checked'] = false;
        }

        saveItem();
    });

    $('#backButton').click(function() {
        $.mobile.changePage("#listOfLists");
    })








   // deleteting the current list
    $('#deleteList').click(function() {

        g.addedItems = [];

        localStorage.setItem("addedItems" + g.currentList,JSON.stringify([]));

        $.mobile.changePage("#listOfLists");

        removeListItem(g.currentList);
        generateListOfLists();
    });








    // save checkbox if there clicked or not
    $("#listView").on( "click", "input[type=checkbox]", function () {

        itemObj = getItem(this);

        itemObj['checked'] = this.checked;
		if( this.checked == true){
		var d = new Date();
		itemObj['time'] = d;
		console.log(itemObj['time']);
		}
		else{
				itemObj['time'] = " Not Brought Yet";
		}
        saveItem();
		console.log(itemObj['time']);
		
    });








    //delete button
    $('#listView').on('click', 'input', function() {
        var current = this.id;
        var r = current.split("-");

        if (r[0]) {
            if (r[0] == 'deleteButton') {
                removeItem(r[1]);

                generateList();
                saveItem();

            }
        }
    });










    //save the quantity
    $('#listView').on('change', 'input', function() {
        var current = this.id;
        var r = current.split("-");

        if (r[0] == 'spin') {

            itemObj = getItem(this);

            itemObj['quantity'] = $(this).val();

            saveItem();
        }
    });

	// autocomplete
	$('#addItemInput').autocomplete({
		lookup: countries,
		onSelect: function (suggestion) {
			$('addItemInput').val(suggestion.value);
		}
	});
});

// function to remove item
function removeItem(itemName) {

    filteredItems = g.addedItems.filter(function (val) {
        return val['name'] !== itemName;
    });

    g.addedItems = filteredItems;
}







function getItem(object) {

    objID = object.id;
    split = objID.split("-");
    itemName = split[1];









    var result = g.addedItems.filter(function( obj ) {
        return obj.name == itemName;
    });

    return result[0];
}

// reset error message
$('input').on("change blur input", function() {
    $('h1').text(g.currentList).css("color", "white");
    $('h2').text("Shopping List").css("color", "white");

    $('.autocomplete-suggestions').css("width", "600px");
})









function addItem() {

    var itemName = $('#addItemInput').val();
    var itemQuantity = $('#addItemQuantity').val();

    if (itemName != "") {

        // cheeking if item exist




        itemExists = g.addedItems.filter(function (val) {
            return val['name'] === itemName;
        });
        if (!itemExists.length) {

            var listItem = {name: itemName, quantity: itemQuantity, checked: false, time: " Not Brought Yet "};

            g.addedItems.push(listItem);









            g.addedItems.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })

            generateList();

            saveItem();

            $('h2').text("Shopping List - Item Added!").css("color", "green");
        }
        else {
            $('h2').text("Shopping List - This item is already in your list!").css("color", "red");
        }
    }
    $('#addItemInput').val("");
    $('#addItemQuantity').val(1);
}








// refreshes the lists
function generateList()
{
    $('#listView').empty();

    for (var i = 0; i < g.addedItems.length; i++) {

        isChecked = (g.addedItems[i].checked ? "checked" : "");

        $('#listView').append(

            '<li>'
            + '<table style="width: 100%">'
            + '<tr>'
            + '<td>'
            + '<div style="display: inline-block; margin-bottom: 10px;">'
            + '<input type="checkbox" id="checkbox-' + g.addedItems[i].name + '" class="custom"' +  isChecked + '>'
            + '</div>'
            + '<div style="display: inline-block; margin-left: 50px; font-size: 20px;">'
            + g.addedItems[i].name
            + '</div>'
            + '</td>'
            + '<td style="width: 100%" id="optionsSection">'
            + '<div style="float: right; display: inline-block; margin-left: 7px; margin-top: -2px;">'
            + '<input type="button" value="X" id="deleteButton-' + g.addedItems[i].name + '" data-inline="true">'
            + '</div>'
            + '<div style="float: right; display: inline-block;">'
            + '<input type="text" data-role="spinbox" name="spin" id="spin-' + g.addedItems[i].name + '" value="' + g.addedItems[i].quantity + '" min="0" max="100" data-mini="true">'
            + '</div>'
            + '</td>'
            + '</tr>'
            + '</table>'
            + '</li>'
			
        );
    }



    //refreshes styling
    $('#listView').listview().listview('refresh').trigger("create");
}


	$('#printReport').click(function(){

		var output = "";

	    for (var i = 0; i < g.addedItems.length; i++) {

			console.log(g.addedItems[i]);

			output = output + " Item = " + g.addedItems[i].name + "\n" + " Quantity = " + g.addedItems[i].quantity + "\n" + " Box Checked = " + g.addedItems[i].checked + "\n" + " Time Brought = " + g.addedItems[i].time + "\n" + "\n";

		}
							alert(output);

});




// save items local storage
function saveItem()
{
    localStorage.setItem("addedItems" + g.currentList,JSON.stringify(g.addedItems));
}


function changeListData(listName) {


    g.currentList = listName;

    g.addedItems = localStorage.getItem("addedItems" + listName);

    if (g.addedItems == null) {
        g.addedItems = [];
    }
    else {
        g.addedItems = JSON.parse(g.addedItems);

        generateList();
    }

    $('h1').text(g.currentList).css("color", "white");
    $('h2').text("Shopping List").css("color", "white");
};
