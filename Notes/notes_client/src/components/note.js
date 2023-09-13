/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Note = ({titulo,conteudo,onclick}) =>{
return(
    <div className="note">
        <div className="note-header">
            <div>
                <p className="note-title">{titulo}</p>
            </div>
            <div>
                <a href="#" className="close" onClick={onclick}>X</a>
            </div>
        </div>
        <div className="note-content">
            <p>{conteudo}</p>
        </div>
    </div>
)
}

export {Note}