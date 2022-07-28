module.exports = {

    // call unsplash and return small image
    async seedImg() {
        const axios = require("axios");

        try {
            const resp = await axios.get('https://api.unsplash.com/photos/random', {
                params: {
                    client_id: 'nZf8TfKhIeplsMZ60Ij-nXhJkPtE-l2w8sq-Cp9nxu4',
                    collections: 1114848,
                },
            })
            return resp.data.urls.small
        } catch (err) {
            console.error(err)
        }
    }
}