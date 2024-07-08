
const createCard = (name, description, pictureUrl, starts, ends, location) => {
  return `
    <div class="card" style="box-shadow: 5px 5px 5px grey; margin-top: 20px;">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer text-secondary">
          ${starts} - ${ends}
      </div>
    </div>
  `;
}


// const formatDate = (date) => {
//   const month = date.getUTCMonth() + 1;
//   const day = date.getUTCDay();
//   const year = date.getUTCFullYear();
//   return `${month}/${day}/${year}`;
// }

function generatePlaceholders(amount) {
  for (let i = 0; i < amount; i++) {
    const html = `
      <div class="card" aria-hidden="true">
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
        </div>
      </div>
    `;

    const columns = document.querySelectorAll('.col');
    columns[i % columns.length].innerHTML += html;
  }
}

const createAlert = (message, type) => {
  return `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

const displayAlert = (message, type) => {
  const html = createAlert(message, type);
  const containerTag = document.querySelector('.container');
  const htmlElement = document.createElement('div');
  htmlElement.innerHTML = html;
  containerTag.append(htmlElement);
}



window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok){
      throw new Error(`An error has occurred: ${response.status} (${response.statusText})`);
    } else {
      const data = await response.json();

      generatePlaceholders(data.conferences.length);

      for (let i = 0; i < data.conferences.length; i++) {
        const conference = data.conferences[i];

        const columns = document.querySelectorAll('.col');

        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);

        // Remove placeholders if they exists
        if (columns[i % columns.length].querySelector('.placeholder')) {
          columns[i % columns.length].innerHTML = '';
        }


        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const startDate = new Date(details.conference.starts);
          const formattedStart = startDate.toLocaleDateString();
          const endDate = new Date(details.conference.ends);
          const formattedEnd = endDate.toLocaleDateString();
          const place = details.conference.location.name
          const html = createCard(title, description, pictureUrl, formattedStart, formattedEnd, place);
          columns[i % columns.length].innerHTML += html;

        } else {
          throw new Error(`Error retrieving conference detail: ${detailResponse.status} (${detailResponse.statusText})`)
        }
      }
    }
  } catch (e) {
    displayAlert(e.message, 'danger');
  }
});
