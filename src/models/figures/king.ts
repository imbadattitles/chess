import { Figure, FigureNames } from './figure'
import blackLogo from '@/assets/black-king.png'
import whiteLogo from '@/assets/white-king.png'
import { Colors } from '../Colors'
import type { Cell } from '../Cell'

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.KING
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false

    const validCoordinates = [
      { x: this.cell.x - 1, y: this.cell.y },
      { x: this.cell.x - 1, y: this.cell.y + 1 },
      { x: this.cell.x - 1, y: this.cell.y - 1 },
      { x: this.cell.x, y: this.cell.y - 1 },
      { x: this.cell.x, y: this.cell.y + 1 },
      { x: this.cell.x + 1, y: this.cell.y },
      { x: this.cell.x + 1, y: this.cell.y + 1 },
      { x: this.cell.x + 1, y: this.cell.y - 1 }
    ]

    for (const coordinates of validCoordinates) {
      if (
        target.x === coordinates.x &&
        target.y === coordinates.y &&
        !this.cell.board.canAttackCell(this, this.cell.board.getCell(target.x, target.y))
      ) {
        return true
      }
    }

    return false
  }
}
