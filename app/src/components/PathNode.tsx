import React,{useState,useEffect} from 'react'
import "./css/PathNode.css"

type PathNodeProps = {
    IsBeginning : boolean
    IsEnd : boolean
}

export default function PathNode(props : PathNodeProps) : JSX.Element{
    let [status,setStatus] = useState("")

    const defineStatus = () => {
        if(props.IsBeginning && !props.IsEnd){
            setStatus("path-node-basic path-node-is-beginning")
        }
        if(props.IsEnd && !props.IsBeginning){
            setStatus("path-node-basic path-node-is-end")
        }
        if(!props.IsBeginning && !props.IsEnd){
            setStatus("path-node-basic path-node")
        }
    }

    useEffect(defineStatus,[props.IsBeginning,props.IsEnd])

    return(
        <div className={status}>
        </div>
    )
}

export type {PathNodeProps}