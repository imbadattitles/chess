import { Figure, FigureNames } from './figure'
import blackLogo from '@/assets/black-queen.png'
import whiteLogo from '@/assets/white-queen.png'
import { Colors } from '../Colors'
import type { Cell } from '../Cell'

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.QUEEN
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    if (this.cell.isEmptyVerical(target)) return true
    if (this.cell.isEmptyHorizontal(target)) return true
    if (this.cell.isEmptyDiagonal(target)) return true
    return false
  }
}
