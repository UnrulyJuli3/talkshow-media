<template>
    <div class="redirect-warning">
        <div class="main">This tool is deprecated.</div>
        <a class="text" href="https://juli3.net/export">Please use the new version at juli3.net.</a>
    </div>
</template>

<style scoped lang="scss">
.redirect-warning {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    text-align: center;

    &>.main {
        font-size: 24px;
        font-weight: 700;
    }

    &>.text {
        font-size: 18px;
        font-weight: 400;
    }
}
</style>