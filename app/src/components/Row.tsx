import React from "react";
import PathNode from "./PathNode";


function getNodesForRow(numberOfNodes : number) : number[]{
    let nodesForRow : number[] = []
    for(let i=0; i < numberOfNodes; i++){
        nodesForRow.push(i)
    }
    return nodesForRow
}

class Row{
    Id : number
    PreviousRow : Row | null
    NextRow : Row | null
    Nodes : number[]
    constructor(id : number, previousRow : Row | null, nextRow : Row | null, numberOfNodes : number){
        this.Id = id
        this.PreviousRow = previousRow
        this.NextRow = nextRow
        this.Nodes = getNodesForRow(numberOfNodes)
    }
}

type RowNodeProps = {
    row : Row
}

export default function RowNode(props : RowNodeProps):JSX.Element{
    console.log(props.row.Nodes.length)
    return(
        <React.Fragment>
            {props.row.Nodes.map((node) => {
                return <PathNode
                        IsBeginning={false}
                        IsEnd={false}/>
            })}
        </React.Fragment>
    )
}

export {Row}