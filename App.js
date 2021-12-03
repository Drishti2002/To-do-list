import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

//to get the data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("todo-list");
  //console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("todo-list"));
  } else {
    return [];
  }
}

const App = () => {

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editedItem, setEditedItem] = useState(null);
  // const itemEvent =(e)=>{
  //   setInput(e.target.value);
  // };

  /*-------Add items--------*/
  const showList = () => {
    // setItems(()=>{
    //   return [...items, inputData];
    // });
    if (!inputData) {
      alert("Please enter a valid item");
    }
    else if (inputData && !toggleBtn) {
      setItems(items.map((currVal) => {
        if (currVal.id === editedItem) {
          return { ...currVal, name: inputData };
        }
        return currVal;
      }));
      setToggleBtn(true);
      setInputData("");
      setEditedItem(null);
    }
    else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInputData]);
      //console.log(allInputData);
      setInputData("");
    }
  };

  /*-------Delete items--------- */
  const deleteItem = (id) => {
    const updatedItems = items.filter((currVal) => {
      return id !== currVal.id;
    });
    setItems(updatedItems);
  }

  /*------Clear list---------- */
  const removeAll = () => {
    setItems([]);
  };

  /*-------Edit items-------- */
  const editItem = (id) => {
    const newEditItem = items.find((currVal) => {
      return id === currVal.id;
    });
    //console.log(newEditItem);
    setToggleBtn(false);
    setInputData(newEditItem.name);
    setEditedItem(id);
  };

  /*--------add to local storage---------- */
  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(items))
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <div class="card mt-5">
              <div class="card-body">
                <h1 class="card-title text-center">Todo List</h1>
                <div className="row">
                  <div className="col-12 col-md-10 col-sm-9 mx-auto">
                    <div className="row gy-2 mt-3">
                      <div className="col-md-9 col-sm-8">
                        <input type="text" class="form-control fw-bolder" placeholder="Enter an item..." value={inputData} onChange={(e) => setInputData(e.target.value)} />
                      </div>
                      <div className="col-md-3 col-sm-4 d-flex justify-content-center">
                        {
                          toggleBtn ? <button type="button" className="btn" onClick={showList}><strong>Add</strong></button> :
                            <button type="button" className="btn" onClick={showList}><strong>Edit</strong></button>
                        }

                        {/* <button type="button" className="btn" onClick={()=>setItems([...items, inputData])}><strong>Add</strong></button> */}

                      </div>
                    </div>
                  </div>
                </div>


                {/* <li>{inputData}</li> */}
                {/* {items.map((itemval, indx)=>{
                    return <li key={indx}>{itemval}</li>;
                  })} */}
                <div className="mt-4">
                  {items.map((currVal) => {
                    return (
                      <div className="row mb-3">
                        <div className="col-12 col-md-10 col-sm-9 mx-auto">
                          <div className="todo-list rounded d-flex justify-content-between fw-bolder">
                            <div className="ms-3 my-1 d-flex justify-content-start align-items-center" key={currVal.id}>
                              <input class="form-check-input rounded-pill" type="checkbox" value="" id="flexCheckDefault" />
                              <div className="ms-3 fs-6">{currVal.name}</div>
                              {/* {console.log(currVal.name + "hkj")} */}
                            </div>
                            <div className="todo-btn my-1 fs-5 d-flex justify-content-end align-items-center">
                              <div className="me-2 editbtn" onClick={() => editItem(currVal.id)}><FaEdit /></div>
                              <div className="me-2 delbtn" onClick={() => deleteItem(currVal.id)}><MdDelete /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div class="d-grid mx-auto mt-3">
                  <button class="btn" type="button" onClick={removeAll}><strong>Clear All</strong></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;