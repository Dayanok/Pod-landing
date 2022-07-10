let bearer_token = "BQBMHp4q2oW461z344NpVeMQoCgxb3uzji7udJwTpFS44NaDrR7rTK-ozLkgkEh5Sq8jVwEYKDIeqQolhP4El3CgHnPHsHNHCX3iD4rV87fvjUf8F1fKbvv_TFzKjgadjiCg9YbeFeqGYofwkJzOAsswFdcs6Ey903xcMEOzfKbkjwgcE4_0p-XN4yNHf6o"
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
            <div class='show' onclick='location.href = "${show.external_urls.spotify}"'>
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
    .catch(console.log)
    
}

function fetch_all(){
    fetch_featured();
    fetch_latest();
}