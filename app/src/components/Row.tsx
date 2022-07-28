import React,{useState,useEffect, useMemo, MouseEventHandler} from "react";
import "./css/Row.css"
import {getBeginnerNode,setAsBeginnerNode,unsetBeginnerNode} from "../repository/selectedRowNode"


class RowNode{
    previousRowNode : RowNode | null
    nextRowNode : RowNode | null
    row : Row
    kuuid : string
    id : number
    isVisited : boolean
    isBeginning : boolean
    isEnd : boolean
    constructor(id : number,previousRowNode : RowNode | null, nextRowNode : RowNode | null, row : Row){
        this.previousRowNode = previousRowNode
        this.nextRowNode = nextRowNode
        this.row = row
        this.kuuid = `${row.Id} ${id} row-node`
        this.id = id
        this.isVisited = false
        this.isBeginning = false
        this.isEnd = false
    }
}

type RowNodeComponentProps = {
    isBeginning : boolean
    isEnd : boolean
    isVisited : boolean
    rowNode : RowNode
}

export default function RowNodeComponent(props : RowNodeComponentProps) : JSX.Element{
    let [status,setStatus] = useState("")
    let selectedBeginnerNode : RowNode | null = getBeginnerNode()

    // effects
    const defineStatus = () => {
        if(props.isBeginning && !props.isEnd){
            setStatus(`row-node-basic row-node-is-beginning`)
        }
        if(props.isEnd && !props.isBeginning){
            setStatus(`row-node-basic row-node-is-end`)
        }
        if(!props.isBeginning && !props.isEnd){
            setStatus(`row-node-basic row-node`)
        }
    }

    useEffect(defineStatus,[props.isBeginning,props.isEnd])

    return(
        <div className={status}>
        </div>
    )
}


function getNodesForRow(numberOfNodes : number, row : Row) : RowNode[]{
    let nodesForRow : RowNode[] = []
    let currentRowNode : RowNode = new RowNode(0,null,null,row)
    for(let i=0; i < numberOfNodes; i++){
        if(i === 0){
            let newRowNode = new RowNode(i,null,null,row)
            nodesForRow.push(newRowNode)
            currentRowNode = newRowNode
        }else{
            let newRowNode = new RowNode(i,currentRowNode,null,row)
            currentRowNode.nextRowNode = newRowNode
            currentRowNode = newRowNode
            nodesForRow.push(newRowNode)
        }
    }
    return nodesForRow
}

class Row{
    Id : number
    PreviousRow : Row | null
    NextRow : Row | null
    Nodes : RowNode[]
    constructor(id : number, previousRow : Row | null, nextRow : Row | null, numberOfNodes : number){
        this.Id = id
        this.PreviousRow = previousRow
        this.NextRow = nextRow
        this.Nodes = getNodesForRow(numberOfNodes,this)
    }
}

export {Row,RowNode}