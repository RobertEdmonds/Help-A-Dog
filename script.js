document.addEventListener('DOMContentLoaded', renderDog)
document.querySelector('.new_dog').addEventListener('submit', addDogInfo)
function addDogInfo(elements){
    // elements.preventDefault()
    let newDog = {
        name:elements.target.fName.value,
        age:elements.target.fAge.value,
        image: elements.target.fPhoto.value,
        discription: elements.target.fDescription.value,
        donation: 0,
        like: 0
    }
    popDog(newDog)
    formCreate(newDog)
}
function popDog(info){
    let titleName = document.createElement('th')
    let titleBtn = document.createElement('button')
    let img = document.createElement('img')
    let dogName = document.createElement('h3')
    let dogAge = document.createElement('h3')
    let dogDiscript = document.createElement('h4')
    let dogDonation = document.createElement('h4')
    let dogLikes = document.createElement('h4')
    let donateBtn = document.createElement('button')
    let likeBtn = document.createElement('button')
    let adoptBtn = document.createElement('button')
    titleBtn.classList.add('pop_dog')
    titleBtn.textContent = info.name
    titleName.appendChild(titleBtn)
    img.src = info.image
    dogName.textContent = `Name: ${info.name}`
    dogAge.textContent = `Age: ${info.age}`
    dogDiscript.classList.add('discription')
    dogDiscript.textContent = info.discription
    dogLikes.classList.add('dog_likes')
    dogLikes.textContent = `Likes: ${info.like}`
    dogDonation.classList.add('dog_donations')
    dogDonation.textContent = `Donations: $${info.donation}`
    donateBtn.classList.add('donateBtn')
    donateBtn.textContent = 'Donate $5'
    likeBtn.classList.add('likeBtn')
    likeBtn.textContent = 'Like'
    adoptBtn.classList.add('adoptBtn')
    adoptBtn.textContent = "Adopt Now!"
    dogDiscript.append(dogLikes, dogDonation, donateBtn, likeBtn, adoptBtn)
    document.querySelector('.names').appendChild(titleName)
    titleBtn.addEventListener('click', event => {
        if(info.name === event.path[1].innerText){
            document.querySelector('.dog_info').replaceChildren(img, dogName, dogAge, dogDiscript)
        }
    })
    donateBtn.addEventListener('click', ()=> {
        info.donation += 5
        dogDonation.textContent = `Donations: $${info.donation}`
        updateDonation(info)
    })
    likeBtn.addEventListener('click', ()=>{
        info.like += 1
        dogLikes.textContent = `Likes: ${info.like}`
        updateLike(info)
    })
    adoptBtn.addEventListener('click', () => {
        alert(`A member of our team will contact you about adopting ${info.name} in the next 24 hours!`)
        
        if(confirm(`We will put ${info.name} on hold for you!`) == true){
            titleBtn.remove()
            document.querySelector('.dog_info').replaceChildren('Please Click On Dog Name To Populate Information')
            deleteDog(info.id)
        }else{
            console.log('reject proposal')
        }
    })
}
function renderDog(){
    fetch('  http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => data.forEach(popDog))
}

function updateDonation(dogObj){
    fetch(`http://localhost:3000/dogs/${dogObj.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(dogObj)
    })
    .then(resp => resp.json())
}
function formCreate(dogObj){
    fetch('http://localhost:3000/dogs',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dogObj)
    })
    .then(resp => resp.json())
}
function updateLike(dogObj){
    fetch(`http://localhost:3000/dogs/${dogObj.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dogObj)
    })
    .then(resp => resp.json())
}
function deleteDog(id){
    fetch(`http://localhost:3000/dogs/${id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
}