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
    index : number
    timeout : number
    blocked : boolean
    constructor(id : number,previousRowNode : RowNode | null, nextRowNode : RowNode | null, row : Row,index : number){
        this.previousRowNode = previousRowNode
        this.nextRowNode = nextRowNode
        this.row = row
        this.kuuid = `${row.Id} ${id} row-node`
        this.id = id
        this.isVisited = false
        this.isBeginning = false
        this.isEnd = false
        this.index = index
        this.timeout = 0
        this.blocked = false
    }
}

type RowNodeComponentProps = {
    beginnerNode: RowNode | null
    endNode : RowNode | null
    isVisited : boolean
    isBeginning : boolean
    isEnd : boolean
    setEndNode : (index : number) => void
    setBeginningNode : (index : number) => void
    index : number
    timeout : number
    isBlocked : boolean
    mouseDown : () => void
    mouseUp : () => void
    mouseEnter : (rowNodeId : number) => void
    mousePressed : boolean
}

export default function RowNodeComponent(props : RowNodeComponentProps) : JSX.Element{
    let [status,setStatus] = useState("")

    // effects
    const defineStatus = () => {
        if(props.isBeginning && !props.isEnd && !props.isBlocked){
            setStatus(`row-node-basic row-node-is-beginning`)
        }
        if(props.isEnd && !props.isBeginning && !props.isBlocked){
            setStatus(`row-node-basic row-node-is-end`)
        }
        if(!props.isBeginning && !props.isEnd && !props.isBlocked){
            setStatus(`row-node-basic row-node`)
        }
        if(!props.isBeginning && !props.isEnd && props.isVisited && !props.isBlocked){
            setTimeout(() => {
                setStatus("row-node-basic row-node-is-visited")
            }, props.timeout);
        }
        if(props.isBlocked){
            setStatus("row-node-basic row-node-is-blocked")
        }
    }

    const mouseEntered = () => {
        if(props.mousePressed === true && (!props.isBeginning && !props.isEnd) && (props.beginnerNode !== null && props.endNode !== null)){
            props.mouseEnter(props.index)
            setStatus("row-node-basic row-node-is-blocked")
        }
    }

    const defineAction = () : void => {
        if(!props.beginnerNode){
            props.setBeginningNode(props.index)
        }
        if(!props.endNode && props.beginnerNode){
            props.setEndNode(props.index)
        }
    }

    let logIndex = () => {
        console.log(props.index)
    }

    useEffect(defineStatus,[props.isBeginning,props.isEnd,props.isVisited,props.isBlocked,props.timeout])

    return(
        <div className={status} onClick={defineAction} onMouseEnter={mouseEntered} onMouseUp={props.mouseUp}>
            <span onClick={logIndex}>{props.index}</span>
        </div>
    )
}


function getNodesForRow(numberOfNodes : number, row : Row,currentRowNodeId : number) : RowNode[]{
    let nodesForRow : RowNode[] = []
    let currentRowNode : RowNode = new RowNode(0,null,null,row,0)
    for(let i=0; i < numberOfNodes; i++){
        if(i === 0){
            let newRowNode = new RowNode(currentRowNodeId,null,null,row,i)
            nodesForRow.push(newRowNode)
            currentRowNode = newRowNode
            currentRowNodeId = currentRowNodeId + 1
        }else{
            let newRowNode = new RowNode(currentRowNodeId,currentRowNode,null,row,i)
            currentRowNode.nextRowNode = newRowNode
            currentRowNode = newRowNode
            nodesForRow.push(newRowNode)
            currentRowNodeId = currentRowNodeId + 1
        }
    }
    return nodesForRow
}

// every row will have the same amount of members in Nodes
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