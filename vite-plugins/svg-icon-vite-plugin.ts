import fs from 'fs'
import {parse} from 'node-html-parser'
import path from 'path'
import {Plugin} from 'vite'

const iconFolderPath = path.resolve(__dirname, '../src/icons')

export default {
  name: 'svg-icon',
  transformIndexHtml() {
    const iconsNames = fs.readdirSync(iconFolderPath)
    const icons = []
    for (const iconName of iconsNames) {
      if (iconName.endsWith('.svg')) {
        const svgString = fs.readFileSync(iconFolderPath + '/' + iconName, 'utf8')
        const svg = parse(svgString).querySelector('svg')!
        const viewBox = svg.getAttribute('viewBox')
        icons.push({
          tag: 'symbol',
          attrs: {
            id: iconName.replace('.svg', ''),
            viewBox
          },
          children: svg.innerHTML
        })
      }
    }

    return [{
      tag: 'svg',
      attrs: {
        display: 'none'
      },
      children: icons,
      injectTo: 'body'
    }]
  }
} as Plugin
