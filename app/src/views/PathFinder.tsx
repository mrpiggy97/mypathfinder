import React,{useMemo} from "react";
import PathNode from "../components/PathNode";

import "./css/PathFinder.css"

// returns an array containing all the nodes to be rendered
function getNodesForCanvas(canvasSize : number) : number[]{
    let nodesInCanvas : number[] = []
    for(let i = 0; i < canvasSize; i++){
        nodesInCanvas.push(i)
    }
    return nodesInCanvas
}

type PathFinderProps = {
    CanvasSize : number
}

export default function PathFinder(props : PathFinderProps) : JSX.Element{
    let nodes = useMemo(() => {
        return getNodesForCanvas(props.CanvasSize)
    },[props.CanvasSize])

    return(
        <div id="path-finder">
            {nodes.map((node) => {
                return <PathNode
                key={node}
                IsBeginning={node === 0 ? true : false}
                IsEnd={node === (props.CanvasSize-1) ? true : false}/>
            })}
        </div>
    )
}

export type{PathFinderProps}