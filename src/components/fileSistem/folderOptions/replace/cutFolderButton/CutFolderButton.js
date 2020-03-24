import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/actions";

const CutFolderButton = ({setFolderNotAvailable,currentFolderId,onGoToPrev,setReplaceFolderId}) => {

    const CutFolderHandler = ()=>{
        setFolderNotAvailable(currentFolderId);
        setReplaceFolderId(currentFolderId);
        onGoToPrev();

    }

    return(
        <div className={'CutFolderButton cursPointSelNon'} onClick={CutFolderHandler}>
            Replace Folder
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        currentFolderId:state.fileSistem.currentItemId,
    }
};
export default WithService()(connect(mapStateToProps,actions)(CutFolderButton));