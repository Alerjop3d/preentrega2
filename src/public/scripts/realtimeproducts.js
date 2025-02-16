const socket = io();

socket.on('realtime', (data)=>{
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


document.querySelector('.floating-add-button').addEventListener('click', function() {
    Swal.fire({
        title: 'Añadir Producto',
        html:
            '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
            '<input id="precio" class="swal2-input" placeholder="Precio">' +
            '<input id="imagen" class="swal2-input" placeholder="URL de la imagen">',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            return {
                id: Date.now(), // Generar un ID único
                title: document.getElementById('nombre').value,
                price: parseFloat(document.getElementById('precio').value),
                img: document.getElementById('imagen').value,
                stock: 10 // Valor por defecto
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const newProduct = result.value;
            socket.emit('add product', newProduct); // Enviar el nuevo producto al servidor
        }
    });
});


document.querySelector('.floating-del-button').addEventListener('click', function() {
    Swal.fire({
        title: 'Eliminar Producto',
        html: '<input id="id" class="swal2-input" placeholder="ID del producto">',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            return document.getElementById('id').value;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const productId = result.value;
            socket.emit('delete product', productId); // Enviar el ID del producto a eliminar
        }
    });
});