module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Reglas simplificadas para el proyecto
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nuevas características
        'fix',      // Correcciones de bugs
        'refactor', // Refactorización de código
        'docs',     // Documentación
        'chore',    // Tareas de mantenimiento
        'style',    // Cambios de estilo
        'perf',     // Mejoras de rendimiento
        'test',     // Tests
        'ci',       // Integración continua
        'build'     // Build system
      ]
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'subject-case': [0, 'always'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [0, 'always'],
    'footer-max-line-length': [0, 'always']
  }
}; 