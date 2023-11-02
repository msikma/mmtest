import path from 'path'
import {parseFile} from 'music-metadata'
import {findM4aWinampRating} from './lib/m4a.js'
import {convertMp3WinampRating} from './lib/mp3.js'

// Note: all test cases have a 4 star rating set using the Winamp 5.666 Media Library.
const TESTCASE_FILES = [
  //'testcase.wav', .wav provided for completeness only, doesn't actually properly work in Winamp.
  'testcase.opus',
  'testcase.mp3',
  'testcase.m4a',
  'testcase.flac'
]
const TESTCASE_PATH = './testcases/'

async function main(files = TESTCASE_FILES, basedir = TESTCASE_PATH) {
  for (const file of files) {
    const filepath = path.join(basedir, file)
    const pathinfo = path.parse(file)
    const data = await parseFile(filepath)

    let hack = {}

    if (pathinfo.ext === '.m4a') {
      // Grab the rating value using our hack.
      const rating = await findM4aWinampRating(filepath)
      hack = [rating.value]
    }
    if (data.common.rating?.[0]?.source === 'rating@winamp.com') {
      // Fix the weird value applied to .mp3 files.
      hack = [convertMp3WinampRating(data.common.rating?.[0]?.rating)]
    }
    console.log(`${filepath}:`)
    console.log(`  music-metadata:`, data.common.rating)
    console.log(`  hack:          `, hack)
  }
}

main()
