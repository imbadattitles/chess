import type { Colors } from '../Colors'
import logo from '../../assets/black-king.png'
import type { Cell } from '../Cell'

export enum FigureNames {
  FIGURE = 'Фигура',
  KING = 'Король',
  KNIGHT = 'Конь',
  PAWN = 'Пешка',
  QUEEN = 'Ферзь',
  ROOK = 'Ладья',
  BISHOP = 'Слон'
}

export class Figure {
  color: Colors
  logo: typeof logo | null
  cell: Cell
  name: FigureNames
  id: number

  constructor(color: Colors, cell: Cell) {
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.name = FigureNames.FIGURE
    this.id = Math.random()
  }

  canMove(target: Cell | undefined): boolean {
    if (target?.figure?.color === this.color) return false
    else return true
  }
  moveFigure() {}
}
