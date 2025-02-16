
const socket = io();

socket.on('home', (data)=>{
    const container = document.querySelector('#main')
    container.innerHTML = ''
    data.forEach(el => {
        const div = document.createElement('div')
        div.innerHTML = `
            <img src='${el.img}'/>
            <h3>${el.title}</h3>
            <p>Id: ${el.id}</p>
            <p>Price: ${el.price.toFixed(2)}$</p>
            <p>Stock: ${el.stock}</p>
        `
        container.appendChild(div)
    })
})






