function createCard(name, description, pictureUrl, start, end, location) {
    return `
      <div class="card" style="box-shadow: 5px 5px 5px grey; margin-top: 20px">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer text-body-secondary">
        ${start} - ${end}
      </div>
      </div>
    `;
  }

function dateFormat(date) {
    const startMonth = date.getUTCMonth() + 1;
    const startDate = date.getUTCDate();
    const startYear = date.getUTCFullYear();
    return `${startMonth}/${startDate}/${startYear}`
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/t';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        throw new Error('Response not ok')
      } else {
        const data = await response.json();

        let count = 1;

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const location = details.conference.location.name;

            const startDate = new Date(details.conference.starts);
            const start = dateFormat(startDate);
            const endDate = new Date(details.conference.ends);
            const end = dateFormat(endDate);

            const html = createCard(title, description, pictureUrl, start, end, location);

            let col;
            if (count === 1) {
                col = '.col1';
                count ++;
            } else if (count === 2) {
                col = '.col2';
                count ++;
            } else if (count === 3) {
                col = '.col3';
                count = 1;
            }
            const column = document.querySelector(col);
            column.innerHTML += html;
          }
        }

      }
    } catch (error) {
        console.error("erorr",error);
      // Figure out what to do if an error is raised
      const errorAlert = document.getElementById("error-alert");
      errorAlert.classList.remove('d-none');
    }

  });
