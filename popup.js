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

document.addEventListener('DOMContentLoaded', function() {
 /*
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();

    });
  }, false);*/

  var xhr = new XMLHttpRequest();;
  xhr.onreadystatechange = function()
  {
    if(xhr.readyState == 4 )
    {
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
      {
        var obj = JSON.parse(xhr.responseText);
        //we got the json object
        //now fill all spans with json data through iteration
        var i = 0;
        for(i=0 ; i<5; i++)
        {
          var j = i+1;
          //contest code
          var elem = document.getElementById('span'+j);
          elem.innerHTML = obj.result.upcoming_contests[i].code; 
          //contest start time
          var elem2 = document.getElementById('minispan'+j);
          elem2.innerHTML = obj.result.upcoming_contests[i].start_time;
          //contest image
          populateImage(obj.result.upcoming_contests[i].platform,i);
        }
        
      }
      else{
        alert("Request was unsuccessfull");
      }
    }
  };
  xhr.open("get","https://tranquil-caverns-50595.herokuapp.com/",true);
  xhr.send(null);
}, false);