import { RowNode } from "../components/Row";

type NodeGraph = {
    [key : number] : (RowNode | null)[]
}

export default class RowNodeGraph{
    nodes : NodeGraph
    NumberOfNodes : number
    constructor(){
        this.NumberOfNodes = 0
        this.nodes = {}
    }

    public addNode(rowNode : RowNode){
        this.nodes[rowNode.id] = []
        this.NumberOfNodes = this.NumberOfNodes + 1
    }

    public addEdge(rowNode : RowNode){
        let upperRowNode : RowNode | null = null
        let bottomRowNode : RowNode | null = null
        // all rows have the same number of nodes
        let lengthOfNodes : number = rowNode.row.Nodes.length
        if(rowNode.row.PreviousRow){
            // in the path finder upperRowNode will be visualized on top
            // of rowNode, but logically it is on previousRow
            upperRowNode = rowNode.row.PreviousRow.Nodes[rowNode.id-lengthOfNodes]
        }
        if(rowNode.row.NextRow){
            // in the path finder bottomRowNode will be visualized bellow
            // of rowNode but logically it is in nextRow
            bottomRowNode = rowNode.row.NextRow.Nodes[rowNode.id+lengthOfNodes]
        }
        this.nodes[rowNode.id] = [
            rowNode.previousRowNode,
            upperRowNode,
            rowNode.nextRowNode,
            bottomRowNode
        ]
    }
}