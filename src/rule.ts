import path from 'path'
import helpers from './helpers'
import { Rule } from 'markdownlint'

export default {
  names: ['zenn-slug'],
  description: 'Linting file name for zenn convention.',
  tags: ['zenn'],
  parser: 'markdownit',
  function: (params, onError) => {
    const filePath = path.parse(params.name)
    // console.log({ filePath })

    const slug = filePath.name

    if (!helpers.validateSlug(slug)) {
      onError({
        lineNumber: 1,
        detail: helpers.getSlugErrorMessage(slug),
      })
    }

    if (slug === 'what-is-slug') {
      onError({
        lineNumber: 1,
        detail: helpers.getConflictSlugMessage(slug),
      })
    }
  },
} satisfies Rule
