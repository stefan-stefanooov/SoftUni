(function () {

	$(document).ready(function () {
		if (document.localStorage.name) {
			printGreetings();
		} else{
			printInputBox();
			var name = getName();
			setName(name);
		};
	});

	function printGreetings (){
		var greetings = "<h1>" + "Hello " + document.localStorage.name + "!</h1>";
		$("#wrapper").html(greetings);
	}

	function getName (){
		$("#wrapper")
	}

	function printInputBox (){
		var inputBox  = $("<input type=\"text\"><input type=\"button\" value=\"Register\"");
		$()
	}

}();)