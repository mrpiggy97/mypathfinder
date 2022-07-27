import React,{useState,useEffect, useMemo} from "react";
import "./css/Row.css"


class RowNode{
    previousRowNode : RowNode | null
    nextRowNode : RowNode | null
    row : Row
    kuuid : string
    id : number
    constructor(id : number,previousRowNode : RowNode | null, nextRowNode : RowNode | null, row : Row){
        this.previousRowNode = previousRowNode
        this.nextRowNode = nextRowNode
        this.row = row
        this.kuuid = `${row.Id} ${id} row-node`
        this.id = id
    }
}

type RowNodeComponentProps = {
    isBeginning : boolean
    isEnd : boolean
    isVisited : boolean
    rowNode : RowNode
}

function RowNodeComponent(props : RowNodeComponentProps) : JSX.Element{
    let [status,setStatus] = useState("")

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

type RowComponentProps = {
    row : Row
}

export default function RowComponent(props : RowComponentProps):JSX.Element{
    return(
        <React.Fragment>
            {props.row.Nodes.map((node) => {
                return <RowNodeComponent
                isBeginning={false}
                isEnd={false}
                isVisited={false}
                rowNode={node}
                key={node.kuuid}
                />
            })}
        </React.Fragment>
    )
}

export {Row}