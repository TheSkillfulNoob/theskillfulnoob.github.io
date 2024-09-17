function includeHTML() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'header.html', true); // Path is relative to index.html
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          document.getElementById('header').innerHTML = xhr.responseText;
      }
  };
  xhr.send();
}

// Call the function
includeHTML();