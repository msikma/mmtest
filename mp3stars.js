import path from 'path'
import {parseFile} from 'music-metadata'

// Note: all test cases have a 4 star rating set using the Winamp 5.666 Media Library.
const TESTCASE_FILES = [
  'testcase-0star.mp3',
  'testcase-1star.mp3',
  'testcase-2star.mp3',
  'testcase-3star.mp3',
  'testcase-4star.mp3',
  'testcase-5star.mp3'
]
const TESTCASE_PATH = './testcases/'

async function main(files = TESTCASE_FILES, basedir = TESTCASE_PATH) {
  for (const file of files) {
    const filepath = path.join(basedir, file)
    const data = await parseFile(filepath)

    console.log(`${filepath}:`)
    console.log(`  native POPM:`, data.native['ID3v2.3'].find(item => item.id === 'POPM'))
  }
}

main()
