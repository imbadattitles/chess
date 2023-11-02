import { Cell } from './Cell'
import { Colors } from './Colors'
import { Bishop } from './figures/bishop'
import { FigureNames, type Figure } from './figures/figure'
import { King } from './figures/king'
import { Knight } from './figures/knight'
import { Pawn } from './figures/pawn'
import { Queen } from './figures/queen'

export class Board {
  cells: Cell[][] = []
  lostBlackFigures: Figure[] = []
  lostWhiteFigures: Figure[] = []

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null))
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null))
        }
      }
      this.cells.push(row)
    }
  }

  public hightLightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]
      for (let j = 0; j < row.length; j++) {
        const target = row[j]
        target.available = !!selectedCell?.figure?.canMove(target)
      }
    }
  }

  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure)
  }

  public getCopyBoard() {
    const newBoard = new Board()
    newBoard.cells = this.cells
    newBoard.lostBlackFigures = this.lostBlackFigures
    newBoard.lostWhiteFigures = this.lostWhiteFigures
    return newBoard
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x]
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1))
      new Pawn(Colors.WHITE, this.getCell(i, 6))
    }
  }

  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0))
    new King(Colors.WHITE, this.getCell(4, 7))
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0))
    new Queen(Colors.WHITE, this.getCell(3, 7))
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0))
    new Bishop(Colors.BLACK, this.getCell(5, 0))
    new Bishop(Colors.WHITE, this.getCell(2, 7))
    new Bishop(Colors.WHITE, this.getCell(5, 7))
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0))
    new Knight(Colors.BLACK, this.getCell(6, 0))
    new Knight(Colors.WHITE, this.getCell(1, 7))
    new Knight(Colors.WHITE, this.getCell(6, 7))
  }

  private addRooks() {
    new Knight(Colors.BLACK, this.getCell(0, 0))
    new Knight(Colors.BLACK, this.getCell(7, 0))
    new Knight(Colors.WHITE, this.getCell(0, 7))
    new Knight(Colors.WHITE, this.getCell(7, 7))
  }

  public AddFigures() {
    this.addPawns()
    this.addKings()
    this.addQueens()
    this.addBishops()
    this.addKnights()
    this.addRooks()
  }

  getKing(color: Colors): Cell | undefined {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]
      for (let j = 0; j < row.length; j++) {
        const target = row[j]
        if (target.figure?.name === FigureNames.KING && target.figure?.color !== color)
          return target
      }
    }
  }

  public Mat(color: Colors) {
    let result = false
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]
      for (let j = 0; j < row.length; j++) {
        const target = row[j]
        if (target.figure && target.figure.canMove(this.getKing(color))) {
          result = true
        }
      }
    }
    return result
  }

  public canAttackCell(figure: Figure, cell: Cell) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]
      for (let j = 0; j < row.length; j++) {
        const target = row[j]
        if (
          target.figure &&
          target.figure.color !== figure.color &&
          target.figure.name !== FigureNames.KING &&
          target.figure?.canMove(cell)
        ) {
          return true
        }
      }
    }
  }
}
