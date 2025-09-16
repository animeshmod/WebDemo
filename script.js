document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchSection = document.getElementById('search-section');
    const loader = document.getElementById('loader');
    const resultsSection = document.getElementById('results-section');
    const tableWrapper = document.getElementById('table-wrapper');
    const resultMessage = document.getElementById('result-message');
    const sqlQueryText = document.getElementById('sql-query-text');
    const nextOptions = document.getElementById('next-options');

    // Hide the initial search form and show the loader
    searchSection.style.display = 'none';
    loader.classList.remove('hidden');

    // Simulate a network request
    setTimeout(() => {
        // Define the data
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
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';

        data.forEach(row => {
            tableHTML += '<tr>';
            headers.forEach(header => {
                tableHTML += `<td>${row[header]}</td>`;
            });
            tableHTML += '</tr>';
        });

        tableHTML += '</tbody></table>';
        
        loader.classList.add('hidden');
        
        resultMessage.textContent = "Here's the sample data for your search";

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

        tableWrapper.innerHTML = tableHTML;

        resultsSection.classList.remove('hidden');
        nextOptions.classList.remove('hidden');

        // Add event listeners to the newly displayed options
        addEventListenersToOptions();

    }, 1500); // 1.5 second delay
});

function addEventListenersToOptions() {
    const optionButtons = document.querySelectorAll('#options-list li');
    optionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent;
            if (buttonText === 'Add Feature to Existing Aggregation') {
                displayAggregationTables();
            }
        });
    });
}

function displayAggregationTables() {
    const mainContent = document.querySelector('main');
    
    // New HTML content for the modern, card-based aggregation page
    const newPageHTML = `
        <section id="aggregation-section" style="animation: fadeIn 0.8s ease-in-out; width: 100%;">
            <div class="section-header">
                <h2>This feature can be aggregated with one of the datasets listed.</h2>
                <p>Select a dataset below to proceed with the feature aggregation.</p>
            </div>
            <div id="aggregation-list">
                <div class="dataset-card" role="button" tabindex="0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    <h3>Customer Purchase Detail Data</h3>
                    <p>Contains raw, transaction-level customer purchase information and history.</p>
                </div>
                <div class="dataset-card" role="button" tabindex="0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <h3>Customer Behavior Data</h3>
                    <p>Includes user interactions, page views, and other behavioral events.</p>
                </div>
                <div class="dataset-card" role="button" tabindex="0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8a6 6 0 0 0-8.1 0l-6.2 6.2a2 2 0 0 0 0 2.8l2.8 2.8a2 2 0 0 0 2.8 0L18.7 8z"></path></svg>
                    <h3>Customer Purchase Features For Model</h3>
                    <p>A curated set of pre-engineered features ready for model training.</p>
                </div>
            </div>
        </section>
    `;
    
    mainContent.innerHTML = newPageHTML;
    // After creating the cards, add listeners to them
    addEventListenersToDatasetCards();
}

function addEventListenersToDatasetCards() {
    const datasetCards = document.querySelectorAll('.dataset-card');
    datasetCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardTitle = card.querySelector('h3').textContent;
            if (cardTitle === 'Customer Purchase Features For Model') {
                displayFeatureTable();
            }
            // Add other 'else if' conditions here for other cards
        });
    });
}

