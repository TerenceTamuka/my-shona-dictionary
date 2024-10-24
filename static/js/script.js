const dictionary = {
    "hello": "mhoro",
    "goodbye": "chisarai zvakanaka",
    "love": "rudo",
    "water": "mvura",
    "rain": "kunaya",
    // Add more words here (total ~300)
};

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    const searchForm = document.getElementById('searchForm');
    const queryInput = document.getElementById('query');
    const resultDiv = document.getElementById('result');

    // Debugging: Check if elements are found
    console.log(searchForm, queryInput, resultDiv);

    if (searchForm && queryInput && resultDiv) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent form from reloading the page

            const query = queryInput.value.toLowerCase(); // Get input and convert to lowercase
            
            // Debugging: Log the searched word
            console.log("Searched Word:", query);

            // Check if the word is in the dictionary
            if (dictionary[query]) {
                resultDiv.style.display = 'block';
                resultDiv.classList.remove('alert-danger'); // Remove error class if present
                resultDiv.classList.add('alert-info');
                resultDiv.innerHTML = `<strong>Shona:</strong> ${dictionary[query]}`;
            } else {
                resultDiv.style.display = 'block';
                resultDiv.classList.remove('alert-info'); // Remove success class if present
                resultDiv.classList.add('alert-danger');
                resultDiv.innerHTML = 'Word not found in the dictionary.';
            }
        });
    } else {
        console.error("One or more elements not found");
    }
});
