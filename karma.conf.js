// Karma configuration
const path = require('path'); // Necesitarás Node.js 'path'

module.exports = function(config) {
  config.set({

    // Frameworks a usar (Jasmine en este caso)
    frameworks: ['jasmine'],

    // Archivos a cargar/observar por Karma
    // ¡OJO! Los archivos JS/JSX de src/ se cargarán a través de Webpack
    files: [
      'src/**/*.spec.js' // Busca todos los archivos .spec.js dentro de src
    ],

    // Preprocesadores: Cómo transformar los archivos antes de ejecutarlos
    preprocessors: {
      // Usa Webpack para todos los archivos .spec.js (y sus dependencias)
      'src/**/*.spec.js': ['webpack']
    },

    // Configuración de Webpack para Karma (¡LA PARTE MÁS COMPLEJA!)
    webpack: {
      mode: 'development', // Modo desarrollo para los tests
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/, // Aplica Babel a archivos JS y JSX
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader', // Usa babel-loader
              options: {
                // Usa los presets para React y ES6 (igual que create-react-app)
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          // Podrías necesitar loaders para CSS, imágenes, etc. si tus componentes los importan
           {
             test: /\.css$/i,
             use: ["style-loader", "css-loader"],
           },
           { // Para imágenes (si las importas)
             test: /\.(png|jpe?g|gif|svg)$/i,
             type: 'asset/resource',
           },
        ]
      },
      resolve: {
        // Ayuda a Webpack a encontrar archivos sin extensión
        extensions: ['.js', '.jsx'],
      },
      // Necesario para evitar errores de polyfills de Node en el navegador
      externals: {
        'jsdom': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'react/addons': true,
      }
    },

    // Configuración del middleware de Webpack
    webpackMiddleware: {
      stats: 'errors-only' // Muestra solo errores
    },

    // Reporteros: cómo mostrar los resultados (y la cobertura)
    reporters: ['progress', 'coverage'],

    // Configuración del reporte de cobertura
    coverageReporter: {
      type : 'html', // Genera un reporte HTML
      dir : 'coverage-karma/' // Carpeta donde se guardará
    },

    // Puerto para el servidor de Karma
    port: 9876,

    // Habilitar colores en la salida
    colors: true,

    // Nivel de log: config.LOG_INFO, config.LOG_DEBUG, etc.
    logLevel: config.LOG_INFO,

    // Observar archivos y re-ejecutar pruebas al cambiar
    autoWatch: true,

    // Navegador a usar (Chrome en este caso)
    browsers: ['ChromeHeadless'], // Usa Chrome sin interfaz gráfica

    // Ejecutar pruebas una vez y salir (para CI)
    singleRun: false, // Ponlo en true si quieres que termine después de ejecutar

    // Concurrencia (cuántos navegadores abrir a la vez)
    concurrency: Infinity
  });
};
