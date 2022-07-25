import React,{useState,useEffect} from 'react'
import "./css/PathNode.css"

type PathNodeProps = {
    IsBeginning : boolean
    IsEnd : boolean
}

export default function PathNode(props : PathNodeProps) : JSX.Element{
    let [status,setStatus] = useState("")

    const defineStatus = () => {
        switch(props.IsBeginning){
            case props.IsBeginning === true:
                setStatus("path-node path-node-is-beginning")
            break
            case props.IsBeginning === false:
                if(props.IsEnd === true){
                    setStatus("path-node path-node-is-end")
                }
            break
            default:
                setStatus("path-node path-node-basic")
        }
    }

    useEffect(defineStatus,[props.IsBeginning,props.IsEnd])

    return(
        <div className={status}>
        </div>
    )
}

export type {PathNodeProps}