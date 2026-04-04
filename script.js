async function findSchemes() {

    // Get input values
    let income = Number(document.getElementById("income").value);
    let category = document.getElementById("category").value;

    // Validation
    if (!income) {
        document.getElementById("schemes").innerHTML = "Please enter income";
        return;
    }

    try {
        // Fetch JSON data
        let response = await fetch("data/schemes.json");
        let data = await response.json();

        // Access array inside JSON
        let schemes = data.schemes;

        let output = "";

        // Loop through each scheme
        schemes.forEach(scheme => {

            // Income condition
            let incomeMatch = true;
            if (scheme.eligibility.max_income) {
                incomeMatch = income <= scheme.eligibility.max_income;
            }

            // Category condition
            let categoryMatch = true;
            if (category) {
                categoryMatch = scheme.category.toLowerCase().includes(category.toLowerCase());
            }

            // Final check
            if (incomeMatch && categoryMatch) {

                output += `
                    <div class="card">
                        <h3>${scheme.scheme_name}</h3>
                        <p><b>Category:</b> ${scheme.category}</p>
                        <p><b>Benefits:</b> ${scheme.benefits}</p>
                        <button onclick="showDetails('${scheme.scheme_name}')">
                            View Details
                        </button>
                    </div>
                `;
            }
        });

        // If no results
        if (output === "") {
            output = "<p>No schemes found</p>";
        }

        // Show result
        document.getElementById("schemes").innerHTML = output;

    } catch (error) {
        document.getElementById("schemes").innerHTML = "Error loading data";
    }
}


// 🔥 Show Details Function
async function showDetails(name) {

    let response = await fetch("data/schemes.json");
    let data = await response.json();
    let schemes = data.schemes;

    let scheme = schemes.find(s => s.scheme_name === name);

    if (scheme) {
        alert(
            `📌 ${scheme.scheme_name}\n\n` +
            `Category: ${scheme.category}\n\n` +
            `Benefits: ${scheme.benefits}\n\n` +
            `Documents: ${scheme.documents.join(", ")}\n\n` +
            `Steps: ${scheme.steps.join(" → ")}\n\n` +
            `Details: ${scheme.details}`
        );
    }
}