import React,{useMemo} from "react";
import RowComponent,{Row} from "../components/Row";

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
            let newRow = new Row(i,null,null,numberOfMembersPerRow)
            currentRow = newRow
            rows.push(newRow)
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
                    return <RowComponent row={row} key={row.Id} />
                })}
            </div>
        </div>
    )
}

export type{PathFinderProps}