import * as MangaDex from '../Source/MangaDex'
import * as MintManga from '../Normalizer/NormalizeManga'

function getSource(source) {
  if (source === 'mintManga') {
    return MintManga
  }

  return MangaDex
}
