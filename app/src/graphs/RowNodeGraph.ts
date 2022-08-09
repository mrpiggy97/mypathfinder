import { allowedNodeEnvironmentFlags } from "process";
import { isGeneratorFunction } from "util/types";
import { Row, RowNode } from "../components/Row";

type NodeGraph = {
    [key : number] : (RowNode | null)[]
}

export default class RowNodeGraph{
    nodes : NodeGraph
    NumberOfNodes : number
    endNodeFound : boolean
    beginnerNode : RowNode
    endNode : RowNode
    constructor(begginningNode :  RowNode,endingNode : RowNode){
        this.NumberOfNodes = 0
        this.nodes = {}
        this.beginnerNode = begginningNode
        this.endNodeFound = false
        this.endNode = endingNode
    }

    public addNode(rowNode : RowNode){
        this.nodes[rowNode.id] = []
        this.NumberOfNodes = this.NumberOfNodes + 1
    }

    // every node will have 4 members in its array, they may be
    // of type RowNode or null
    public addEdge(rowNode : RowNode){
        let upperRowNode : RowNode | null = null
        let bottomRowNode : RowNode | null = null
        // all rows have the same number of nodes
        if(rowNode.row.PreviousRow){
            // in the path finder upperRowNode will be visualized on top
            // of rowNode, but logically it is on previousRow
            upperRowNode = rowNode.row.PreviousRow.Nodes[rowNode.index]
        }
        if(rowNode.row.NextRow){
            // in the path finder bottomRowNode will be visualized bellow
            // of rowNode but logically it is in nextRow
            bottomRowNode = rowNode.row.NextRow.Nodes[rowNode.index]
        }
        this.nodes[rowNode.id][0] = upperRowNode
        this.nodes[rowNode.id][1] = rowNode.previousRowNode
        this.nodes[rowNode.id][2] = bottomRowNode
        this.nodes[rowNode.id][3] = rowNode.nextRowNode
    }

    public getNodesToVisit(rowNode : RowNode){
        this.addNode(rowNode)
        this.addEdge(rowNode)
    }

    public Dijkstra(nodes : RowNode[]){
        let clone : RowNode[] = structuredClone(nodes)
        let nodesToVisit : RowNode[] = [this.beginnerNode]
        let visitedNodes : number[] = []
        for(let i=0; i < nodesToVisit.length; i++){
            let currentNode : RowNode = nodesToVisit[i]
            if(currentNode.isEnd){
                break
            }
            if(!this.nodes[currentNode.id]){
                this.addNode(currentNode)
                this.addEdge(currentNode)
                visitedNodes.push(currentNode.id)
                if(!currentNode.isBeginning){
                    clone[currentNode.id].isVisited = true
                }
                let newNodesToVisit : (RowNode|null)[] = this.nodes[currentNode.id]
                for(let y = 0; y < newNodesToVisit.length; y++){
                    let relatedNode : RowNode | null = newNodesToVisit[y]
                    if(relatedNode){
                        if(!nodesToVisit.includes(relatedNode)){
                            nodesToVisit.push(relatedNode)
                        }
                    }
                }
            }    
        }
        return clone
    }
}