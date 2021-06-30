$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
   
     if (e.type === 'keyup') {
   if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
       if( $this.val() === '' ) {
       label.removeClass('active highlight'); 
   } else {
       label.removeClass('highlight');   
   }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
       label.removeClass('highlight'); 
   } 
        else if( $this.val() !== '' ) {
       label.addClass('highlight');
   }
      }
   
  });
   
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
   
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

function login(){
  var email = document.getElementById('lemail').value;
  var password = document.getElementById('lpassword').value;
  var has_mentor = document.getElementById('lhas_mentor').value;
  if (has_mentor==""){
    has_mentor="false"
  }

  var http = new XMLHttpRequest();
  var params = "email="+email+"&password="+password+"&has_mentor="+has_mentor;

  http.open('POST','http://101.53.147.32:9002/login',true);
  http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  http.onreadystatechange = function(){
    if(http.readyState==4 && http.status==200){
      alert("Login Successfull!");
      var jwt = (http.responseText).slice(1,-1);
      localStorage.setItem("jwt",jwt);
      if (has_mentor=="false"){
        window.location.href="createMentee.html";
      } else {
        window.location.href="dashboard.php";
      }
    } else if (http.readyState==4 && http.status==401){
      alert(http.responseText)
    }
  }
  http.send(params);
};

function registration(){
	var email = document.getElementById('remail').value;
	var name = document.getElementById('rname').value;
	var password = document.getElementById('rpassword').value;
	var cpassword = document.getElementById('rcpassword').value;

	if (password != cpassword){
		alert('Passwords doesnt match. Please Retry!');
		return;
	}
	params = "email="+email+"&name="+name+"&password="+password;

	var http = new XMLHttpRequest();

	http.open('POST','http://101.53.147.32:9002/register',true);
	http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	
	http.onreadystatechange = function(){
		if(http.readyState==4 && http.status==200){
			alert("Registation Successfull!");
			window.location.href="/login.html";
		} else if (http.readyState==4){
			alert(http.responseText);
			window.location.href="/login.html";
		}
	}
	http.send(params);
};
