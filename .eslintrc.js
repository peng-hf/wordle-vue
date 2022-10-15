module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:prettier-vue/recommended',
    'prettier'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/script-setup-uses-vars': 'error',
    'vue/multi-word-component-names': 'off'
  }
}
