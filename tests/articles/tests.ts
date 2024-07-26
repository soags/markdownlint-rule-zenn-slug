import * as fs from 'fs'
import test from 'ava'
import rule from '../../rule'
import markdownlint, { LintResults, Options } from 'markdownlint'
import path from 'path'

const articlePath = '/tests/articles/'

init()

testArticle('tooshort.md', false)

testArticle('INVALIDCHARACTER.md', false)

testArticle('無効なファイル名.md', false)

testArticle('what-is-slug.md', false)

testArticle('install-zenn-cli.md', false)

testArticle('a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5.md', true)

testArticle('2efdbeb0424906.md', true)

function init() {
  if (fs.existsSync(articlePath)) {
    fs.rmdirSync(articlePath, { recursive: true })
  }
  fs.mkdirSync(articlePath, { recursive: true })
}

function testArticle(inputFile: string, expected: boolean) {
  const filePath = path.join(articlePath, inputFile)

  test(inputFile, async (t) => {
    t.plan(1)

    const options: Options = {
      config: {
        'zenn-slug': true,
      },
      customRules: [rule],
      files: [filePath],
    }

    fs.writeFileSync(filePath, '')

    return new Promise<void>((resolve) => {
      markdownlint(options, (err, results) => {
        if (!results) return

        t.is(checkResult(results), expected)

        resolve()
      })
    })
  })
}

function checkResult(results: LintResults) {
  for (const file of Object.keys(results)) {
    const fileErrors = results[file]
    for (const error of fileErrors) {
      if (error.ruleNames.includes('zenn-slug')) {
        return false
      }
    }
  }
  return true
}
