import * as fs from 'fs'
import { ExecutionContext } from 'ava'
import markdownlint, { LintError, Options, Rule } from 'markdownlint'

export function check({
  t,
  rule,
  inputFile,
  expected,
}: {
  t: ExecutionContext
  rule: Rule
  inputFile: string
  expected: boolean
}) {
  const options: Options = {
    config: {
      'zenn-slug': true,
    },
    customRules: [rule],
    files: [inputFile],
  }

  try {
    if (!fs.existsSync(inputFile)) {
      fs.writeFileSync(inputFile, '')
    }
  } catch (err) {
    t.fail((err as Error)?.message)
  }

  const errors = markdownlint.sync(options)[inputFile]
  // console.log({
  //   inputFile,
  //   errors
  // })
  try {
    fs.unlinkSync(inputFile)
  } catch (err) {
    t.fail((err as Error)?.message)
  }

  const res = checkLintError(errors)
  t.is(res, expected)
}

export function checkLintError(errors: LintError[]) {

//  console.log(['length', errors.length])

  if (errors.length !== 1) {
    return false
  }

  errors.forEach((error) => {
    // console.log(['ruleNames', error.ruleNames])
    // console.log(['length', error.ruleNames.length])
    // console.log(['ruleNames[0]', error.ruleNames[0]])

    if (
      !error.ruleNames ||
      error.ruleNames.length !== 1 ||
      error.ruleNames[0] !== 'zenn-slug'
    ) {
      return false
    }
  })

  return true
}
