// selections: the mysterious heart of d3

// "a selection is an array of groups, and each group is an array of elements"
type Group<A> = Array<A>;
type Selection<A> = Array<Group<A>>;

// "with selectAll, every element in the old selection becomes a group in the new selection"
function selectAll(selection: Selection<A>, selector): Selection<A> {
}

// "To join data to elements, we must know which datum should be assigned to which element. This is done by pairing keys."

// enter, update, exit
//
// Update - There was a matching element for a given datum.
// Enter - There was no matching element for a given datum.
// Exit - There was no matching datum for a given element.
