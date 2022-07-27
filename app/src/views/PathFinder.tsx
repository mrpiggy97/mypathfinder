import React,{useMemo} from "react";
import {Row,RowNode} from "../components/Row";
import RowNodeComponent from "../components/Row";

import "./css/PathFinder.css"


// will create rows and for those rows nodes, rows will be stored
// in the nodes themselves, and then we will return an array
// off all the nodes created
function getNodesFromRows(canvasSize : number) : RowNode[]{
    let numberOfRows : number = Math.sqrt(canvasSize)
    let numberOfMembersPerRow : number = Math.sqrt(canvasSize)
    let rowNodes : RowNode[] = []
    let currentRow : Row = new Row(0,null,null,0)
    for(let i = 0; i < numberOfRows; i++){
        // if row is beginning then previousRow and nextRow
        // will be null and then will set currentRow as this
        // newly created Row
        if(i === 0){
            let newRow = new Row(i,null,null,numberOfMembersPerRow)
            currentRow = newRow
            rowNodes.push(...newRow.Nodes)
        }else{
            // every Row after the beginning row will have previousRow
            // the currentRow value(which will be updated with every new Row)
            // and nextRow as null as it does not yet exist
            let newRow = new Row(i,currentRow,null,numberOfMembersPerRow)
            currentRow.NextRow = newRow
            currentRow = newRow
            rowNodes.push(...newRow.Nodes)          
        }
    }

    return rowNodes
}

type PathFinderProps = {
    CanvasSize : number
}

export default function PathFinder(props : PathFinderProps) : JSX.Element{
    let rowNodes = useMemo(() => {
        return getNodesFromRows(props.CanvasSize)
    },[props.CanvasSize])

    return(
        <div id="canvas">
            <div id="menu">
                menu
            </div>
            <div id="path-finder">
                {rowNodes.map((node) => {
                    return <RowNodeComponent
                    isBeginning={node.isBeginning}
                    isEnd={node.isEnd}
                    isVisited={node.isVisited}
                    rowNode={node}
                    key={node.kuuid}
                    />
                })}
            </div>
        </div>
    )
}

export type{PathFinderProps}