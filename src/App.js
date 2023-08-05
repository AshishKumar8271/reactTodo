import React, { useEffect, useState } from 'react';
import "./grocerList/grocery.css";


// // getting data from local storage:
const getDataFromStroage=()=>{
  let StorageList=localStorage.getItem("groceryList");
  if(StorageList!==[]){
    return JSON.parse(StorageList);
  }
  else{
    return [];
  }
}


const App = () => {
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(getDataFromStroage());
  const [itemName, setItemName] = useState('');
  const [editFlag, setEditFlag] = useState(false);
  const [editItem,setEditItem] = useState();
  const [alert,setAlert] = useState('');
  const [alertValue,setAlertValue] =useState('written just for the permanent space');


  //seting up items to local storage:
  useEffect(()=>{
    localStorage.setItem("groceryList",JSON.stringify(items));
  },[items]);


  



  //function for all types of alert:
  const alertfunction=(action,notifi)=>{
    setAlert(action);
      setAlertValue(notifi);
      setTimeout(()=>{
        setAlert('');
      },1000)
  }

  //handling the input:-
  const handleInput = (e) => {
    e.preventDefault();
    setEditFlag(false);
    if (itemName !== '' && !editFlag) {
      let inputObj = {
        id: new Date().getTime().toString(),
        value: itemName,
      }
      setItems([...items, inputObj]);
      setItemName('');
      alertfunction('success','Item is Added');
    }

    //items editing:-
    else if (itemName && editFlag) {
      setEditFlag(false);
      const inputObj = items.map((ele)=>{
        if(ele.id===editItem.id){
          ele.value = itemName;
        }
        return ele;
      })
      setItems(inputObj);
      setItemName('');
      alertfunction('success','item is edited');
    }


    else{
      alertfunction('danger','Please enter a value');
  }
}


  //deleting the Single item:-
  const deleteItem = (idOfItem) => {
    const newList = items.filter((ele) => {
      return ele.id !== idOfItem;
    })
    setItems(newList);
    alertfunction('danger','Item is removed');
  }


  //editing the single item:
  const itemToEdit = (id, value) => {
    setItemName(value);
    setEditFlag(true);
    const newItem = {
      id:id,
      value:value,
    }
    setEditItem(newItem);
  }


  // useEffect(()=>{


  // },[items])

  return (
    <section>
      <div className="center-div">
        <div className={`alert ${alert}`}><p>{alertValue}</p></div>

        <form onSubmit={handleInput}>
          <h1>Grocery Bud</h1>
          <input type="text" placeholder="e.g. eggs" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <button type="submit" className="add">{editFlag ? "Save" : "Add"}</button>
        </form>

        <div className="grocery">
          {
            items.map((item) => {
              const { id, value } = item;
              return (
                <article className='grocery-list' key={id}>
                  <p className="item-Name">{value}</p>
                  <div className="icons">
                    <i className="fa-solid fa-pen-to-square editBtn" onClick={() => itemToEdit(id, value)}></i>
                    <i className="fa-solid fa-trash deleteBtn" onClick={() => deleteItem(id)}></i>
                  </div>
                </article>
              )
            })
          }
        </div>

        <button className={`clearList ${items.length > 0 && `showClear`}`} onClick={() =>{
          setItems([]); //clearing all the items
          alertfunction('danger','items are removed'); //showing the alert using alertfunction decleared above
        } }>
          clear List
        </button>
      </div>
    </section>
  )
}
export default App;

