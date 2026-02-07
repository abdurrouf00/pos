import next from 'eslint-config-next'

export default [
  next,
  {
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-console': 'warn', // better than error in real projects
    },
  },
]
