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

// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Get the search form, input field, result div, and print button from the DOM
    const searchForm = document.getElementById('searchForm');
    const queryInput = document.getElementById('query');
    const resultDiv = document.getElementById('result');
    const printButton = document.getElementById('printButton'); // New print button element

    // Check if elements are found in the DOM
    console.log(searchForm, queryInput, resultDiv, printButton);

    if (searchForm && queryInput && resultDiv && printButton) {
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

                // Show the print button
                printButton.style.display = 'inline-block';
            } else {
                // If not found, show an error message
                resultDiv.style.display = 'block';
                resultDiv.classList.remove('alert-info'); // Remove success class if present
                resultDiv.classList.add('alert-danger'); // Add error class
                resultDiv.innerHTML = 'Word not found in the dictionary.';

                // Hide the print button if there's an error
                printButton.style.display = 'none';
            }
        });

        // Add event listener for the print button
        printButton.addEventListener('click', function () {
            printResult();
        });
    } else {
        console.error("One or more elements not found in the DOM");
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

