(function(){

	var storedKeys = Object.keys(localStorage);

	function buttonTemplate(key){
		var html = '<small><span class="btn-group"><span class="btn-mini btn-success btn-inline text-xs tb" id="edit-{tmp}">edit</span>'
		html += '<span class="btn-mini btn-danger btn-inline text-xs tb" id="delete-{tmp}">delete</span></span></small>'
		html = html.replace(/{tmp}/g, key);
		return html;
	}

	function newTableRow(url, shortcut) {
		var tableBody= document.getElementById("table-body");
		var table  = document.getElementById('table');
		var ahref = "<a href=" + url + ">";
		var row = "<tr><td>" + buttonTemplate(shortcut) + "&nbsp";
		row +=  shortcut + "</td>";
		row += "<td>" + ahref + url + "</a></td></tr>";

		tableBody.innerHTML += row;
		return false
	}

	function attachEdit(key) {
		var edit = document.getElementById('edit-' + key);
		if (edit) {
			edit.addEventListener('click', goListen, false);
		}
	}

	for (i=0; i<localStorage.length; i++) {
		var key = storedKeys[i];
		var url = localStorage[key];
		newTableRow(url, key, attachEdit );
	}

	var doEdit = function(){
		var shortcutInput = document.getElementById('shortcut');
		var urlInput = document.getElementById('url');
		var key = this.id.split('-')[1];
		var url = localStorage[key];
		shortcutInput.value = key;
		urlInput.value = url;
		urlInput.style.width = "200px;";
		window.scrollTo(0, 0);
	}

	var doDelete = function() {
		var key = this.id.split('-')[1];
		if ( confirm('Are you sure?') ) {
			 delete localStorage[key];
			 if(chrome.storage){
				 chrome.storage.sync.remove(key);
			 }
			 window.location = window.location;
		 }
	}

	function checkExample(){
		var tr = document.getElementsByTagName('tr');
		if(tr.length > 1) {
			var example = document.getElementById('example');
			example.remove();
		}
	}

	window.addEventListener('load', function(){
		checkExample();
		for (i=0; i<localStorage.length; i++) {
			var key = storedKeys[i];
			var url = localStorage[key];
			document.getElementById("edit-" + key).addEventListener("click", doEdit, false);
			document.getElementById("delete-" + key).addEventListener("click", doDelete, false);
		}
	});

  //search function
  document.getElementById("search").addEventListener('keyup',function() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toLowerCase();
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");

    //loop through all rows, and hide those that don't match search query
    for (var i=0; i<tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  })

})();
