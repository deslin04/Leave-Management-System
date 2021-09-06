const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});



function validate() {

	var username = document.forms["Form"]["username"].value;
   var password = document.forms["Form"]["password"].value;
   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;



   if( username == "" ) {
	  alert( "Please provide your username!" );
	  document.Form.username.focus() ;
	  return false;
   }

   
	if (!filter.test(username)) {
	alert('Please provide a valid username');
	 document.Form.username.focus() ;
	 return false;
	  }

   if( password == "" ) {
	  alert( "Please provide your password!" );
	  document.Form.password.focus() ;
	  return false;
   }


   

}