function displayFeatureTable() {
    // Data from the provided document
    const purchaseFeaturesData = [
        { "Acct ID": 1001, "Feature 1": 5, "Feature 2": true, "Feature 3": "1/15/2024", "Feature 4": "Electronics", "Feature 5": 0.1, "Feature 6": "Shipped", "Feature 7": true, "Feature 8": 120.5, "Feature 9": 4, "Average purchase amount over 90 days": 530 },
        { "Acct ID": 1002, "Feature 1": 2, "Feature 2": false, "Feature 3": "2/20/2024", "Feature 4": "Home Goods", "Feature 5": 0.05, "Feature 6": "Pending", "Feature 7": true, "Feature 8": 35.75, "Feature 9": 3, "Average purchase amount over 90 days": 1050 },
        { "Acct ID": 1003, "Feature 1": 1, "Feature 2": true, "Feature 3": "3/1/2024", "Feature 4": "Books", "Feature 5": 0, "Feature 6": "Delivered", "Feature 7": false, "Feature 8": 22, "Feature 9": 5, "Average purchase amount over 90 days": 5225 },
        { "Acct ID": 1004, "Feature 1": 7, "Feature 2": false, "Feature 3": "3/10/2024", "Feature 4": "Apparel", "Feature 5": 0.15, "Feature 6": "Processing", "Feature 7": true, "Feature 8": 65.2, "Feature 9": 4, "Average purchase amount over 90 days": 321 },
        { "Acct ID": 1005, "Feature 1": 3, "Feature 2": true, "Feature 3": "4/5/2024", "Feature 4": "Toys", "Feature 5": 0.2, "Feature 6": "Shipped", "Feature 7": false, "Feature 8": 48.99, "Feature 9": 3, "Average purchase amount over 90 days": 3575 },
        { "Acct ID": 1006, "Feature 1": 4, "Feature 2": false, "Feature 3": "4/12/2024", "Feature 4": "Food & Drink", "Feature 5": 0, "Feature 6": "Delivered", "Feature 7": true, "Feature 8": 15.6, "Feature 9": 5, "Average purchase amount over 90 days": 4221 },
        { "Acct ID": 1007, "Feature 1": 6, "Feature 2": true, "Feature 3": "5/1/2024", "Feature 4": "Sports", "Feature 5": 0.1, "Feature 6": "Pending", "Feature 7": true, "Feature 8": 99.99, "Feature 9": 4, "Average purchase amount over 90 days": 9150 },
        { "Acct ID": 1008, "Feature 1": 2, "Feature 2": false, "Feature 3": "5/18/2024", "Feature 4": "Beauty", "Feature 5": 0.08, "Feature 6": "Shipped", "Feature 7": false, "Feature 8": 28.5, "Feature 9": 3, "Average purchase amount over 90 days": 8665 },
        { "Acct ID": 1009, "Feature 1": 8, "Feature 2": true, "Feature 3": "6/3/2024", "Feature 4": "Automotive", "Feature 5": 0.25, "Feature 6": "Delivered", "Feature 7": true, "Feature 8": 150, "Feature 9": 5, "Average purchase amount over 90 days": 2135 },
        { "Acct ID": 1010, "Feature 1": 1, "Feature 2": false, "Feature 3": "6/11/2024", "Feature 4": "Office", "Feature 5": 0, "Feature 6": "Processing", "Feature 7": false, "Feature 8": 10.25, "Feature 9": 2, "Average purchase amount over 90 days": 2145 }
    ];

    const mainContent = document.querySelector('main');
    let tableHTML = '<table>';
    
    // Create headers
    const headers = Object.keys(purchaseFeaturesData[0]);
    tableHTML += '<thead><tr>';
    headers.forEach(h => tableHTML += `<th>${h}</th>`);
    tableHTML += '</tr></thead>';

    // Create rows
    tableHTML += '<tbody>';
    purchaseFeaturesData.forEach(row => {
        tableHTML += '<tr>';
        headers.forEach(header => {
            tableHTML += `<td>${row[header]}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';

    const newPageHTML = `
        <section class="card" style="animation: fadeIn 0.8s ease-in-out; width: 100%;">
            <div class="section-header">
                <h2>Customer Purchase Features For Model</h2>
                <p>The following features have been generated and are ready for use.</p>
            </div>
            <div class="table-responsive-wrapper">
                ${tableHTML}
            </div>
            <div class="table-actions">
                <button class="btn btn-secondary">Do Nothing</button>
                <button class="btn btn-secondary">Export as CSV</button>
                <button class="btn btn-primary">Publish To Production</button>
            </div>
        </section>
    `;

    mainContent.innerHTML = newPageHTML;
}