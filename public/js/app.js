
console.log("client running")




const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

      const location = search.value   
      p1.textContent='Loading...'
      p2.textContent=''
    fetch("/weather?address="+ location).then((response)=> {
    response.json().then((data) => {
        if(data.error) {
            p1.textContent=data.error
            return console.log(data.error)
        } else {
            p1.textContent=data.location
            p2.textContent=data.forecast
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})
})