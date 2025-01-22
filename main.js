const API_KEY = '48387831-a27bd27e818d37c055dee1b6c';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGES_PER_PAGE = 12;
let currentPage = 1;

function fetchImages(page, callback) {
    const url = `${BASE_URL}?key=${API_KEY}&editors_choice=true&per_page=${IMAGES_PER_PAGE}&page=${page}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => callback(null, data.hits))
        .catch(error => callback(error));
}

function renderImages(images) {
    const gallery = document.querySelector('.images-list');
    images.forEach(image => {
        const imgItem = document.createElement('li')
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imgItem.appendChild(imgElement);
        gallery.appendChild(imgItem)

    });
}

function loadMoreImages() {
    fetchImages(currentPage, function (error, images) {
        if (error) {
            console.error(error);
            return;
        }
        renderImages(images);
        currentPage++;
    });
}

document.getElementById('loadMore').addEventListener('click', loadMoreImages);

loadMoreImages();