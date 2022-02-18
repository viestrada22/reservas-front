## Angular base .sass

### Estructura base

Dentro de la carpeta *assets* tenemos la carpeta *sass* y dentro de ella obtendremos la siguiente estructura base, con esta estructura podemos construir nuevos archivos según los elementos que estemos construyendo.

![enter image description here](https://drive.google.com/uc?export=download&id=1MrLIwGTAIRVppffYjzY6IKFSx4VvEhrx)

En la carpeta **modules** construiremos los módulos, utilidades y valores que necesitemos aplicar globalmente durante el proyecto.

En la carpeta **partials** construiremos los elementos que utilizaremos de manera global y específica, que apoyarán los componentes que estemos desarrollando.

### Manejo del styles.sass

El nuestra proyecto angular-base.sass tendremos dentro de **src** un archivo styles.sass, acá sólo vamos a tener importado nuestros archivos creados dentro de la estructura.

```sass
// Modules and var
@import "assets/sass/modules/var"
@import "assets/sass/modules/mixins"
@import "assets/sass/modules/utility"

// Partials
@import "assets/sass/partials/reset"
@import "assets/sass/partials/typography"
@import "assets/sass/partials/grids"
@import "assets/sass/partials/global"
@import "assets/sass/partials/buttons"
```

### Librerias externas

La carpeta vendor es donde tendremos estas extensiones que son descargadas de librerías externas.

```bash
assets / sass / vendor
```

### Aplicación de estilos por componentes

Tener en cuenta agregar los estilos por cada componente, es decir, cada vista debe contar con su propia hoja de estilos, esto aplica para agregar estilos o atributos que afectan sólo ese componente.

![añadir librerias visuales externas](https://drive.google.com/uc?export=download&id=1XddfzoHWBCmMDJyJf-veo3fLPQpLxFT8)