import React, {
  createContext,
  useContext,
  useReducer,
  useEffect, useRef
} from 'react';

const HOST_API = 'http://localhost:8080/api';

const initialState = {
  list:[]
};
const Store = createContext(initialState);

const Form = () => {
  const fornRef = useRef(null);
  const {dispatch, state} = useContext(Store);

  const onAdd = (event) => {
    event.preventDefault();
    const request = {
      id:null,
      name: state.name,
      description: this.state.description,
      isCompleted: false
    }

    fetch(HOST_API+'/todo', {
      method: 'POST',
      body: JSON.stringify(request),
      headers:{'Content-Type':'application/json'}
    })
        .then(response => response.json())
        .then((todo)=>{
          dispatch({type: 'add-item', item: todo});
          setState({name: '', description: ''});
          fornRef.current.reset();
        });

  }

  return(
      <form ref={fornRef}>
        <input type='text' name='name'
               onChange={(event)=>{
                    setState({...state, name: event.target.value}) }} />
        <input type='text' name='description'
               onChange={(event)=>{
                 setState({...state, description: event.target.value}) }} />
        <button onClick={onAdd} >Agregar</button>
      </form>
  )
}

const List = () => {
  const {dispatch, state} = useContext(Store);

  useEffect(()=>{
    fetch(HOST_API +'/todos')
        .then(response=> response.json())
        .then((list)=>{
          dispatch({type: 'update-list', list})
        })
  }, [state.list.length, dispatch]);

  return(
      <div>
        <table>
          <thead>
          <tr>
            <td>Id</td>
            <td>Nombre</td>
            <td>¿Está Completado?</td>
          </tr>
          </thead>
          <tbody>
          {state.list.map((todo)=>{
            return(
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.name}</td>
                  <td>{todo.isCompleted}</td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>
  )
}

function reducer(state, action) {
  switch (action.type){
    case 'update-list':
      return {...state, list: action.list}
    case 'add-item':
      const newList = state.list;
      newList.push(action.item);
      return {...state, list:newList};
    default:
      return state;
  }
}

const  StoreProvider = ({children})=>{
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
      <Store.Provider value={{state, dispatch}}>
        {children}
      </Store.Provider>
  )
}



function App() {
  return (
    <StoreProvider>
      <List/>
    </StoreProvider>
  );
}

export default App;
