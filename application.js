/*global Spinner*/
/*exported oApplication*/

/*
NOTE: Script.onload does not work properly on IE9 or Chrome 26!
It fires immediately instead of waiting for the script to execute.

*** Need to find a better solution to this ***
*/

var oApplication = { // Application is an object

	load: function(src, id, libs, theme, bindingSyntax, resourceRoots, callback) {
		var opts = {
			length: 12, // The length of each line
			width: 4, // The line thickness
			radius: 12, // The radius of the inner circle
		};

		var target = document.getElementById("spinner_container");
		this.spinner = new Spinner(opts).spin(target);
		setTimeout(this.loadSAPUI5(src, id, libs, theme, bindingSyntax, resourceRoots, callback));
	},

	loadSAPUI5: function (src, id, libs, theme, bindingSyntax, resourceRoots, callback) {
		var script, r, firstScript;

		r = false;
		script = document.createElement("script");
		script.type = "text/javascript";
		script.src = src;
		script.id = id;
		script.setAttribute("data-sap-ui-libs", libs);
		script.setAttribute("data-sap-ui-theme", theme);
		script.setAttribute("data-sap-ui-xx-bindingSyntax", bindingSyntax);
		script.setAttribute("data-sap-ui-resourceroots", resourceRoots);
		script.setAttribute("data-sap-ui-preload", "async");

		script.onload = script.onreadystatechange = function() {
			//console.log( this.readyState ); //uncomment this line to see which ready states are called.
			if ( !r && (!this.readyState || this.readyState === "complete") ){
				r = true;

				callback();
			}
		};
		firstScript = document.getElementsByTagName("script")[0];
		firstScript.parentElement.insertBefore(script, firstScript);
	},

	onSAPUI5Loaded: function(){
		$("body").fadeOut("slow",function() {
			//this.spinner.stop();
			$("#content").empty();
			$("#spinner_container").removeAttr("style");

			// Wait for UI to load
			sap.ui.getCore().attachInit(function() {

				// Start UI Component
				new sap.ui.core.ComponentContainer({
					name: "sap.ui.demo"
				}).placeAt("content");

			});

			$("body").fadeIn("slow");
		});
	}

};