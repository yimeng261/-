global.ScanType = new $KeyMapping('记录矿物类型', $GLFWKey.GLFW_KEY_Z, 'key.categories.kubejs')
StartupEvents.init(event => {
    $KeyMappingRegistry.register(global.ScanType)
})