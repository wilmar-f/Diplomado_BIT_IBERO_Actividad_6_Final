document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos todas las tarjetas
    const tarjetas = document.querySelectorAll('.card-body');

    tarjetas.forEach((tarjeta) => {
        // Obtenemos el identificador único desde el atributo data-mascota
        // Si no se definió el atributo, usa como respaldo el texto del título o un índice aleatorio
        const idMascota = tarjeta.dataset.mascota || tarjeta.querySelector('.card-title')?.textContent.trim().toLowerCase() || Math.random().toString();
        
        const claveLikes = `likes_${idMascota}`;
        const claveComentarios = `comentarios_${idMascota}`;

        // --- 1. LÓGICA DE LIKES ---
        const btnLike = tarjeta.querySelector('.btn-like');
        const contadorLikes = tarjeta.querySelector('.contador-likes');

        if (btnLike && contadorLikes) {
            let likesGuardados = localStorage.getItem(claveLikes) || 0;
            contadorLikes.textContent = likesGuardados;

            btnLike.addEventListener('click', () => {
                let cantidadLikes = parseInt(contadorLikes.textContent);
                cantidadLikes++;
                contadorLikes.textContent = cantidadLikes;
                localStorage.setItem(claveLikes, cantidadLikes);
            });
        }

        // --- 2. LÓGICA DE COMENTARIOS ---
        const listaComentarios = tarjeta.querySelector('.lista-comentarios');
        const inputComentario = tarjeta.querySelector('.input-comentario');
        const btnComentar = tarjeta.querySelector('.btn-comentar');

        if (listaComentarios && inputComentario && btnComentar) {
            
            // Cargar comentarios guardados de localStorage
            let comentariosGuardados = JSON.parse(localStorage.getItem(claveComentarios)) || [];

            // Función para renderizar los comentarios en pantalla
            const renderizarComentarios = () => {
                listaComentarios.innerHTML = ''; // Limpiar lista

                comentariosGuardados.forEach((textoComentario, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${textoComentario}</span>
                        <button class="btn-borrar-comentario" data-index="${index}">✕</button>
                    `;
                    listaComentarios.appendChild(li);
                });
            };

            // Renderizar al cargar
            renderizarComentarios();

            // Función para agregar comentario
            const agregarComentario = () => {
                const texto = inputComentario.value.trim();
                
                if (texto !== '') {
                    comentariosGuardados.push(texto);
                    localStorage.setItem(claveComentarios, JSON.stringify(comentariosGuardados));
                    renderizarComentarios();
                    inputComentario.value = '';
                }
            };

            // Eventos para publicar
            btnComentar.addEventListener('click', agregarComentario);

            inputComentario.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    agregarComentario();
                }
            });

            // Evento para eliminar comentario
            listaComentarios.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-borrar-comentario')) {
                    const indexAEliminar = e.target.getAttribute('data-index');
                    comentariosGuardados.splice(indexAEliminar, 1);
                    localStorage.setItem(claveComentarios, JSON.stringify(comentariosGuardados));
                    renderizarComentarios();
                }
            });
        }
    });
});