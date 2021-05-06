export interface Doc {
  page: Page
  x: number
  y: number
  widthOfString: (text: string, options?: TextOptions) => number
  heightOfString: (text: string, options?: TextOptions) => number
  addPage: (options?: DocOptions) => this
  lineGap: (lineGap: number) => this
  moveDown: (line?: number) => this
  moveUp: (line?: number) => this
  moveTo: (x: number, y: number) => this
  lineTo: (x: number, y: number) => this
  lineWidth: (w: number) => this
  text: (text: string, x?: number, y?: number, options?: TextOptions) => this
  font: (fontFamily: string) => this
  fontSize: (size: number) => this
  list: (list: Array<string | any>, x?: number, y?: number, options?: TextOptions) => this
  on: (event: string, func: () => void) => this
  stroke: () => this
  opacity: (opacity: number) => this
  pipe: (a: any) => this
  image: (a: any, x?: number, y?: number, options?: any) => this
  end: () => void
  rect: (x0: number, x1: number, y0: number, y1: number) => this
  fill: (color: string) => this
  fillColor: (color: string) => this
  fillAndStroke: (color1: string, color2: string) => this
}

export interface Table {
  headers: string[]
  rows: string[][]
  /*
    [
      'tr', 
      'tr'
    ],
    [
      ['td', 'td'],
      ['td', 'td']
    ]
  */
}

export interface TableOptions {
  startX?: number
  startY?: number
  width?: number
  rowSpacing?: number
  columnSpacing?: number
  prepareHeader?: () => {}
  prepareRow?: (row: string[], index: number) => {}
}

interface Page {
  size: string
  layout: string
  margins: Margins
  width: number
  height: number
}

interface Margins {
  top: number
  left: number
  bottom: number
  right: number
}

interface TextOptions {
  /**  Set to false to disable line wrapping all together */
  lineBreak?: boolean
  /** The width that text should be wrapped to (by default, the page width minus the left and right margin) */
  width?: number
  /**  The maximum height that text should be clipped to */
  height?: number
  /** The character to display at the end of the text when it is too long. Set to true to use the default character. */
  ellipsis?: boolean | string
  /**  the number of columns to flow the text into */
  columns?: number
  /** the amount of space between each column (1/4 inch by default) */
  columnGap?: number
  /** The amount in PDF points (72 per inch) to indent each paragraph of text */
  indent?: number
  /** the amount of space between each paragraph of text */
  paragraphGap?: number
  /** the amount of space between each line of text */
  lineGap?: number
  /** the amount of space between each word in the text */
  wordSpacing?: number
  /** the amount of space between each character in the text */
  characterSpacing?: number
  /** whether to fill the text (true by default) */
  fill?: boolean
  /**  whether to stroke the text */
  stroke?: boolean
  /** A URL to link this text to (shortcut to create an annotation) */
  link?: string
  /** whether to underline the text */
  underline?: boolean
  /** whether to strike out the text */
  strike?: boolean
  /** whether the text segment will be followed immediately by another segment. Useful for changing styling in the middle of a paragraph. */
  continued?: boolean
  /** whether to slant the text (angle in degrees or true) */
  oblique?: boolean | number
  /** the alignment of the text (center, justify, left, right) */
  align?: 'center' | 'justify' | 'left' | 'right' | string
  /** the vertical alignment of the text with respect to its insertion point */
  baseline?:
    | number
    | 'svg-middle'
    | 'middle'
    | 'svg-central'
    | 'bottom'
    | 'ideographic'
    | 'alphabetic'
    | 'mathematical'
    | 'hanging'
    | 'top'
}

export interface DocOptions {
  compress?: boolean
  info?: DocInfo
  userPassword?: string
  ownerPassword?: string
  permissions?: DocPermissions
  pdfVersion?: '1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.7ext3'
  autoFirstPage?: boolean
  size?: number[] | string
  margin?: number
  margins?: Margins
  layout?: 'portrait' | 'landscape'
  bufferPages?: boolean
}

interface DocInfo {
  Producer?: string
  Creator?: string
  CreationDate?: Date
  Title?: string
  Author?: string
  Keywords?: string
  ModDate?: Date
}

interface DocPermissions {
  modifying?: boolean
  copying?: boolean
  annotating?: boolean
  fillingForms?: boolean
  contentAccessibility?: boolean
  documentAssembly?: boolean
  printing?: 'lowResolution' | 'highResolution'
}

interface Margins {
  top: number
  left: number
  bottom: number
  right: number
}

export interface imageOptions {
  width?: number
}
