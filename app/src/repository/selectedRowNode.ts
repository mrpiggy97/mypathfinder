import { RowNode } from "../components/Row";

var selectedBeginnerNode : RowNode | null = null

export function setAsBeginnerNode(rowNode : RowNode) : void{
    selectedBeginnerNode = rowNode
}

export function getBeginnerNode() : RowNode | null{
    return selectedBeginnerNode
}

export function unsetBeginnerNode() : void{
    selectedBeginnerNode = null
}