let player = document.getElementById("player")

let speed = 10

document.addEventListener("keydown", (event) =>{
    if(event.key=="w"){
        let str = window.getComputedStyle(player).getPropertyValue("top")
        player.style.top = parseInt(str.substring(0, str.length-2)) - speed + 'px'
    }
    if(event.key=="a"){
        let str = window.getComputedStyle(player).getPropertyValue("left")
        player.style.left = parseInt(str.substring(0, str.length-2)) - speed + 'px'
    }
    if(event.key=="s"){
        let str = window.getComputedStyle(player).getPropertyValue("top")
        player.style.top = parseInt(str.substring(0, str.length-2)) + speed + 'px'
    }
    if(event.key=="d"){
        let str = window.getComputedStyle(player).getPropertyValue("left")
        player.style.left = parseInt(str.substring(0, str.length-2)) + speed + 'px'
    }
})