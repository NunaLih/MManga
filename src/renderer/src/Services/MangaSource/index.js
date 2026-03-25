import * as MangaDex from '../MangaDex/MangaDex'
import * as MintManga from '../MintManga/MintManga'

function getSource(source) {
  if (source === 'mintManga') {
    return MintManga
  }

  return MangaDex
}
