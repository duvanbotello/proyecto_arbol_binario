# proyecto_arbol_binario

Conceptos, operaciones y funcionamiento de un arbol binario de busqueda.

Esta web esta enfocada al aprendizaje universitario: explica la teoria del ABB y permite ver su comportamiento grafico paso a paso.

## Version web estatica

El proyecto ahora incluye una version 100% estatica para ejecutar en GitHub Pages:

- `index.html`
- `styles.css`
- `app.js`

No requiere backend, Java ni Python para desplegar.

## Que es un arbol binario de busqueda?

Un arbol binario de busqueda (ABB) es una estructura de datos jerarquica donde cada nodo tiene como maximo dos hijos y cumple esta propiedad:

- valores menores al nodo actual van al subarbol izquierdo
- valores mayores al nodo actual van al subarbol derecho

Esto permite que operaciones como buscar, insertar y borrar sean eficientes en promedio.

## Teoria clave

- Inorden en un ABB produce valores ordenados de menor a mayor.
- Complejidad promedio de buscar/insertar/borrar: `O(log n)` si esta balanceado.
- Peor caso: `O(n)` cuando el arbol se vuelve muy desbalanceado.

### Enfoque educativo, UX y multilenguaje

- Guia rapida dentro de la interfaz para practicar con una secuencia sugerida.
- Boton de ejemplo guiado para cargar un arbol base automaticamente.
- Mensajes de aprendizaje despues de cada operacion (insertar, buscar, borrar, podar).
- Pista contextual para entender hacia donde se mueve un valor al insertarlo.
- Visualizacion grafica del arbol y metricas en tiempo real.
- Selector de idioma ES/EN (espanol e ingles) para clases y practica internacional.

## Ejecutar local

Abre `index.html` en el navegador.

## Publicar en GitHub Pages

1. Sube estos archivos a tu rama principal.
2. Ve a `Settings > Pages`.
3. En `Build and deployment`, selecciona `Deploy from a branch`.
4. Elige la rama `main` (o `master`) y carpeta `/ (root)`.
5. Guarda y espera la URL publica.

## Capturas del proyecto original (Java)

<img src="https://github.com/duvanbotello/proyecto_arbol_binario/blob/master/Imagenes/1.PNG" width="800">

<img src="https://github.com/duvanbotello/proyecto_arbol_binario/blob/master/Imagenes/2.PNG" width="800">

<img src="https://github.com/duvanbotello/proyecto_arbol_binario/blob/master/Imagenes/3.PNG" width="800">
