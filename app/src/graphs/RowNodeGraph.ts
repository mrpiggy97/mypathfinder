import { RowNode } from "../components/Row";

type NodeGraph = {
    [key : number] : (RowNode | null)[]
}

export default class RowNodeGraph{
    nodes : NodeGraph
    NumberOfNodes : number
    nodesToVisit : RowNode[]
    nodesVisited : RowNode[]
    endNodeFound : boolean
    constructor(begginnerNode : RowNode){
        this.NumberOfNodes = 0
        this.nodes = {}
        this.nodesToVisit = [begginnerNode]
        this.nodesVisited = []
        this.endNodeFound = false
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

    public Dijkstra(nodes : RowNode[]) : RowNode[]{
        // make a copy of nodes so any changes on the go
        // do not reflect on the nodes
        // for every node in this.nodesToVisit we create a new edge
        // in the graph and at the same time we check if it has been
        // visited, if it hasn't then we change the value isVisited
        // to true, we then loop through the edge of this node
        // and for every node in that edge we add that node to newNodesToVisit
        // and at the end we return the copy of nodes and set newNodesToVisit
        // as this.nodesToVisit and if we found a node that is endNode
        // we set endNodeFound to true
        let newNodesToVisit : RowNode[] = []
        let nodesClone : RowNode[] = structuredClone(nodes)
        this.nodesToVisit.map((node) => {
            if(!node.isVisited && !node.isBeginning && !node.isEnd){
                nodesClone[node.id].isVisited = true
            }
            if(node.isEnd){
                this.endNodeFound = true
                return nodes
            }
            if(!this.nodesVisited.includes(node)){
                this.addNode(node)
                this.addEdge(node)
                this.nodesVisited.push(node)
            }
            let currentGraphNode : (RowNode|null)[] = this.nodes[node.id]
            currentGraphNode.map((gnode) => {
                if(gnode){
                    if(!this.nodesVisited.includes(gnode)){
                        newNodesToVisit.push(gnode)
                    }
                }
            })
        })
        this.nodesToVisit = newNodesToVisit
        return nodesClone
    }
}