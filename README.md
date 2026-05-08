# Nombre del proyecto.

Almacen de productos

# Descripción.

Sistema web que permite guardar productos con su nombre, descripción unidades en stock y su respectiva imágen.

# Tecnologías utilizadas.

## Backend

### Para backend se utilizó el framework Express.js

<h5>Librerías adicionales utilizadas:</h5>
<ul>
    <li>MySQL</li>
    <li>Sequelize</li>
    <li>Zod</li>
    <li>Nodemon</li>
    <li>Multer</li>
    <li>Dotenv</li>
</ul>

## Frontend

### Para frontend se utilizó React.js

<h5>Librerías adicionales utilizadas:</h5>
<ul>
    <li>Tailwind CSS</li>
    <li>Axios</li>
    <li>Tan stack query (antes React Query)</li>
    <li>Zod</li>
    <li>React router dom</li>
    <li>React hot toast</li>
</ul>

# Funcionalidades.

```bash
pagina_principal
├── /    # Consultar productos
├── /nuevo  # Registrar un producto
├── /modificar/:id # Modificar un producto
```

# Instrucciones para ejecutar el proyecto.

## Activar backend

### 1. Acceder a la carpeta backend

```bash
cd backend
```

### 2. Crear el archvio .env con las siguientes variables

```bash
PORT=3000
DB_NAME=nombre_base_de_datos
DB_USER=usuario_mysql
DB_PASSWORD=contrasena_mysql
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306
```

### 3. Instalar node modules y ejecutar el programa

```bash
npm install
npm start
```

## Activar frontend

### 1. Acceder a la carpeta frontend

```bash
cd frontend
```

### 2. Crear el archvio .env con la siguientes variable

```bash
VITE_API_URL=http://localhost:3000/api
```

### 3. Instalar node modules y ejecutar el programa

```bash
npm install
npm run dev
```

# Evidencias o capturas de pantalla.

<video width="640" height="360" controls>
  <source 
    src="https://drive.google.com/uc?export=download&id=1YeYmmy2FY9gCpANqiZMd9YqgUdSNPvoD" 
    type="video/mp4"
  />
  Tu navegador no soporta video HTML5.
</video>

https://drive.google.com/file/d/1YeYmmy2FY9gCpANqiZMd9YqgUdSNPvoD/view?usp=drive_link

# Indicación de si se usó IA y para qué.

### Se utilizó IA para...

<ul>
    <li>Corrección imediata de problemas</li>
    <li>Asistencia para estructuración de archivos</li>
    <li>Adaptar componentes obtenidos de uiverse.io a componentes reutilizables</li>
</ul>
