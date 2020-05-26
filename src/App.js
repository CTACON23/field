import React, {useState} from 'react';
import s from './App.module.css';


function App() {
  const [row, setRow] = useState([0,1,1,1,1,0]);
  const [col, setCol] = useState([0,1,1,1,1,0]);

  const displayButton = (e) =>{
    // eslint-disable-next-line
    if(e.target.getAttribute('trid') != row.length-1 && e.target.getAttribute('trid') != 0){
         e.currentTarget.classList.add(`${s.buttonRemove}`)
    }
    // eslint-disable-next-line
    if(e.target.getAttribute('tdid') != 0 && e.target.getAttribute('tdid') != col.length-1){
         e.currentTarget.parentNode.childNodes[0].childNodes[e.target.getAttribute('tdid')].classList.add(`${s.buttonRemove}`)
    }
  };

  const hideButton = (e) =>{
          e.currentTarget.classList.remove(`${s.buttonRemove}`);
          e.currentTarget.parentNode.childNodes[0].childNodes[e.target.getAttribute('tdid')].classList.remove(`${s.buttonRemove}`)
  };
  const deleteCol = () =>{
    col.splice(-1,1);
    setCol(col => col);
   /* setRow(row => [0,1,1,1,1,0])*/
    setRow(row=>[...row])
  };
  const deleteRow = () =>{
    row.splice(-1,1);
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

  window.state = col;
  return (

    <div className={s.App} >
      <table >
        <tbody>
          {row.map((x,indextr)=>

              <tr key={indextr} onMouseOverCapture={displayButton.bind(this)} onMouseLeave={hideButton.bind(this)}>
                {col.map((y,indextd)=>
                    <td key={`${indextr}`+`${indextd}`}
                        trid={indextr} tdid={indextd}

                        onClick={indextr===0 ? ()=>deleteCol(): indextd===0 ? ()=>deleteRow() : indextr===row.length-1 ? ()=>addRow(): indextd===col.length-1 ? ()=>addCol():' '}
                        className={indextr===0 || indextd===col.length-1 && indextr!==1 ? ' ':
                        (indextr===row.length-1 && indextd===1 || indextr===1 && indextd===col.length-1) ? `${s.buttonAdd}` : indextd===0 || indextr===row.length-1? ' ' :`${s.color}`}/>
                )}
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
