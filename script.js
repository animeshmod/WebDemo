document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchForm = document.getElementById('searchForm');
    const resultsWrapper = document.getElementById('results-wrapper');
    const outputContainer = document.getElementById('output-container');
    const resultMessage = document.getElementById('result-message');
    const infoContainer = document.getElementById('info-container');
    const sqlQueryText = document.getElementById('sql-query-text');
    const nextOptions = document.getElementById('next-options');

    // Hide the initial search form
    searchForm.style.display = 'none';

    // Define the data from the attached document as a JavaScript array of objects
    const data = [
        {"Sr. Number": 1, "Account Id": 1001, "Average Purchase Value by Region For Last 90 Days": 530},
        {"Sr. Number": 2, "Account Id": 1002, "Average Purchase Value by Region For Last 90 Days": 1050},
        {"Sr. Number": 3, "Account Id": 1003, "Average Purchase Value by Region For Last 90 Days": 5225},
        {"Sr. Number": 4, "Account Id": 1004, "Average Purchase Value by Region For Last 90 Days": 321},
        {"Sr. Number": 5, "Account Id": 1005, "Average Purchase Value by Region For Last 90 Days": 3575},
        {"Sr. Number": 6, "Account Id": 1005, "Average Purchase Value by Region For Last 90 Days": 4221},
        {"Sr. Number": 7, "Account Id": 1006, "Average Purchase Value by Region For Last 90 Days": 9150},
        {"Sr. Number": 8, "Account Id": 1007, "Average Purchase Value by Region For Last 90 Days": 8665},
        {"Sr. Number": 9, "Account Id": 1008, "Average Purchase Value by Region For Last 90 Days": 2135},
        {"Sr. Number": 10, "Account Id": 1009, "Average Purchase Value by Region For Last 90 Days": 2145}
    ];

    let tableHTML = '<table><thead><tr>';
    
    // Create table headers from the keys of the first object
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';

    // Create table rows and cells from the data
    data.forEach(row => {
        tableHTML += '<tr>';
        headers.forEach(header => {
            tableHTML += `<td>${row[header]}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    // Set and display the message
    resultMessage.textContent = "Here's the sample 10 result for your search";
    resultMessage.style.display = 'block';

    // Set the SQL Query Used text
    const sqlQuery = `SELECT
    TRUNC(Purchase_Date) AS transaction_date,
    AVG(Purchase_Value) AS daily_average_sales
FROM
    "Customer Purchase Table"
WHERE
    Purchase_Date >= TRUNC(SYSDATE) - 90
GROUP BY
    TRUNC(Purchase_Date)
ORDER BY
    transaction_date;`;
    sqlQueryText.textContent = sqlQuery;

    // Display the generated table
    outputContainer.innerHTML = outputContainer.innerHTML + tableHTML;

    // Show the results wrapper and info container
    resultsWrapper.classList.remove('hidden');
    infoContainer.classList.remove('hidden');

    // Show the next options
    nextOptions.classList.remove('hidden');
});