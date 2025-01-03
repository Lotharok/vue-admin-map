# vue-admin-complementarios

## Requisitos
-Node version 22.12.0
-pnpm ultima version

## Estructura
El proyecto consta de 2 Workspaces 
@apps -> Fronts para la administracion de cada producto.
packages -> Librerias generales
- layaout -> Componentes y funcionalidades que se comparten entre fronts de administracion.
- sass-module -> Estilos generales.

# Como ejecutar el proyecto
1. Instalar pnpm de forma global.
2. Realizar un pnpm install.
3. Compilar los estilos generales. 
Para esto vamos a realiazar los siguientes pasos:
3.1. Ejecutar pnpm sass-module build
3.2. Reemplazar en layout-index.css el url(/layout-keenicons... Se debe de cambiar a la ruta del CDN.
4. Compilar layout
Para esto vamos a realiazar los siguientes pasos:
4.1. Ejecutar pnpm layout build o pnpm layout builddev segun sea el caso.
4. Por ultimo ya podemos trabajar con cualquier app, ejecutando los comandos normales: pnpm dev, build o builddev segun sea el caso.