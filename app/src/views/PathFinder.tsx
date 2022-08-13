import React,{useMemo, useState} from "react";
import {Row,RowNode} from "../components/Row";
import RowNodeComponent from "../components/Row"
import RowNodeGraph from "../graphs/RowNodeGraph";
import { NUMBER_OF_ITEMS_PER_ROW } from "../App";

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
            currentRowNodeId = currentRowNodeId + NUMBER_OF_ITEMS_PER_ROW
        }else{
            // every Row after the beginning row will have previousRow
            // the currentRow value(which will be updated with every new Row)
            // and nextRow as null as it does not yet exist
            let newRow = new Row(i,currentRow,null,numberOfMembersPerRow,currentRowNodeId)
            currentRow.NextRow = newRow
            currentRow = newRow
            rowNodes.push(...newRow.Nodes)
            currentRowNodeId = currentRowNodeId + NUMBER_OF_ITEMS_PER_ROW
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
    let [mouseIsPressed, setMouseIsPressed] = useState(false)
    let [nodesToBlock,setNodesToBlock] = useState<number[]>([])

    let [selectedBeginnerNode,setSelectedBeginnerNode] = useState<RowNode|null>(null)
    let [selectedEndNode,setSelectedEndNode] = useState<RowNode|null>(null)

    const startPathFinder = () => {
        if(selectedBeginnerNode && selectedEndNode){
            let newGraph : RowNodeGraph = new RowNodeGraph()
            let newNodes = newGraph.Dijkstra(rowNodes,selectedBeginnerNode.id,selectedEndNode.id)
            setRowNodes(newNodes)
        }else{
            alert("you need to select both beginning and end nodes")
        }
    }

    const setBeginnerNode = (index : number) => {
        let clone : RowNode[] = structuredClone(rowNodes)
        if(clone[index].isBeginning === true){
            alert("node is already set as beginning rowNode")
        }

        if(selectedBeginnerNode === null){
            clone[index].isBeginning = true
            setSelectedBeginnerNode(clone[index])
            setRowNodes(clone)
        }
    }

    const setEndNode = (index : number) => {
        let clone : RowNode[] = structuredClone(rowNodes)
        if(clone[index].isEnd === true){
            alert("node is already set as end rowNode")
        }
        if(selectedEndNode === null && selectedBeginnerNode){
            clone[index].isEnd = true
            setSelectedEndNode(clone[index])        
            setRowNodes(clone)
        }
    }

    const setDefaultNodes = () => {
        setRowNodes(getNodesFromRows(props.CanvasSize))
        setSelectedBeginnerNode(null)
        setSelectedEndNode(null)
        setNodesToBlock([])
    }

    const handleMouseDown = () => {
        setMouseIsPressed(true)
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false)
        let clone : RowNode[] = structuredClone(rowNodes)
        for(let i = 0; i < nodesToBlock.length; i++){
            clone[nodesToBlock[i]].blocked = true
        }
        setRowNodes(clone)
    }
    const handleMouseEnter = (rowNodeId : number) => {
        let rowNodesClone : RowNode[] = structuredClone(rowNodes)
        let nodesToBlockClone : number[] = structuredClone(nodesToBlock)
        if(!rowNodesClone[rowNodeId].blocked && !rowNodesClone[rowNodeId].isBeginning && !rowNodesClone[rowNodeId].isEnd){
            nodesToBlockClone.push(rowNodeId)
            setNodesToBlock(nodesToBlockClone)
        }
    }

    return(
        <div id="canvas">
            <div id="menu">
                <span onClick={startPathFinder}>start pathfinder</span>
                <span onClick={setDefaultNodes}>set empty nodes</span>
            </div>
            <div id="path-finder" onMouseDown={handleMouseDown}>
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
                    timeout={node.timeout}
                    isBlocked={node.blocked}
                    mouseDown={handleMouseDown}
                    mouseUp={handleMouseUp}
                    mouseEnter={handleMouseEnter}
                    mousePressed={mouseIsPressed}
                    />
                })}
            </div>
        </div>
    )
}

export type{PathFinderProps}