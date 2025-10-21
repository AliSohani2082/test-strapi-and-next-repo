import { setPluginConfig } from "@_sh/strapi-plugin-ckeditor"

import type { StrapiApp } from "@strapi/strapi/admin"

import { cs } from "./cs"

import "@repo/design-system/styles.css"

import { defaultCkEditorConfig } from "./ckeditor/configs"
import InternalJobsRunActions from "./extensions/InternalJobsRunActions"

export default {
  config: {
    locales: ["en", "cs"],
    translations: {
      cs,
    },
  },
  bootstrap(app: StrapiApp) {
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "InternalJobsRunAction",
      Component: InternalJobsRunActions,
    })

    // Enforce LTR direction in Strapi admin regardless of shared global styles
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", "ltr")
      const ltrStyle = document.createElement("style")
      ltrStyle.setAttribute("data-admin-ltr-override", "true")
      ltrStyle.innerHTML = `html, body { direction: ltr !important; }`
      document.head.appendChild(ltrStyle)
    }
  },
  register() {
    setPluginConfig({ presets: [defaultCkEditorConfig] })
  },
}
