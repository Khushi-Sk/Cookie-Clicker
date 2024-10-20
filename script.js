

const cookieBtn = document.getElementById("cookie-btn");
const cookieDisplay = document.getElementById("cookie-count");
const cookiePerSecond = document.getElementById("cps");
const upgradeSection = document.getElementById("upgradeSection")
const newGame = document.getElementById("repeat")
const getForm = document.querySelector("form")
const music = document.getElementById("music")
const musicPlay = document.getElementById("playMusic")

// const autoclicker = document.getElementById("autoclicker")
// const grandma = document.getElementById("grandma")
const URL = "https://cookie-upgrade-api.vercel.app/api/upgrades"

/*  let score = localStorage.setItem("count", 0)          // TODO get from local storage
    let cps_score  = localStorage.setItem("cps",10)       //cookie per second, TODO need to get from local storage
*/

// get item into number from string
let cookie = Number(localStorage.getItem("count"))  ; 
let cps = Number(localStorage.getItem("cps"));

// Game Logic
// every second, increase cookies by cps
setInterval(function(){
    cookie = Math.round(cookie, 3) + cps
    cookieDisplay.textContent = cookie
    cookiePerSecond.textContent = cps

    // TODO update local storage
    score = localStorage.setItem("count", cookie) 
    cps_score = localStorage.setItem("cps", cps)

}, 1000)


// get a cookie when i click the button
cookieBtn.addEventListener("click", function(){
    cookie = cookie + 1;
    cookieDisplay.textContent = cookie;
    // setInterval(function(){
    //    cookieBtn.style.display = "flex";
    // }, 200)
    // TODO update local storage
    let score = localStorage.setItem("count", cookie) 
    let cps_score = localStorage.setItem("cps", cps)
})


// Upgrade according to GrandMa Upgrade
cookiePerSecond.addEventListener("click", function(){
    if (cookie >= 10) {
        cookie = cookie - 10;
        cps = cps + 1;
        cookieDisplay.textContent = cookie;
        
    }
})

// Start New Game
newGame.addEventListener("click", function(){

    cookie = -1
    cps = 1
    score = localStorage.setItem("count", cookie) 
    cps_score = localStorage.setItem("cps", cps)
})

// Player Name
getForm.addEventListener("submit",  function(e){
    e.preventDefault()
    const form = new FormData(e.target)
    console.log(form)
    const username = form.get("username")
    console.log(username)
    localStorage.setItem("player", username)
    const player =  localStorage.getItem("player")
    const label = document.getElementById("playerName")
    label.textContent = player
    form.append(label)
    form.set("username") = ""
})

let play = true
musicPlay.addEventListener("click", function(){
    play =! play
    if (play) {
        music.play()
    } else {
       music.pause()
    }
})

async function Upgrades() {
    const response = await fetch(URL);
    const data = await response.json()
    console.log(data)
    
    /* 
    I created new Object to add Image Icons of upgrades into api response with respect to its name,
    not working , its returns only last img src

        let newObj = {}
        
        data.map((a) => { 
            for (let img=0; img < upgradeIcons.length; img ++) {
            newObj = {...a, upgradeIcons: upgradeIcons[img]}  
            }
            console.log(newObj) 
        })   
    */
    
    const info = upgradeInfo(data)
    // console.log(info)
    
}


const upgradeIcons = [
    "https://png.pngtree.com/png-clipart/20230823/original/pngtree-mouse-cursor-symbol-arrow-click-pointer-illustration-isolated-picture-image_8204921.png",
    //  "https://thumbs.dreamstime.com/b/happy-grandmother-cute-elderly-woman-stick-vector-illustration-positive-cartoon-female-character-grandma-lady-happy-312608328.jpg",
    "https://static.vecteezy.com/system/resources/previews/030/690/551/large_2x/oven-2d-cartoon-illustraton-on-white-background-high-quali-free-photo.jpg",
    "https://ih1.redbubble.net/image.5513187762.5247/st,small,507x507-pad,600x600,f8f8f8.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvptaQ6ufRqLxnFO7VW-Ucxj7gQvxUZic9ag&s",
 "https://thumbs.dreamstime.com/b/cookies-factory-conceptual-vintage-illustration-poster-greeting-holiday-christmas-new-year-computer-graphics-159760414.jpg",
     "https://media.istockphoto.com/id/1185242051/vector/wholemeal-flour-flat-vector-illustration.jpg?s=612x612&w=0&k=20&c=bPv8EhNtNMkuWd3mhdKs9uCSeBQJ4_v7EkxkUZlmd0U=",
    "https://img.freepik.com/premium-photo/time-machine-2d-cartoon-vector-illustration-white-back_889056-29259.jpg?w=360"

]

const upgradeInfo = (data) => {
   
    for (let i=0; i< data.length; i = i+1) {
        const newUpgrade = document.createElement("button");
        newUpgrade.setAttribute("id", "buy")
        newUpgrade.textContent = `Buy`; //buy button
        const details = document.createElement("p");
        const alert = document.createElement("h3")
        alert.textContent = "Sorry, You don't have enough Cookies to buy"
        alert.style.color = "#eee";
        alert.style.display = "none";
        alert.style.background = "black";
        alert.style.padding = '5px' ;
        alert.style.borderRadius = "5px";
        alert.style.fontSize = "20px"
        const icon = document.createElement("img");
        icon.src = upgradeIcons[i]
        icon.width = 80
        icon.style.margin = 5;
        icon.style.padding = "10px 25px 0px"
        // console.log(data[i][icon.src])
        
        details.textContent = `${data[i].name} costs ${data[i].cost} cookies - ${data[i].increase} cookies per second.` 
        details.style.margin = 0.5, 0, 0, 0 ;
        details.append(icon)

        newUpgrade.addEventListener("click", function(){
            if (cookie > data[i].cost) {
                console.log(`You bought an upgrade ${data[i].name}`)
                cookie = cookie - data[i].cost;
                cps = cps + data[i].increase;
                console.log(`Cookies: ${cookie} cps: ${cps}`)
            }   else{
                function showAlert(){
                    alert.style.display = "flex";
                setTimeout(function(){
                    alert.style.display = "none";
                    }, 3000)}
                showAlert()}
        })
        
        // if (numCookies > data[i].cost) {
        //      newUpgrade.disabled = false
        // } else { newUpgrade.disabled = true};
        
        details.append(alert)
        details.append(newUpgrade)
        upgradeSection.append(details)
    }

            // const newUpgrade = document.createElement("button");
            // newUpgrade.textContent = dta[i].name
            // console.log(newUpgrade.textContent)
            
            
            //     console.log(dta[i].name)
        //         newUpgrade.addEventListener("click", function(){
        //             cps = dta[i].increase
        //         cookie = cookie + cps
        //         score = localStorage.setItem("count", cookie)
        //         cps_score = localStorage.setItem("cps", cps)
        //     })
        // // }
        // document.body.appendChild(newUpgrade) 
}
            
Upgrades()
