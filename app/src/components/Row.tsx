import React,{useState,useEffect} from "react";
import "./css/Row.css"


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
    beginnerNode : RowNode | null
    endNode : RowNode | null
    isVisited : boolean
    isBeginning : boolean
    isEnd : boolean
    setEndNode : (index : number) => void
    setBeginningNode : (index : number) => void
    index : number
}

export default function RowNodeComponent(props : RowNodeComponentProps) : JSX.Element{
    let [status,setStatus] = useState("")

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

    const defineAction = () : void => {
        console.log("action called")
        if(!props.beginnerNode){
            props.setBeginningNode(props.index)
        }
        if(!props.endNode && props.beginnerNode){
            props.setEndNode(props.index)
        }
    }

    useEffect(defineStatus,[props.isBeginning,props.isEnd])

    return(
        <div className={status} onClick={defineAction}>
        </div>
    )
}


function getNodesForRow(numberOfNodes : number, row : Row,currentRowNodeId : number) : RowNode[]{
    let nodesForRow : RowNode[] = []
    let currentRowNode : RowNode = new RowNode(0,null,null,row)
    for(let i=0; i < numberOfNodes; i++){
        if(i === 0){
            let newRowNode = new RowNode(currentRowNodeId,null,null,row)
            nodesForRow.push(newRowNode)
            currentRowNode = newRowNode
            currentRowNodeId = currentRowNodeId + 1
            console.log(currentRowNodeId)
        }else{
            let newRowNode = new RowNode(currentRowNodeId,currentRowNode,null,row)
            currentRowNode.nextRowNode = newRowNode
            currentRowNode = newRowNode
            nodesForRow.push(newRowNode)
            currentRowNodeId = currentRowNodeId + 1
        }
    }
    return nodesForRow
}

class Row{
    Id : number
    PreviousRow : Row | null
    NextRow : Row | null
    Nodes : RowNode[]
    constructor(id : number, previousRow : Row | null, nextRow : Row | null, numberOfNodes : number,currentNodeRowId : number){
        this.Id = id
        this.PreviousRow = previousRow
        this.NextRow = nextRow
        this.Nodes = getNodesForRow(numberOfNodes,this,currentNodeRowId)
    }
}

export {Row,RowNode}