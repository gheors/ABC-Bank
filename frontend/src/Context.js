import React from "react";

export const Context = React.createContext({
    candidates: [],
    setCandidates: () => { },
    editCandidates: [],
    setEditCandidates: () => { },
    booleanSearchName: [],
    setBooleanSearchName: () => { },
    booleanSearchRange: [],
    setBooleanSearchRange: () => { },
});
