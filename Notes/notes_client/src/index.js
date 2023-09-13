/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from'react'
import ReactDOM from 'react-dom'
import './styles/main.css'
import {Note} from './components/note'

const baseURL = 'http://localhost:8000'

const App = () =>{
    const [modalVisivel, setModalVisivel]= useState(false);
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [notas,setNotas] = useState([])
    
    const getAllNotas = async() =>{
        const response = await fetch(`${baseURL}/notes/`)

        const data = await response.json()

        if(response.ok){
            console.log(data)
            setNotas(data)
        }else{
            console.log("Falha na conexão")
        } 
    }
    useEffect( () =>{
            getAllNotas()
        },[]
        )
        const criarNota = async (event) => {
            event.preventDefault();
          
            const new_request = new Request(`${baseURL}/notes/`, {
              body: JSON.stringify({ titulo, conteudo }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });
          
            const response = await fetch(new_request);
          
            if (response.ok) {
              const data = await response.json();
              
              setNotas([...notas, data]);              
              setTitulo('');
              setConteudo('');             
              setModalVisivel(false);
            } else {
              console.log('Falha na conexão');
            }
          };
          
          const deleteItem = async (id) => {
            const confirmDelete = window.confirm('Deseja realmente excluir esta nota?');
          
            if (confirmDelete) {
              const delete_request = new Request(`${baseURL}/notes/${id}`, {
                method: 'DELETE',
              });
          
              const response = await fetch(delete_request);
          
              if (response.ok) {               
                setNotas(notas.filter((nota) => nota.id !== id));
              } else {
                console.log('Falha ao excluir a nota');
              }
            }
          };
          
    return(
        <div>
            <div className="header">
                <div className="logo">
                    <p className='titulo'>Notebook</p>
                </div>
                <div className="adiciona-btn">
                    <a className='add-note' href="#" onClick={()=>setModalVisivel(true)}>Adicionar Nota</a>
                </div>
            </div>
            {notas.length > 0? (
            <div className='notes-list'>
                {
                    notas.map(
                        (item)=>(
                            <Note titulo={(item.titulo)}
                            conteudo={(item.conteudo)}
                            onclick={()=>deleteItem(item.id)}
                            key={item.id}
                            />
                        )
                    )
                }
            </div>):(<div className="no-notes">
                <p className='centerText'>Sem Anotações</p>
            </div>)
            }
            
            
            <div className={modalVisivel? 'modal' : 'modal-invisivel'}>
                <div className="form">
                    <div className="form-header">
                        <p className='form-header-text'>Adicione uma Anotação</p>
                    <div>
                        <a className='close-btn' href="#" onClick={()=>setModalVisivel(!modalVisivel)}>X</a>
                    </div>
                    </div>
                    <form action=''>
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        <input type="text" name="title" id="titulo" 
                        value={titulo}
                        onChange={(e) =>setTitulo(e.target.value)}
                        className="form-control" 
                        required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Conteúdo</label>
                        <textarea name="content" id="" cols="30" rows="5" 
                        value={conteudo}
                        onChange={(e) =>setConteudo(e.target.value)}
                        className='form-control' required></textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Salvar" className='btn' onClick={criarNota}/>
                    </div>
                </form> 
                </div>
            </div>
        </div>
    )
}
ReactDOM.render(<App/>, document.querySelector('#root'));