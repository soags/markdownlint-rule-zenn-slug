import path from 'path'
import { Rule } from 'markdownlint'

export default {
  names: ['zenn-slug'],
  description: 'Linting file name for zenn convention.',
  tags: ['zenn'],
  parser: 'markdownit',
  asynchronous: true,
  function: async (params, onError) => {
    const filePath = path.parse(params.name)
    const slug = filePath.name

    if (!validateSlug(slug)) {
      onError({
        lineNumber: 1,
        detail: getSlugErrorMessage(slug),
      })
    }

    const response = await fetch(`https://zenn.dev/api/articles/${slug}`)

    if (response.ok) {
      onError({
        lineNumber: 1,
        detail: getConflictSlugMessage(slug),
      })
    }
  },
} satisfies Rule

function validateSlug(slug: string) {
  if (!slug) return false
  return /^[0-9a-z\-_]{12,50}$/.test(slug)
}

function getSlugErrorMessage(slug: string) {
  return `slugの値（${slug}）が不正です。小文字の半角英数字（a-z0-9）、ハイフン（-）、アンダースコア（_）の12〜50字の組み合わせにしてください`
}

function getConflictSlugMessage(slug: string) {
  return `slugの値（${slug}）が不正です。このslugは既に使われています。`
}

// function validateChapterSlug(slug: string) {
//   if (!slug) return false
//   return /^[0-9a-z\-_]{1,50}$/.test(slug) || /^[0-9]+.[0-9a-z\-_]{1,50}$/.test(slug)
// }

// function getChapterSlugErrorMessage(slug: string) {
//   return `チャプターのslugの値（${slug}）が不正です。小文字の半角英数字（a-z0-9）、ハイフン（-）、アンダースコア（_）の1〜50字の組み合わせにしてください`
// }
