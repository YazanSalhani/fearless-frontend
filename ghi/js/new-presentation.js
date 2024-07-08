window.addEventListener('DOMContentLoaded', async () => {

    const confUrl = 'http://localhost:8000/api/conferences/'

    try {
        const response = await fetch(confUrl);

        if (response.ok) {
            const data = await response.json();
            const selectTag = document.getElementById("conference");

            data.conferences.forEach(async conference => {
                const option = document.createElement("option");
                option.value = conference.id;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            });

            const formTag = document.getElementById("create-presentation-form");
            formTag.addEventListener("submit", async (event) => {
                event.preventDefault();

                const formData = new FormData(formTag);
                const dataObject = Object.fromEntries(formData);
                const json = JSON.stringify(dataObject);
                const conferenceId = formData.get("conference")

                const presUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
                const fetchConfig = {
                    method: "POST",
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await fetch(presUrl, fetchConfig);
                if (response.ok) {
                    formTag.reset();
                    const newPres = await response.json();
                    console.log(newPres);
                } else {
                    throw new Error(
                        `Error posting presentation: ${response.status} ${response.statusText}`
                    );
                }
            });
        } else {
            throw new Error(
                `Error retrieving conferences: ${response.status} ${response.statusText}`
            );
        }
    } catch (e) {
        console.error("error", e);
    }
})
