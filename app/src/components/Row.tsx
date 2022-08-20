import React,{useState,useEffect} from "react";
import { idText } from "typescript";
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
    isShortestPath : boolean
    index : number
    timeout : number
    blocked : boolean
    cleanNode : boolean
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
        this.cleanNode = false
        this.isShortestPath = false
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
    mouseUp : () => void
    mouseEnter : (rowNodeId : number) => void
    mousePressed : boolean
    cleanNode : boolean | null
    isShortestPath : boolean
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
        if(props.cleanNode){
            setStatus("row-node-basic row-node-clean-node")
        }
        if(!props.isBeginning && !props.isEnd && props.isVisited && !props.isBlocked){
            setTimeout(() => {
                setStatus("row-node-basic row-node-is-visited")
            }, props.timeout);
        }
        if(props.isBlocked){
            setStatus("row-node-basic row-node-is-blocked")
        }
        if(props.isVisited && props.isShortestPath){
            setTimeout(() => {
                setStatus("row-node-basic row-node-is-shortest-path")
            },props.timeout)
        }
    }

    const mouseEntered = () => {
        if(props.mousePressed === true && (!props.isBeginning && !props.isEnd) && (props.beginnerNode !== null && props.endNode !== null)){
            props.mouseEnter(props.index)
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

    useEffect(defineStatus,[props.isBeginning,props.isEnd,props.isVisited,props.isBlocked,props.timeout,props.cleanNode])

    return(
        <div className={status} onClick={defineAction} onMouseEnter={mouseEntered} onMouseUp={props.mouseUp}>
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