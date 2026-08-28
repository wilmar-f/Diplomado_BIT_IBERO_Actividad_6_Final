// Seleccionar todos los botones de me gusta
const botonesLike = document.querySelectorAll('.btn-like');

// Recorrer cada botón al cargar la página
botonesLike.forEach((boton) => {
    // 1. Obtener la tarjeta actual y el nombre de la mascota desde el h5
    const tarjeta = boton.closest('.card-body');
    const nombreMascota = tarjeta.querySelector('.card-title').textContent.trim();
    const contador = tarjeta.querySelector('.contador-likes');

    // 2. Crear una clave única para localStorage (ejemplo: "likes_Bonnie")
    const claveStorage = `likes_${nombreMascota}`;

    // 3. Cargar los likes desde localStorage (Si no existe, poner 0)
    let likesGuardados = localStorage.getItem(claveStorage) || 0;
    contador.textContent = likesGuardados;

    // 4. Agregar el evento click al botón
    boton.addEventListener('click', () => {
        // Obtener la cantidad actual, incrementar 1
        let cantidadLikes = parseInt(contador.textContent);
        cantidadLikes++;

        // Actualizar la pantalla (DOM)
        contador.textContent = cantidadLikes;

        // Guardar el nuevo valor en localStorage
        localStorage.setItem(claveStorage, cantidadLikes);
    });
});