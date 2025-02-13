
const socket = io();

socket.on('home', (data)=>{
    fetch('http://localhost:8080/api/products')
    .then(data => {return data.json()})
    .then(data =>{
        const container = document.querySelector('#main')
        data.forEach(el => {
            const div = document.createElement('div')
            div.innerHTML = `
                <img src='${el.img}'/>
                <h3>${el.name}</h3>
                <p>Price: ${el.price.toFixed(2)}$</p>
            `
            container.appendChild(div)
        })
        console.log(data)
      }
    )
})






