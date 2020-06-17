const urlHash = {
    'top-tracks': '/top-tracks',
    'top-artists': '/top-artists',
    artist: '/artist/madonna',
    track: '/track/the Weeknd/Blinding Lights',
    'similar-artists': '/similar-artists/Lady gaga',
    'similar-tracks': '/similar-tracks/the Weeknd/Blinding Lights',
};

const usageHash = {
    'top-tracks': '/top-tracks',
    'top-artists': '/top-artists',
    artist: '/artist/{artistName}',
    track: '/track/{artistName}/{trackName}',
    'similar-artists': '/similar-artists/{artistName}',
    'similar-tracks': '/similar-tracks/{artistName}/{trackName}',
};

const descriptionHash = {
    'top-tracks': 
        `
            <p>Returns Top music tracks, max limit 25</p>
        `,
    'top-artists':
        `
            <p>Returns Top music artists, max limit 25</p>
        `,
    artist: 
        `
            <p class="method-desc">Returns artist's information</p>

            <h6>Query Params:
                <pre class="method-params">artistName: string</pre>
            </h6>
        `,
    track: 
        `
            <p class="method-desc">Returns track's information</p>

            <h6>Query Params: 
                <pre class="method-params">artistName: string<br/>trackName: string</pre>  
            </h6>
        `,
    'similar-artists': 
        `
            <p class="method-desc">Returns all the artists similar to this artist(param), Max limit: 25</p>

            <h6>Query Params:
                <pre class="method-params">artistName: string</pre>
            </h6>
        `,
    'similar-tracks': 
        `
            <p class="method-desc">Returns all the similar tracks for this track, Max limit: 25</p>
            <h6>Query Params: 
                <pre class="method-params">artistName: string<br/>trackName: string</pre> 
            </h6>
        `,
};

const apiDropdownElement = document.querySelector('#select-api');
const usageDescriptionElement = document.getElementById('usage-desc');
const sampleResponseElement = document.getElementById('sample-resp');
const sampleUrlElement = document.getElementById('sample-url');
const demoUrl = document.querySelector('#usage-demo-url');

const spinnerElement = document.getElementById('spinner');
const usageBlock = document.getElementById('usage');

const baseUrl = 'https://alb-ui-assessment.herokuapp.com';

function showLoader() {
    spinnerElement.classList.remove('hide');
    usageBlock.classList.add('hide');
}

function hideLoader() {
    spinnerElement.classList.add('hide');
    usageBlock.classList.remove('hide');   
}

function loadApi() {
    const api = apiDropdownElement.value;

    if (api === '') {
        spinnerElement.classList.add('hide');
        usageBlock.classList.add('hide');

        return;
    }

    showLoader();

    const url = urlHash[api];

    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            const respString = JSON.stringify(resp, null, 2);

            usageDescriptionElement.innerHTML = descriptionHash[api];
            sampleResponseElement.innerText = respString;
            demoUrl.innerHTML = `<span class="url-demo-sample">${baseUrl}${url}</span>`;
            sampleUrlElement.innerHTML = 
                `<strong>GET: </strong>
                <span class="url-demo"> ${baseUrl}${usageHash[api]}</span>
                `;

            hideLoader();
        });
}
