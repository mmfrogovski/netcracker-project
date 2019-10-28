login = document.querySelector(".sign-up");

login.addEventListener('click', e=>{
  document.querySelector(".overlay").style.display='block';
  document.querySelector(".close").addEventListener('click', e=>{
  	document.querySelector(".overlay").style.display = 'none';
  })
});
