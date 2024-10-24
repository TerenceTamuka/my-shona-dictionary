// Shona-English Dictionary
const dictionary = {
    "hello": "mhoro",
    "goodbye": "chisarai zvakanaka",
    "love": "rudo",
    "water": "mvura",
    "rain": "kunaya",
    "food": "chikafu",
    // Add more words here (total ~300)
};

// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Get the search form, input field, and result div from the DOM
    const searchForm = document.getElementById('searchForm');
    const queryInput = document.getElementById('query');
    const resultDiv = document.getElementById('result');

    // Check if elements are found in the DOM
    console.log(searchForm, queryInput, resultDiv);

    if (searchForm && queryInput && resultDiv) {
        // Add event listener for form submission
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the form from submitting and reloading the page

            // Get the user's query, convert it to lowercase to match the dictionary
            const query = queryInput.value.toLowerCase().trim();

            // Log the query for debugging
            console.log("Searched Word:", query);

            // Check if the word is in the dictionary
            if (dictionary[query]) {
                // If found, display the corresponding Shona word
                resultDiv.style.display = 'block';
                resultDiv.classList.remove('alert-danger'); // Remove error class if present
                resultDiv.classList.add('alert-info'); // Add success/info class
                resultDiv.innerHTML = `<strong>Shona:</strong> ${dictionary[query]}`;
            } else {
                // If not found, show an error message
                resultDiv.style.display = 'block';
                resultDiv.classList.remove('alert-info'); // Remove success class if present
                resultDiv.classList.add('alert-danger'); // Add error class
                resultDiv.innerHTML = 'Word not found in the dictionary.';
            }
        });
    } else {
        console.error("One or more elements not found in the DOM");
    }
});
