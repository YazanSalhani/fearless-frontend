window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/states/';

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            const selectTag = document.getElementById('state');

            data.states.forEach( async (state) => {
                const option = document.createElement('option');
                option.value = state.abbreviation;
                option.innerHTML = state.name;
                selectTag.appendChild(option);
            })

        } else {
            throw new Error(`Error retrieving states: ${response.status} ${response.statusText}`)
        }

        const formTag = document.getElementById('create-location-form');
        formTag.addEventListener("submit", async event => {
            event.preventDefault();

            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));

            const locationUrl = 'http://localhost:8000/api/locations/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const locationResponse = await fetch(locationUrl, fetchConfig);
            if (locationResponse.ok) {
                formTag.reset();
                const newLocation = await locationResponse.json();
                console.log(newLocation);
            }
        });
    } catch (e){
        console.error("error", e)
    }
});
