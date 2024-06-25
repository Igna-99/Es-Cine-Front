function navigateTo(name, params) {

    this.$router.push({ name, params });
}

export { navigateTo }