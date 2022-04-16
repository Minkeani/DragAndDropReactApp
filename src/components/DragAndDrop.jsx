import React from "react";
import { useState } from "react";

const DragAndDrop = function() {
    const [boards, setBoadrds] = useState([
        {id: 1, title: 'сделать', items: [{id: 1, title: 'пойти в магазин'}, {id: 2, title: 'купить что-то в магазине'}, {id: 3, title: 'уйти из магазина'}]}, 
        {id: 2, title: 'В процессе', items: [{id: 1, title: 'пойти в школу'}, {id: 2, title: 'учиться в школе'}, {id: 3, title: 'уйти из школы'}]}, 
        {id: 3, title: 'Готово', items: [{id: 1, title: 'пойти на работу'}, {id: 2, title: 'сделать проект на работе'}, {id: 3, title: 'уйти с работы'}]}, 
    
      ])
    
      const [currentBoard, setCurrentBoard] = useState(null)
      const [currentItem, setcurrentItem] = useState(null)
    
    
      function DragStartHandle(e, board, item) {
        setCurrentBoard(board)
        setcurrentItem(item)
      }
    
      function DragLeaveHandle(e) {
        e.target.style.boxShadow = 'none'
    
      }
      function DragEndHandle(e) {
        e.target.style.boxShadow = 'none'
    
      }
    
      function DragOverHandle(e) {
        if(e.target.className == 'item') {
          e.target.style.boxShadow = '0 2px 3px gray'
        }
        e.preventDefault()
      }
    
      function  DropCardHandle(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoadrds(boards.map(b => {
          if(b.id === board.id) {
            return board
          }
          if(b.id === currentBoard.id) {
              return currentBoard
          }
          return b
        }))
      }
     
      function DropHandle(e, board, item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0,  currentItem)
        setBoadrds(boards.map(b => {
          if(b.id === board.id) {
            return board
          }
          if(b.id === currentBoard.id) {
              return currentBoard
          }
          return b
        }))
        e.target.style.boxShadow = 'none'
      }

      return (
        <div className="app">
        {boards.map(board=> (
          <div 
          className='board'
          onDragOver={(e) =>  DragOverHandle(e)}
          onDrop={(e) =>  DropCardHandle(e, board)}
          >
            <div className='board__title'>{board.title}</div>
            {board.items.map(item => (
              <div className='item' 
              draggable={true}
              onDragStart={(e) => DragStartHandle(e, board, item)}
              onDragLeave={(e) => DragLeaveHandle(e)}
              onDragEnd={(e) => DragEndHandle(e)}
              onDragOver={(e) =>  DragOverHandle(e)}
              onDrop={(e) =>  DropHandle(e, board, item)}
              > {item.title}</div>
            ))}
          </div>
    ))}
      </div>
      )

}

export default DragAndDrop;