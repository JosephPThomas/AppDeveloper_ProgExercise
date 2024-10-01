const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');
const data = []; // Array to hold the data from the JSON file

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

// Remove highlight when item is dragged out of drop area
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', handleFiles, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles({ target: { files } });
}

function handleFiles(event) {
    const files = event.target.files; // FileList object
    const file = files[0]; // Get the first file

    if (file && (file.type === "application/json" || file.type === "application/pdf" || file.type === "text/plain")) {
        const reader = new FileReader();

        // Define what happens when the file is read
        reader.onload = function(event) {
                try {
                    const json = JSON.parse(event.target.result); // Parse the JSON data
                    data.push(...json); // Add the data to the array
                    localStorage.setItem('uploadedData', JSON.stringify(data));
                    alert("File uploaded Succesfully!");
                    window.location.href = './src/dataFiltering.html';


                } catch (error) {
                    alert('Error parsing JSON: ' + error.message);
                }
        };

        reader.readAsText(file); // Read file as text
    } else {
        output.textContent = 'Please upload a valid JSON, PDF, or TXT file.';
    }
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

