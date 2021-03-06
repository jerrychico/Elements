require('expect-puppeteer')

const dirname = require('path').basename(__dirname)

beforeEach(async () => {
  await page.goto(`http://localhost:3000/${dirname}`)
})

function textareaHeight () {
  return page.evaluate(() => document.querySelector('#content').offsetHeight)
}

describe('#textarea-autogrow', () => {
  it('should grow on focus', async () => {
    const textarea = await page.$('#content')
    const defaultHeight = await textareaHeight()
    await textarea.focus()
    await expect(await textareaHeight()).toBeGreaterThan(defaultHeight)
  })

  it('should shrink when less text', async () => {
    const textarea = await page.$('#content')
    await textarea.focus()
    const height = await textareaHeight()
    await page.keyboard.down('Control')
    await page.keyboard.press('A')
    await page.keyboard.up('Control')
    await page.keyboard.up('Backspace')
    await page.keyboard.type('Hello world')
    await expect(await textareaHeight()).toBeLessThan(height)
  })
})
