import React from "react";
import styled from "styled-components";
// @ts-ignore
import Elle from "../images/Elle";

const LoadingBox = styled.div`
    position: relative;
    width: 100%;
    max-width: 300px;
    margin: auto;
    height: 100vh;
`;

const ElleImg = styled(Elle)`
    width: 100%;
    height: auto;
    padding: 40px;
`;

const Loading = () => {
    return (
        <LoadingBox>
            <ElleImg />
            <div className="d-flex justify-content-center">
                <div className="spinner-border mt-3 text-purple" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </LoadingBox>
    );
};

export default Loading;
