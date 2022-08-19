import { RowNode } from "../components/Row";

type NodeGraph = {
    [key : number] : (RowNode | null)[]
}

type DijstraReturn = {
    newNodes : RowNode[]
    totalTimeout : number
    nodesChanged : number[]
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

    public Dijkstra(nodes : RowNode[],beginnerNodeId : number,endNodeId : number){
        let clone : RowNode[] = structuredClone(nodes)
        let beginningNode : RowNode = clone[beginnerNodeId]
        let nodesToVisit : RowNode[] = [beginningNode]
        let nodesVisited : number[] = []
        let startingTimeout : number = 10
        let DijstraTotalTimeout : number = 10
        let shortestPath : number[] = []
        let lastNodeFound = false
        for(let i=0; i < nodesToVisit.length; i++){
            if(lastNodeFound){
                break
            }
            let currentNode : RowNode = nodesToVisit[i]
            if(!this.nodes[currentNode.id] && !currentNode.blocked){
                this.addNode(currentNode)
                this.addEdge(currentNode)
                if(!currentNode.isBeginning){
                    clone[currentNode.id].isVisited = true
                    clone[currentNode.id].timeout = startingTimeout
                    startingTimeout = startingTimeout + 50
                    DijstraTotalTimeout = DijstraTotalTimeout + 50
                    nodesVisited.push(currentNode.id)
                }
                let newNodesToVisit : (RowNode|null)[] = this.nodes[currentNode.id]
                for(let y = 0; y < newNodesToVisit.length; y++){
                    let relatedNode : RowNode | null = newNodesToVisit[y]
                    if(relatedNode){
                        if(relatedNode.isEnd){
                            shortestPath.push(currentNode.id)
                            lastNodeFound = true
                            break
                        }
                        if(!nodesToVisit.includes(relatedNode) && !relatedNode.blocked){
                            nodesToVisit.push(relatedNode)
                        }
                    }
                }
            }
        }
        this.getShortestPath(shortestPath,nodesVisited,beginnerNodeId)
        let dijstra : DijstraReturn = {
            newNodes : clone,
            totalTimeout : DijstraTotalTimeout,
            nodesChanged : nodesVisited
        }
        console.log(shortestPath)
        return dijstra
    }
    // gets nodes related to node with id nodeId
    // it then appends to an array all the ids
    // of the related nodes and returns that array
    public getNodeIds(nodeId : number) : number[]{
        let nodesRelated : (RowNode|null)[] = this.nodes[nodeId]
        let ids : number[] = []
        nodesRelated.map((node) => {
            if(node){
                ids.push(node.id)
            }
        })
        return ids
    }

    public getShortestPath(currentPath : number[], visitedNodes : number[], beginnerNodeId : number){
        let nodesRelatedToBeginnerNode : number[] = this.getNodeIds(beginnerNodeId)
        for(let i=0; i < currentPath.length; i++){
            let mainNodeId : number = currentPath[i]
            if(nodesRelatedToBeginnerNode.includes(mainNodeId)){
                break
            }
            for(let a = 0; a < visitedNodes.length; a++){
                let currentNodeId : number = visitedNodes[a]
                let ids : number[] = this.getNodeIds(currentNodeId)
                console.log(currentNodeId)
                if(ids.includes(mainNodeId) && !currentPath.includes(currentNodeId)){
                    currentPath.push(currentNodeId)
                    break
                }
            }
        }
    }
}