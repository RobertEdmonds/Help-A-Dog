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
    dogDonation.textContent = `Donations: ${info.donation}`
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
}

function renderDog(){
    fetch('  http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => data.map(popDog))
}
renderDog()
function updateDonation(dogObj){
    fetch('')
}
