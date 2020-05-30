//Check for session
if ('style' in localStorage) {

  // Check if correct style
  if (localStorage.getItem('style') !== document.getElementById('websiteStyle').options[document.getElementById('websiteStyle').selectedIndex].value) {
    switch (localStorage.getItem('style')) {
      case 'grey':
        document.getElementById('websiteStyle').selectedIndex = 0;
        document.getElementById('stylesheet').href = './css/grey_styles.css';
        localStorage.setItem('style', 'grey');
        break;
      
      case 'blue':
        document.getElementById('websiteStyle').selectedIndex = 1;
        document.getElementById('stylesheet').href = './css/blue_styles.css';
        localStorage.setItem('style', 'blue');
        break;
    }
  }

} else {
  localStorage.setItem('style', document.getElementById('websiteStyle').options[document.getElementById('websiteStyle').selectedIndex].value);
}

// Change mode
document.getElementById('websiteStyle').onchange = function () {
  switch (document.getElementById('websiteStyle').options[document.getElementById('websiteStyle').selectedIndex].value) {
    case 'grey':
      document.getElementById('stylesheet').href = './css/grey_styles.css';
      localStorage.setItem('style', 'grey');
      break;
    
    case 'blue':
      document.getElementById('stylesheet').href = './css/blue_styles.css';
      localStorage.setItem('style', 'blue');
      break;
  }
};

// Open modal
document.getElementById('newNote').onclick = function() {
  document.getElementById('newNoteModal').style.display = 'grid';
}

document.getElementById('cancel').onclick = function() {
  document.getElementById('newNoteModal').style.display = 'none';
}