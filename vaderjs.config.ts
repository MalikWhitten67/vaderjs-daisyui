import daisyui from "vaderjs-daisyui"; 
import defineConfig from "vaderjs/config" 
export default defineConfig({
    port: 3000,
    plugin_config:{
        vader_aria: {
            components: [ 
                "Button",
                "Accordion",
                "Alert",
            ]
        }
    },
    plugins: [daisyui]
})