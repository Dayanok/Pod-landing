let bearer_token = "BQCEET39lwyaEQzi_P8tqhdwhU1Th2cwJa4DRvwgqFP_cRn_PCXWA8EXs63fdI8JDch5KkxJZ1Mola6FgpFaA1H3Ji_307P7NaNwjYrOf7ls4HHSM2BRsfTp2_GezFVl2Pl0JA3dQLcruW884VXwfW1qfSnAMjpoSeLuJooYRVtbA1ro3fvaaM9bhPA6h64"
let url = "https://api.spotify.com/v1/shows"
let bearer = "Bearer " + bearer_token; 

function fetch_featured(){
    let show_id = "6GP2OFWwUqSvVq2J0rO7wp";
    fetch(url + "?ids="+show_id+"&market=ES",{
        method: "GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
    })
    .then((data)=>{
        return data.json()})
    .then((data)=>{
        let show = data.shows[0]
        let featured_html = `
            <div class='featured'>
                <img src='${show.images[1].url}' />

                <div>
                    <h1>${show.name}</h1>
                    <h4>${show.description}</h4>
                    <h3>Don't forget to listen today's episode!</h3>
                    <button>Listen now</button>
                </div>
            </div>
        `
        document.getElementById("featured").innerHTML = featured_html;
    })
    .catch(console.log)
    
}


function fetch_latest(){
    let show_ids = "7xvvdI85IO3kveUYobA6bR,6GP2OFWwUqSvVq2J0rO7wp,6iMYaUvVtZksy0DHlkGVRc";
    fetch(url + "?ids="+show_ids+"&market=ES",{
        method: "GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
    })
    .then((data)=>{
        return data.json()})
    .then((data)=>{
        data.shows.forEach(show => {
            let show_html = `
            <div class='show' onclick='location.href = "show.html?id=${show.id}"'>
                <img src= '${show.images[1].url}'/>
                    <div>
                        <h4>${show.name}</h4>
                        <h5>${show.publisher}</h5>
                    </div>
            </div>
        `
        document.getElementById("shows").innerHTML += show_html;
        })
        
    })
    // .catch(console.log)
    
}

function fetch_all(){
    fetch_featured();
    fetch_latest();
}


function get_show(id){
    fetch(url+"/"+id+"?market=ES" , {
        method:"GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        let header_html = `
            <img src='${data.images[1].url}' />
            <div>
                <p>PODCAST</p>
                <h4>${data.name}</h4>
                <h5>${data.publisher}</h5>
            </div>
        `
        document.getElementById("header").innerHTML = header_html;
    })
}

function get_episodes(id){
    fetch(url+"/"+id+"/episodes?market=ES" , {
        method:"GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })  
    .then((data)=>{return data.json()})
    .then((data)=>{
        data.items.forEach(episode =>{
            let episode_html = `
                <div class="episode">
                    <img src="${episode.images[1].url}"/>

                    <div class="episode__details">
                        <h2>${episode.name}</h2>
                    </div>    
                        <div class="audio">
                            <div class="play__button">
                            <audio src="${episode.audio_preview_url}" controls></audio>
                             </div>
           
                    <p>Preview</p>
           </div>
        
    </div>
            ` 
            document.getElementById('episodes').innerHTML += episode_html;
        })
    })
}


