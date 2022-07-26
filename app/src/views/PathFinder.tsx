import React,{useMemo} from "react";
import RowNode,{Row} from "../components/Row";

import "./css/PathFinder.css"

function getRowsForCanvas(canvasSize : number) : Row[]{
    let numberOfRows : number = Math.sqrt(canvasSize)
    let numberOfMembersPerRow : number = Math.sqrt(canvasSize)
    let rows : Row[] = []
    let currentRow : Row = new Row(0,null,null,0)
    for(let i = 0; i < numberOfRows; i++){
        // if row is beginning then previousRow and nextRow
        // will be null and then will set currentRow as this
        // newly created Row
        if(i === 0){
            let newNode = new Row(i,null,null,numberOfMembersPerRow)
            currentRow = newNode
            rows.push(newNode)
        }else{
            // every Row after the beginning row will have previousRow
            // the currentRow value(which will be updated with every new Row)
            // and nextRow as null as it does not yet exist
            let newRow = new Row(i,currentRow,null,numberOfMembersPerRow)
            currentRow.NextRow = newRow
            currentRow = newRow
            rows.push(newRow)            
        }
    }

    return rows
}

type PathFinderProps = {
    CanvasSize : number
}

export default function PathFinder(props : PathFinderProps) : JSX.Element{
    let rows = useMemo(() => {
        return getRowsForCanvas(props.CanvasSize)
    },[props.CanvasSize])

    return(
        <div id="canvas">
            <div id="menu">
                menu {rows.length}
            </div>
            <div id="path-finder">
                {rows.map((row) => {
                    return <RowNode row={row} />
                })}
            </div>
        </div>
    )
}

export type{PathFinderProps}