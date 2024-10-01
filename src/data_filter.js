const data = JSON.parse(localStorage.getItem('uploadedData'));
function clearUploadedData() {
    localStorage.removeItem('uploadedData'); // Removes only the 'uploadedData' key
    alert('Uploaded data cleared from localStorage!');
}
function getCompletedTrainingCount() {
    console.log(data);
    const trainingCount = {};
  
    data.forEach(person => {
      const uniqueTrainings = new Set();
      
      person.completions.forEach(completion => {
        // Check if this training was already counted for this person
        if (!uniqueTrainings.has(completion.name)) {
          uniqueTrainings.add(completion.name);
          if (trainingCount[completion.name]) {
            trainingCount[completion.name]++;
          } else {
            trainingCount[completion.name] = 1;
          }
        }
      });
    });
  
    // Create a JSON blob from the trainingCount object
    const jsonBlob = new Blob([JSON.stringify(trainingCount, null, 2)], { type: 'application/json' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(jsonBlob);
    link.download = 'training_count.json'; // Set the file name for the download
    document.body.appendChild(link);
    link.click(); // Simulate a click to initiate the download
    document.body.removeChild(link); // Clean up by removing the link
  }
function getPeopleByFiscalYear() {
    let fiscalYear = parseInt(document.getElementById('year').value, 10);
    let trainingInput = document.getElementById('training'); // Get the input element
    const trainingString = trainingInput.value; // Get the value of the input element
    const trainings = trainingString.split(',').map(training => training.trim()); // Split and trim the string
    console.log(trainings);

    const startDate = new Date(`${fiscalYear - 1}-07-01`);
    const endDate = new Date(`${fiscalYear}-06-30`);
  
    const results = {};
  
    trainings.forEach(trainingName => {
      results[trainingName] = [];
    });
  
    data.forEach(person => {
      person.completions.forEach(completion => {
        if (trainings.includes(completion.name)) {
          const completionDate = new Date(completion.timestamp);
          if (completionDate >= startDate && completionDate <= endDate) {
            results[completion.name].push(person.name);
          }
        }
      });
    });
  
        // Create a JSON blob from the fiscalYear object
        const fjsonBlob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });

        // Create a download link
        const flink = document.createElement('a');
        flink.href = URL.createObjectURL(fjsonBlob);
        flink.download = 'Fiscal_year.json'; // Set the file name for the download
        document.body.appendChild(flink);
        flink.click(); // Simulate a click to initiate the download
        document.body.removeChild(flink); // Clean up by removing the link
  }
  

  function getExpiringTrainings() {
    // Get the date value from the input field
    let checkDateValue = document.getElementById('expiry');
    let checkDateInput = checkDateValue.value; // Use .value to get the input value
    let checkDate = new Date(checkDateInput); // Create a Date object from the input value

    const results = [];
  
    data.forEach(person => {
        const expiringTrainings = [];
  
        person.completions.forEach(completion => {
            if (completion.expires) { // Check if there is an expiration date
                const expirationDate = new Date(completion.expires);
                const oneMonthAfter = new Date(checkDate);
                oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
  
                // Check if the training is expired or will expire soon
                if (expirationDate < checkDate) {
                    expiringTrainings.push({
                        name: completion.name,
                        status: 'expired'
                    });
                } else if (expirationDate <= oneMonthAfter) {
                    expiringTrainings.push({
                        name: completion.name,
                        status: 'expires soon'
                    });
                }
            }
        });
  
        if (expiringTrainings.length > 0) {
            results.push({
                name: person.name,
                trainings: expiringTrainings
            });
        }
    });
  
    // Create a JSON blob from the Expiry object
    const gjsonBlob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });

    // Create a download link
    const glink = document.createElement('a');
    glink.href = URL.createObjectURL(gjsonBlob);
    glink.download = 'Expiry.json'; // Set the file name for the download
    document.body.appendChild(glink);
    glink.click(); // Simulate a click to initiate the download
    document.body.removeChild(glink); // Clean up by removing the link
}

  