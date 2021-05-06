import fs from 'fs'
import { PdfDocument } from './../pdf/PdfDocument'

const createExampleTable = () => {
  const doc = new PdfDocument({
    margin: 10,
    layout: 'landscape'
  })
  doc.document.pipe(fs.createWriteStream('example.pdf'))

  // doc.printImage('./test.png', { width: 100 }, { x: 20, y: 25 })
  doc.document
    .fillColor('#444444')
    .fontSize(20)
    .text('TEST', 150, 45)
    .fontSize(10)
    .text(new Date().toDateString(), 200, 50, { align: 'right' })
    .moveDown()
    .moveDown()

  const tableComo = {
    headers: ['field 1', 'field 2', 'field 3', 'field 4', 'field 5'],
    rows: [
      ['cell 1 1', 'cell 1 2', 'cell 1 3', 'cell 1 4', 'cell 1 5'],
      ['cell 2 1', 'cell 2 2', 'cell 2 3', 'cell 2 4', 'cell 2 5'],
      ['cell 3 1', 'cell 3 2', 'cell 3 3', 'cell 3 4', 'cell 3 5']
    ]
  }

  doc.printTable(tableComo, {})

  doc.document.end()
}

export default createExampleTable
