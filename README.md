# Demostración básica de la app web

La app web utiliza una API proveniente de RAWG.io para traer información de algún videojuego. Al cargar algún videojuego en una página, hace una búsqueda de videos en Youtube utilizando una librería que hace Web-Scraping y cuenta con la posibilidad de guardarlo a favoritos, puntuar, guardar información que usted desea sobre el videojuego utilizando `localStorage` del navegador.
En la sección Blog utiliza GraphQL para cargar los posts desde el endpoint configurado en Wordpress. También puede cargar o escribir comentarios.

La app web se creó de manera autodidacta con el fin de demostrar mis conocimientos como Fullstack Developer, sin fines de lucro.


### Tecnologías utilizadas:
- NextJS v13
- React Hooks
- Typescript
- Tailwind CSS
- Wordpress Headless
- GraphQL

### Librerías utilizadas:
- "@apollo/client": "^3.8.7",
- "axios": "^1.6.2",
- "graphql": "^16.8.1",
- "html-react-parser": "^5.0.6",
- "react-custom-rating-component": "^0.1.6",
- "react-icons": "^4.12.0",
- "react-youtube": "^10.1.0",
- "youtubei": "^1.2.1"


### Datos privados:
La app web necesita un archivo `.env` que contenga la siguiente información y modificar los que estén entre { }:
```bash
API_KEY_SECRET={YOUR API KEY FROM RAWG.IO}
URL_RAWG=https://api.rawg.io/api/

WP_GRAPHQL_URL=http://{YOUR URL WORDPRESS WEBSITE}/graphql
WP_IMAGES_URL={YOUR URL}
```

### Wordpress Headless
Para un correcto funcionamiento, se debe instalar el plugin **WPGraphQL*** en Wordpress y configurar el endpoint en GraphQL/Settings, siendo en este caso "graphql" el endpoint, si observamos el archivo `.env` mencionado arriba.
En mi caso, se utilizó la app Local para configurar Wordpress desde localhost. Es posible utilizar XAMPP o WAMPP, o incluso un Wordpress online.

- WPGraphQL: También se puede instalar *WP GraphQL Blocks ACF, WPGraphQL Blocks, WPGraphQL for Advanced Custom Fields, WPGraphQL Meta Query, WPGraphQL Offset Pagination* para obtener más funcionalidades.

Archivo existente llamado client.tsx para configurar comunicación con Wordpress headless: 
```js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.WP_GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export default client;
```

### Ejecución
Correr `npm run dev` y tener online un blog de Wordpress o activado el Wordpress Headless desde localhost. Puede utilizar XAMPP o WAMPP con un puerto distinto al de 3000 para levantar el Wordpress.


**Gracias por leer**.
**Tomás B.**