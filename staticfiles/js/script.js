// Shona-English Dictionary
const dictionary = {
    "hello": "mhoro",
    "goodbye": "chisarai zvakanaka",
    "love": "rudo",
    "water": "mvura",
    "rain": "kunaya",
    "food": "chikafu",
    "sunlight": "mushana",
    // Add more words here (total ~300)
};

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Get the search form, input field, result div, and print button from the DOM
    const searchForm = document.getElementById('searchForm');
    const queryInput = document.getElementById('query');
    const resultDiv = document.getElementById('result');
    const printButton = document.getElementById('printButton');

    if (searchForm && queryInput && resultDiv && printButton) {
        // Add event listener for form submission
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the form from submitting and reloading the page

            // Get the user's query, convert it to lowercase to match the API requirements
            const query = queryInput.value.toLowerCase().trim();

            // Log the query for debugging
            console.log("Searched Word:", query);

            // Fetch the translation from the Django API with CSRF token
            fetch(`/api/dictionary/?query=${query}`, {
                headers: {
                    'X-CSRFToken': getCSRFToken() // Add CSRF token to headers
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Word not found in the dictionary.');
                }
                return response.json();
            })
            .then(data => {
                // Display the result if found
                resultDiv.style.display = 'block';
                resultDiv.classList.remove('alert-danger'); // Remove error class if present
                resultDiv.classList.add('alert-info'); // Add success/info class
                resultDiv.innerHTML = `<strong>Shona:</strong> ${data.shona_translation}`;

                // Show the print button
                printButton.style.display = 'inline-block';
            })
            .catch(error => {
                // Show error if the word is not found
                resultDiv.style.display = 'block';
                resultDiv.classList.remove('alert-info'); // Remove success class if present
                resultDiv.classList.add('alert-danger'); // Add error class
                resultDiv.innerHTML = error.message;

                // Hide the print button if there's an error
                printButton.style.display = 'none';
            });
        });

        // Add event listener for the print button
        printButton.addEventListener('click', function () {
            printResult();
        });
    } else {
        console.error("One or more elements not found in the DOM");
    }

    // Define the getCSRFToken function
    function getCSRFToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]').value;
    }

    // Define the printResult function
    function printResult() {
        const printContent = resultDiv.innerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
});