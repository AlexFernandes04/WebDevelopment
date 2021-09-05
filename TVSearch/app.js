const form = document.querySelector('#searchForm');
const container = document.querySelector('#container');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const search = form.elements.query.value;
        const config = { params: { q: search } }
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        makeImage(res.data)
        form.elements.query.value = '';
    } catch (e) {
        console.log(`ERROR ${e}`);
    }

})

const makeImage = (images) => {
    for (let result of images) {
        if (result.show.image) {
            const image = document.createElement('IMG');
            image.src = result.show.image.medium;
            image.classList.add('mx-auto');
            container.classList.remove('d-none')
            container.append(image);

        }
    }
}