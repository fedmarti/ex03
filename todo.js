function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}

function ft_ready() {
	fill_ft_list();
}

function fill_ft_list()
{
	var current_cookie = getCookie("1_task");
	var i = 1;
	var tc = getCookie("task_count");

	while (i <= tc)
	{
		if (current_cookie != "")
			new_task(i, current_cookie);
		console.log("i = " + i.toString() + "; content = " + current_cookie);
		i++;
		current_cookie = getCookie(i.toString() + "_task");
	}
}

function update_tc(){
	var tc;
	tc = parseInt(getCookie("task_count"));
	if (isNaN(tc))
		tc = 0;
	tc++;
	document.cookie = "task_count = " + tc.toString() + "; max-age = 31536000; path=/;";
	return tc; 
}

function create_task() {
	var content = prompt("New task");
	var task_id;

	if (content != "")
	{
		task_id = new_task(update_tc(), content);
		document.cookie = task_id + " = " + content + "; max-age = 31536000; path=/;";
	}
}
function new_task(task_n, content) {
	
	var new_task;
	var div = document.getElementById("ft_list");
	var previous_task;

	new_task = document.createElement("p");
	new_task.textContent = content;
	// console.log(div.childNodes[1]);
	
	new_task.id =  task_n.toString() + "_task";
	new_task.classList.add("task");
	new_task.addEventListener("click", remove_element, false);
	div.insertBefore(new_task, div.childNodes[1]);
	return new_task.id;
}
function remove_element(){
	if (confirm("Vuoi eliminare questo elemento?"))
	{
		console.log(this.id);
		document.cookie = this.id + " = " + this.textContent + "; max-age = 0; path=/;";
		this.parentElement.removeChild(this);
	}
}

function delete_all_cookies() {
	var tc = getCookie("task_count");
	var i;
	var current_cookie;
	
	document.cookie = "task_count = " + tc.toString() + "; max-age = 0; path=/;";
	for (i = 0; i < 100; i++)
	{
		// console.log("i = " + i.toString() + "; content = " + current_cookie);
		document.cookie = i.toString() + "_task= " + this.textContent + "; max-age = 0; path=/;";
		current_cookie = getCookie(i.toString() + "_task");
	}
	document.cookie = "undefined =" + getCookie("undefined") + "; max-age = 0; path=/;";
}