import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../redux_components/actions";

const GoToPrev = ({onGoToPrev}) =>{
    return (
        <div className={"GoToPrev"}
            onClick={onGoToPrev}
        >
            GoToPrev >
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(GoToPrev);