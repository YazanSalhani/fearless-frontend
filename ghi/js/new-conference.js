window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/';

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const selectTag = document.getElementById('location');
            data.locations.forEach( async (location) => {
                const option = document.createElement('option');
                option.value = location.id;
                option.innerHTML = location.name;
                selectTag.append(option);
            });
        } else {
            throw new Error(`Error retrieving locations: ${response.status} ${response.statusText}`);
        }
        const formTag = document.getElementById('create-conference-form');
        formTag.addEventListener('submit', async event =>{
            event.preventDefault();

            const formData = new FormData(formTag);

            const json = JSON.stringify(Object.fromEntries(formData));
            const conferenceUrl = 'http://localhost:8000/api/conferences/';
            const fetchConfig = {
                method: 'post',
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const conferenceResponse = await fetch(conferenceUrl, fetchConfig);
            if (conferenceResponse.ok) {
                formTag.reset();
                const newconference = await conferenceResponse.json()
            }
        })
    } catch (e) {
        console.error("error", e);
    }
});
