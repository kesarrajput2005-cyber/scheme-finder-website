async function findSchemes() {
    let income = Number(document.getElementById("income").value);

    if (!income) {
        document.getElementById("result").innerHTML = "Please enter income";
        return;
    }

    try {
        let response = await fetch("data/schemes.json");
        let schemes = await response.json();

        let output = "";

        schemes.forEach(scheme => {
            if (income <= scheme.income_limit) {
                output += `
                    <div class="card">
                        <h3>${scheme.name}</h3>
                        <p>Category: ${scheme.category}</p>
                        <p>Benefit: ${scheme.benefit}</p>
                    </div>
                `;
            }
        });

        if (output === "") {
            output = "<p>No schemes found</p>";
        }

        document.getElementById("result").innerHTML = output;

    } catch (error) {
        document.getElementById("result").innerHTML = "Error loading data";
    }
}