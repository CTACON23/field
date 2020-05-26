import React, {useState} from 'react';
import s from './App.module.css';

/*
* all buttons and cell
* are part of table>tbody
* and present like <td> tag
*/

function App() {

  // number of Row
  const [row, setRow] = useState([0,1,1,1,1,0]);

  //number of Cell
  const [col, setCol] = useState([0,1,1,1,1,0]);

  /*
  * mouseOver td(cell) event
  * to display remove-button on the top and left.
  * initialize IS  making by adding class into the same
  * trID(for deleteRow) &&  tdID(for deleteCell) cell , like event.target
  */
  const displayButton = (e) =>{
    // eslint-disable-next-line
    if(e.target.getAttribute('trid') != row.length-1 && e.target.getAttribute('tdid') != col.length-1 && e.target.getAttribute('trid') != 0){
        e.target.parentNode.childNodes[0].classList.add(`${s.buttonRemove}`)
    }
    // eslint-disable-next-line
    if(e.target.getAttribute('tdid') != 0 && e.target.getAttribute('tdid') != col.length-1 && e.target.getAttribute('trid') != row.length-1){
      e.target.parentNode.parentNode.childNodes[0].childNodes[e.target.getAttribute('tdid')].classList.add(`${s.buttonRemove}`)
    }
  };

  /*
  * mouseLeft td(cell) event
  * to hide remove-button on the top and left
  */
  const hideButton = (e) =>{
    e.target.parentNode.childNodes[0].classList.remove(`${s.buttonRemove}`);
    e.currentTarget.parentNode.parentNode.childNodes[0].childNodes[e.target.getAttribute('tdid')].classList.remove(`${s.buttonRemove}`);
  };

  // onClick events to set row/col
  const deleteCol = () =>{
    col.splice(-1,1);
    col.splice(-1,1);
    col.push(0);
    setCol(col => col);
    setRow(row=>[...row])
  };
  const deleteRow = () =>{
    row.splice(-1,1);
    row.splice(-1,1);
    row.push(0);
    setCol(col => [...col]);
    setRow(row => row)
  };
  const addRow = () =>{
    row.splice(row.length-1,0,1);
    setCol(col => [...col]);
    setRow(row => row)
  };
  const addCol = ()=>{
    col.splice(col.length-1,0,1);
    setCol(col => col);
    setRow(row => [...row])
  };

  window.state = [col,row];
  return (
    <div className={s.App} >
      <table >
        <tbody>
          {row.map((x,indextr)=>

              <tr key={indextr}  >
                {col.map((y,indextd)=>
                    <td key={`${indextr}${indextd}`}
                        onMouseLeave={hideButton.bind(this)}
                        onMouseOverCapture={displayButton.bind(this)}
                        trid={indextr} tdid={indextd}
                        onClick={indextr===0 ? ()=>deleteCol() : indextd===0 ? ()=>deleteRow() : indextr===row.length-1 ? ()=>addRow(): indextd===col.length-1 ? ()=>addCol(): ()=>{}}
                        className={
                          (indextr===0 || indextd===col.length-1) && indextr!==1 ? ' ':
                        ((indextr===row.length-1 && indextd===1) || (indextr===1 && indextd===col.length-1)) ? `${s.buttonAdd}` :
                            indextd===0 || indextr===row.length-1? ' ' :`${s.color}`
                        }/>
                )}
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
