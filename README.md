# EJERCICIO - Front End

Ejercicio Construir una tienda online que despliegue productos agrupados por la categoría a la que pertenecen, generando por separado backend (API REST) y frontend (aplicación que la consuma).

Además, hay que agregar un buscador, el cual tiene que estar implementado a nivel de servidor, mediante una Api Rest cuyo lenguaje y framework puede ser de libre elección. Es decir, los datos de productos deben llegar filtrados al cliente.

### FRONT

| Recursos front utilizados | Enlace                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------- |
| Bootstrap 4.6             | [Ir a web oficial](https://getbootstrap.com/docs/4.6/getting-started/introduction/) |
| JQuery                    | [Ir a web oficial](https://jquery.com/)                                             |
| Font Awesome              | [Ir a web oficial](https://fontawesome.com/)                                        |

## Consideraciones

1. Al acceder al front, una vez construido el DOM se dispara el evento DOMContentLoaded para cargar las primeras funciones del main.js
2. Utiliza API Fetch para el envío de la request del usuario.
3. Para escuchar el evento de agregar productos al carrito después de crear el documento utilizamos el Event Delegation (delegación de eventos).
4. Se utiliza el localStorage para la persistencia de datos del cliente.
5. El buscador de productos opera con el evento onkeyup, lo que significa que a medida que el usuario teclea (al soltar la tecla específicamente) la busqueda de producto(s) esta se va realizando.

### Deploy: https://bsale-store-front.netlify.app/

<h1 align="center">
   <img src="./captura.png">
</h1>
