//global variable
var start_index = 0;

function populateImage(platform, index){
  console.log(platform, index);
  index += 1;
  platform = platform.trim();
  var elem = document.getElementById("myimg"+index);
  if(platform == "codechef")
  {
    elem.src= "./img/cc32.jpg";  
  }
  else if(platform == "codeforces")
  {
    elem.src= "./img/cf32.png";
  }
  else if(platform == "hackerearth")
  {
    elem.src= "./img/he32.png"; 
  }
}
function displayData(obj){
  var i = 0;
  for(i=0 ; i<5; i++)
  {
    var j = i+1;
    //contest code
    var elem = document.getElementById('span'+j);
    elem.innerHTML = obj.result.upcoming_contests[start_index].code; 
    //contest start time
    var elem2 = document.getElementById('minispan'+j);
    elem2.innerHTML = obj.result.upcoming_contests[start_index].start_time;
    //contest image
    populateImage(obj.result.upcoming_contests[start_index].platform,i);
    start_index += 1;
  }

}
document.addEventListener('DOMContentLoaded', function() {
  var xhr = new XMLHttpRequest();
  var obj;
  xhr.onreadystatechange = function()
  {
    if(xhr.readyState == 4 )
    {
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
      {
        obj = JSON.parse(xhr.responseText);
        //we got the json object
        //now fill all spans with json data through iteration
        displayData(obj);
        
      }
      else
      {
        alert("Request was unsuccessfull");
      }
    }
  };
  xhr.open("get","https://tranquil-caverns-50595.herokuapp.com/",true);
  xhr.send(null);



  var checkButton = document.getElementById('showmorebtn');
  checkButton.addEventListener('click', function() 
  {

    displayData(obj);

  }, false);




}, false);