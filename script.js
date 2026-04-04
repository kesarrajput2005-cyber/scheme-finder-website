let allSchemes = [];

// ✅ Load JSON
fetch('schemes.json')
    .then(response => response.json())
    .then(data => {
        console.log("JSON Loaded:", data); // DEBUG
        allSchemes = data.schemes;
        displaySchemes(allSchemes);
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
        document.getElementById("schemes").innerHTML = "❌ Failed to load data";
    });


// ✅ Display schemes
function displaySchemes(schemes) {
    const container = document.getElementById("schemes");
    container.innerHTML = "";

    if (!schemes || schemes.length === 0) {
        container.innerHTML = "<p>No schemes found</p>";
        return;
    }

    schemes.forEach(scheme => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${scheme.scheme_name}</h3>
            <p><b>Category:</b> ${scheme.category}</p>
            <p><b>State:</b> ${scheme.state}</p>
            <p>${scheme.details}</p>
        `;

        container.appendChild(card);
    });
}


// ✅ Category Filter
function findSchemes() {
    const category = document.getElementById("category").value.toLowerCase().trim();

    if (!category) {
        displaySchemes(allSchemes);
        return;
    }

    const filtered = allSchemes.filter(scheme =>
        scheme.category && scheme.category.toLowerCase() === category
    );

    displaySchemes(filtered);
}


// ✅ Eligibility Check (FINAL WORKING)
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const age = Number(document.getElementById("age").value);
    const job = document.getElementById("job").value.toLowerCase().trim();
    const income = Number(document.getElementById("income").value);

    const result = document.getElementById("result");

    if (!job) {
        result.innerHTML = "⚠️ Please select occupation";
        return;
    }

    let eligible = [];

    allSchemes.forEach(scheme => {
        const el = scheme.eligibility || {};
        let match = true;

        // ✅ Age check
        if (el.age_min !== undefined && age < el.age_min) match = false;
        if (el.age_max !== undefined && age > el.age_max) match = false;

        // ✅ Income check
        if (el.max_income !== undefined && income > el.max_income) match = false;

        // ✅ Job check (STRICT MATCH)
        if (el.job !== undefined && job !== el.job.toLowerCase()) match = false;

        // ✅ If all pass
        if (match) {
            eligible.push(scheme);
        }
    });

    if (eligible.length > 0) {
        result.innerHTML = "<h3>✅ Eligible Schemes:</h3>";
        displaySchemes(eligible);
    } else {
        result.innerHTML = "❌ No matching schemes found";
        document.getElementById("schemes").innerHTML = "";
    }
});