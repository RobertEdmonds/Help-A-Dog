function popDog(info){
    let titleName = document.createElement('th')
    let titleBtn = document.createElement('button')
    let img = document.createElement('img')
    let dogName = document.createElement('h3')
    let dogAge = document.createElement('h3')
    let dogDiscript = document.createElement('h4')
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
    document.querySelector('.names').appendChild(titleName)
    titleBtn.addEventListener('click', event => {
        if(info.name === event.path[1].innerText){
            document.querySelector('.dog_info').replaceChildren(img, dogName, dogAge, dogDiscript)
        }
    })
}
function showDog(info){
    let img = document.createElement('img')
    let dogName = document.createElement('h3')
    let dogAge = document.createElement('h3')
    let dogDiscript = document.createElement('h4')
    let donateBtn = document.createElement('button')
    let likeBtn = document.createElement('button')
    let adoptBtn = document.createElement('button')
    img.src = info.image
    dogName.textContent = `Name: ${info.name}`
    dogAge.textContent = `Age: ${info.age}`
    dogDiscript.classList.add('discription')
    dogDiscript.textContent = info.discription
    document.querySelector('.dog_info').replaceChildren(img, dogName, dogAge, dogDiscript)
}
function renderDog(){
    fetch('  http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => data.map(popDog))
}
renderDog()