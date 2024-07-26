import test from 'ava'
import { check } from './helpers'
import rule from '../src/rule'

test('invalid_1', (t) =>
  check({ t, rule, inputFile: 'tests/articles/tooshort.md', expected: false }))

test('invalid_2', (t) =>
  check({
    t,
    rule,
    inputFile: 'tests/articles/INVALIDCHARACTER.md',
    expected: false,
  }))

test('invalid_3', (t) =>
  check({
    t,
    rule,
    inputFile: 'tests/articles/無効なファイル名.md',
    expected: false,
  }))

test('conflict_1', (t) =>
  check({
    t,
    rule,
    inputFile: 'tests/articles/what-is-slug.md',
    expected: false,
  }))

test('conflict_2', (t) =>
  check({
    t,
    rule,
    inputFile: 'tests/articles/install-zenn-cli.md',
    expected: false,
  }))

test('accept_1', (t) =>
  check({
    t,
    rule,
    inputFile:
      'tests/articles/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5.md',
    expected: true,
  }))

test('accept_2', (t) =>
  check({
    t,
    rule,
    inputFile: 'tests/articles/2efdbeb0424906.md',
    expected: true,
  }))
