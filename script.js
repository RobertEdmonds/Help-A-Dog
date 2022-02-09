document.addEventListener('DOMContentLoaded', renderDog)
document.querySelector('.dog_form').addEventListener('click',()=>{
    const dogList= document.querySelector('#list_spot')
    if(dogList.getElementsByClassName("ul").length === 0){
        document.querySelector('.dog_info').replaceChildren('')
        document.querySelector('#list_spot').style.display = 'none'
        document.querySelector('.new_dog').style.display = 'inline-block'
    }
})
document.querySelector('.new_dog').addEventListener('submit', addDogInfo)
function addDogInfo(event){
    event.preventDefault()
    let newDog = {
        name:event.target.fName.value,
        age:event.target.fAge.value,
        image: event.target.fPhoto.value,
        description: event.target.fDescription.value,
        donation: 0,
        like: 0,
    }
    formCreate(newDog)
    document.querySelector('.new_dog').reset()
}
document.querySelector('.dog_list').addEventListener('click',event => {
    if(event.path[1].localName === 'div'){
        document.querySelector('.new_dog').style.display = 'none'
        document.querySelector('#list_spot').style.display = 'block'
    }
})
function popDog(info){
    let titleName = document.createElement('ul')
    let titleBtn = document.createElement('button')
    let img = document.createElement('img')
    let dogName = document.createElement('h3')
    let dogAge = document.createElement('h3')
    let dogDescript = document.createElement('h4')
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
    dogDescript.classList.add('description')
    dogDescript.textContent = info.description
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
    dogDescript.append(dogLikes, dogDonation, donateBtn, likeBtn, adoptBtn)
    document.querySelector('#list_spot').appendChild(titleName)
    titleBtn.addEventListener('click', event => {
        if(info.name === event.path[1].innerText){
            document.querySelector('.dog_info').replaceChildren(img, dogName, dogAge, dogDescript)
            document.querySelector('#list_spot').style.display = 'none'
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
        window.alert(`A member of our team will contact you about adopting ${info.name} in the next 24 hours!`)
        let newList = document.createElement('h3')
        newList.classList.add('info_message')
        newList.textContent = 'Please Click On Dog Name To Populate Information'
        if(confirm(`We will put ${info.name} on hold for you!`) == true){
            titleBtn.remove()
            document.querySelector('.dog_info').replaceChildren(newList)
            deleteDog(info.id)
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
    .then(addedDog => popDog(addedDog))
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