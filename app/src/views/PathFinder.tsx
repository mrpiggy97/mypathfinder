import React,{useMemo, useState} from "react";
import {Row,RowNode} from "../components/Row";
import RowNodeComponent from "../components/Row"
import RowNodeGraph from "../graphs/RowNodeGraph";

import "./css/PathFinder.css"


// will create rows and for those rows nodes, rows will be stored
// in the nodes themselves, and then we will return an array
// off all the nodes created
function getNodesFromRows(canvasSize : number) : RowNode[]{
    let numberOfRows : number = Math.sqrt(canvasSize)
    let numberOfMembersPerRow : number = Math.sqrt(canvasSize)
    let rowNodes : RowNode[] = []
    let currentRow : Row = new Row(0,null,null,0,0)
    let currentRowNodeId : number = 0
    for(let i = 0; i < numberOfRows; i++){
        // if row is beginning then previousRow and nextRow
        // will be null and then will set currentRow as this
        // newly created Row
        if(i === 0){
            let newRow = new Row(i,null,null,numberOfMembersPerRow,currentRowNodeId)
            currentRow = newRow
            rowNodes.push(...newRow.Nodes)
            currentRowNodeId = currentRowNodeId + 30
        }else{
            // every Row after the beginning row will have previousRow
            // the currentRow value(which will be updated with every new Row)
            // and nextRow as null as it does not yet exist
            let newRow = new Row(i,currentRow,null,numberOfMembersPerRow,currentRowNodeId)
            currentRow.NextRow = newRow
            currentRow = newRow
            rowNodes.push(...newRow.Nodes)
            currentRowNodeId = currentRowNodeId + 30
        }
    }

    return rowNodes
}

type PathFinderProps = {
    CanvasSize : number
}

export default function PathFinder(props : PathFinderProps) : JSX.Element{
    let nodes = useMemo(() => {
        return getNodesFromRows(props.CanvasSize)
    },[props.CanvasSize])

    let [rowNodes,setRowNodes] = useState(nodes)

    let [selectedBeginnerNode,setSelectedBeginnerNode] = useState(null)
    let [selectedEndNode,setSelectedEndNode] = useState(null)

    const startPathFinder = () => {
        if(selectedBeginnerNode){
            let newGraph : RowNodeGraph = new RowNodeGraph(selectedBeginnerNode)
            while(!newGraph.endNodeFound){
                let newNodes : RowNode[] = newGraph.Dijkstra(nodes)
                setTimeout(() => {
                    setRowNodes(newNodes)
                }, 100);
            }
        }else{
            alert("no node has been selected as beginnerNode")
        }
    }

    const setBeginnerNode = (index : number) => {
        if(rowNodes[index].isBeginning === true){
            alert("node is already set as beginning rowNode")
        }

        if(selectedBeginnerNode === null){
            let newRowNodes : RowNode[] = structuredClone(rowNodes)
            newRowNodes[index].isBeginning = true
            setSelectedBeginnerNode(structuredClone(newRowNodes[index]))
            setRowNodes(newRowNodes)
        }
    }

    const setEndNode = (index : number) => {
        if(rowNodes[index].isEnd === true){
            alert("node is already set as end rowNode")
        }
        if(selectedEndNode === null && selectedBeginnerNode){
            let newRowNodes : RowNode[] = structuredClone(rowNodes)
            newRowNodes[index].isEnd = true
            setSelectedEndNode(structuredClone(newRowNodes[index]))        
            setRowNodes(newRowNodes)    
        }
    }

    return(
        <div id="canvas">
            <div id="menu" onClick={startPathFinder}>
                start path finder
            </div>
            <div id="path-finder">
                {rowNodes.map((node) => {
                    return <RowNodeComponent
                    isVisited={node.isVisited}
                    isBeginning={node.isBeginning}
                    isEnd={node.isEnd}
                    key={node.kuuid}
                    beginnerNode={selectedBeginnerNode}
                    endNode={selectedEndNode}
                    setBeginningNode={setBeginnerNode}
                    setEndNode={setEndNode}
                    index={node.id}
                    />
                })}
            </div>
        </div>
    )
}

export type{PathFinderProps}