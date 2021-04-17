const searchForm = document.querySelector('#search-form');
const results = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.querySelector('#search').value;
    results.innerHTML = '';

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(xhttp.responseText);

            // const data = res.items.map((item) => {
            //     return item.snippet;
            // });

            const data = res.items;
            console.log(data[0])

            for (let video of data) {
                const videoDiv = document.createElement('div');
                videoDiv.classList.add('video-div');


                let titleLink = '';
                if (video.id.kind === 'youtube#channel') {
                    titleLink = `http://www.youtube.com/channel/${video.snippet.channelId}`;
                } else if (video.id.kind === 'youtube#video') {
                    titleLink = `http://www.youtube.com/watch?v=${video.id.videoId}`;
                }

                videoDiv.innerHTML = `
               <img class='thumbnail' src=${video.snippet.thumbnails.high.url}>
               <p>
               <a href='${titleLink}'>
               ${video.snippet.title}</a></p>
               <p><a href='http://www.youtube.com/channel/${video.snippet.channelId}'>${video.snippet.channelTitle}</a></p>
               <p>${new Date(video.snippet.publishTime).toLocaleString()}</p>
            `
                results.appendChild(videoDiv);
            };
        }
    };
    xhttp.open("GET", `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=9&key=AIzaSyBz0NRgPLpXyv8Wh8dCHZMDAzl9B8EOIfA`, true);
    xhttp.send();
})