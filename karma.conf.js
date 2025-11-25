// karma.conf.js
// Configuración de Karma para el proyecto 1000 Sabores

module.exports = function(config) {
  config.set({
    
    // Frameworks de prueba a usar (Jasmine en este caso)
    frameworks: ['jasmine'],
    
    // Archivos de prueba
    // Esto le dice a Karma dónde buscar tus archivos de prueba
    files: [
      'src/tests/**/*.test.js'
    ],
    
    // Preprocesadores
    // 'webpack' es necesario para que Karma entienda los 'import' y JSX
    preprocessors: {
      'src/tests/**/*.test.js': ['webpack']
    },
    
// Configuración de webpack
webpack: {
  mode: 'development',
  module: {
    rules: [
      {
        // Procesar todos los archivos .js y .jsx
        test: /\.(js|jsx)$/, 
        // Ignorar la carpeta node_modules
        exclude: /node_modules/, 
        use: {
          // Usar el loader que acabamos de instalar
          loader: 'babel-loader', 
          options: {
            // Usar los presets estándar de Create React App
            presets: ['babel-preset-react-app'] 
          }
        }
      }
    ]
  }
},    
    // Reporteros: cómo mostrar los resultados
    // 'spec' da una salida clara de qué prueba falló y cuál pasó
    reporters: ['spec'],
    
    // Puerto para el servidor de Karma
    port: 9876,
    
    // Colores en la salida
    colors: true,
    
    // Nivel de log
    logLevel: config.LOG_INFO,
    
    // Observar archivos y re-ejecutar pruebas en cambios
    autoWatch: true,
    
    // Navegadores
    browsers: ['Chrome'],
    
    // Lanzador custom para CI/CD (coincide con tu script 'test:karma:headless')
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    
    // Ejecución única (para CI/CD)
    singleRun: false,
    
    // Concurrencia
    concurrency: Infinity
  });
};
