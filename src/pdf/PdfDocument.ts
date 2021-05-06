import PDFDocument from 'pdfkit'
import { Doc, DocOptions, imageOptions, Table, TableOptions } from './pdf.models'

const COL_SPACING = 10
const ROW_SPACING = 5
const ALIGN_LEFT = 'left'
const ALIGN_CENTER = 'center'
const V_ALIGN_MIDDLE = 'middle'

export class PdfDocument {
  private _document: Doc

  constructor(options: DocOptions) {
    this._document = new PDFDocument(options)
  }

  get document() {
    return this._document
  }

  getColumnWidth(maxWidth: number, columnCount: number, columnSpacing = COL_SPACING): number {
    return maxWidth / columnCount - columnSpacing
  }

  getRowHeight(row: string[], columnWidth: number, rowSpacing = ROW_SPACING): number {
    let result = 0

    row.forEach((cell: string) => {
      const cellHeight = this._document.heightOfString(cell, {
        width: columnWidth,
        align: ALIGN_LEFT
      })
      result = Math.max(result, cellHeight)
    })

    return result + rowSpacing
  }

  getPageHeight(pageHeight: number, marginBottom: number): number {
    return pageHeight - marginBottom
  }

  printImage(
    imagePath: string,
    options: imageOptions = {},
    position?: { x: number; y: number }
  ): Doc {
    return this.document.image(imagePath, position?.x, position?.y, options).moveDown()
  }

  printTable(table: Table, options: TableOptions) {
    const columnCount = table.headers.length
    const { columnSpacing = COL_SPACING, rowSpacing = ROW_SPACING, width } = options
    const { page, y } = this._document
    const maxWidth = !!width ? width : page.width - page.margins.left - page.margins.right
    const columnWidth = this.getColumnWidth(maxWidth, columnCount, columnSpacing)
    const maxY = this.getPageHeight(page.height, page.margins.bottom)
    let startX = page.margins.left
    let startY = y

    let rowBottomY = 0
    this._document.on('pageAdded', () => {
      startY = page.margins.top
      rowBottomY = 0
    })

    // Format font to be hightlight for header
    this._document.font('Helvetica-Bold').fontSize(8)
    const headerHeight = this.getRowHeight(table.headers, columnWidth, rowSpacing)
    // Check to have enough room for header and first rows
    if (startY + 3 * headerHeight > maxY) {
      this._document.addPage()
    }

    // this._document
    //   .moveTo(startX, startY - 6)
    //   .lineTo(startX + maxWidth, startY - 6)
    //   .lineWidth(1.5)
    //   .stroke()

    // Print all headers
    table.headers.forEach((header, i) => {
      // columnWidth + columnSpacing = Column container
      this._document.text(header, startX + i * (columnWidth + columnSpacing), startY, {
        width: columnWidth,
        align: ALIGN_LEFT,
        baseline: V_ALIGN_MIDDLE
      })

      // this._document
      //   .moveTo(startX + i * (columnWidth + columnSpacing), startY - 6)
      //   .lineTo(startX + i * (columnWidth + columnSpacing), startY - 2 + headerHeight)
      //   .lineWidth(1.5)
      //   .stroke()
    })

    // Refresh the y coordinate of the bottom of the headers row
    rowBottomY = Math.max(startY + headerHeight, rowBottomY)

    // Separation line between headers and rows
    this._document
      .moveTo(startX, rowBottomY - rowSpacing)
      .lineTo(startX + maxWidth, rowBottomY - rowSpacing)
      .lineWidth(1.5)
      .stroke()

    // Print all rows
    table.rows.forEach(row => {
      this._document.font('Helvetica').fontSize(6)
      const rowHeight = this.getRowHeight(row, columnWidth, rowSpacing)

      // Switch to next page if we cannot go any further because the space is over.
      // For safety, consider 3 rows margin instead of just one
      if (startY + 3 * rowHeight < maxY) {
        startY = rowBottomY + rowSpacing
      } else {
        this._document.addPage()
      }

      // Print all cells of the current row
      row.forEach((cell, i) => {
        if (i < 3) {
          this._document.font('Helvetica-Bold')
        } else {
          this._document.font('Helvetica')
        }

        this._document.text(cell, startX + i * (columnWidth + columnSpacing), startY, {
          width: columnWidth,
          align: ALIGN_LEFT,
          baseline: V_ALIGN_MIDDLE
        })
      })

      // Refresh the y coordinate of the bottom of this row
      rowBottomY = Math.max(startY + rowHeight, rowBottomY)

      // Separation line between rows
      this._document
        .moveTo(startX, rowBottomY - rowSpacing * 0.5)
        .lineTo(startX + maxWidth, rowBottomY - rowSpacing * 0.5)
        .lineWidth(0.2)
        .opacity(0.7)
        .stroke()
        .opacity(1) // Reset opacity after drawing the line
    })

    this._document.x = startX
    this._document.moveDown()

    return this
  }
}
