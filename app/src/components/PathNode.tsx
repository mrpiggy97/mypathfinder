import React from 'react'
import "./css/PathNode.css"

type PathNodeProps = {
    IsBeginning : boolean
    IsEnd : boolean
}

export default function PathNode(props : PathNodeProps) : JSX.Element{
    let cssClass : string = ""

    switch(props.IsBeginning){
        case true:
            cssClass = "path-node-is-beggining path-node-basic"
        break
        case false:
            if(props.IsEnd === true){
                cssClass = "path-node-is-end path-node-basic"
            }
        break
        default:
            cssClass = "path-node path-node-basic"
    }
    return(
        <div className="path-node path-node-basic">
        </div>
    )
}

export type {PathNodeProps}